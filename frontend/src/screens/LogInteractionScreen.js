import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInteraction } from '../store/slices/interactionSlice';
import { sendChatMessage } from '../store/slices/chatSlice';
import FormInterface from '../components/FormInterface';
import ChatInterface from '../components/ChatInterface';
import styles from './LogInteractionScreen.module.css';

const LogInteractionScreen = () => {
  const [mode, setMode] = useState('form'); // 'form' or 'chat'
  const [selectedInteractionId, setSelectedInteractionId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  const dispatch = useDispatch();
  const { loading: interactionLoading, error: interactionError, success } = useSelector(
    state => state.interaction
  );
  const { loading: chatLoading } = useSelector(state => state.chat);

  const handleFormSubmit = async (formData) => {
    const result = await dispatch(logInteraction(formData));
    if (result.payload) {
      setSelectedInteractionId(result.payload.id);
      setChatMessages([{
        role: 'assistant',
        content: `Great! I've logged your interaction with ${formData.hcp_name}. Would you like me to help with anything else about this interaction?`,
        timestamp: new Date().toISOString()
      }]);
      alert('Interaction logged successfully!');
    }
  };

  const handleChatMessage = async (message) => {
    if (!selectedInteractionId) {
      alert('Please submit a form first to create an interaction');
      return;
    }

    // Add user message
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setChatMessages(prev => [...prev, userMessage]);

    // Send to AI agent
    const result = await dispatch(sendChatMessage({
      interactionId: selectedInteractionId,
      message: message
    }));

    if (result.payload) {
      const aiMessage = {
        role: 'assistant',
        content: result.payload.response || 'Processing your request...',
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>HCP Interaction Logger</h1>
        <p>Log and manage healthcare professional interactions with AI assistance</p>
      </header>

      <div className={styles.modeSelector}>
        <button
          className={`${styles.modeBtn} ${mode === 'form' ? styles.active : ''}`}
          onClick={() => setMode('form')}
        >
          📋 Structured Form
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'chat' ? styles.active : ''}`}
          onClick={() => setMode('chat')}
          disabled={!selectedInteractionId}
        >
          💬 Chat Mode
        </button>
      </div>

      {interactionError && (
        <div className={styles.alert} style={{ background: '#fee' }}>
          ❌ Error: {JSON.stringify(interactionError)}
        </div>
      )}

      {success && (
        <div className={styles.alert} style={{ background: '#efe' }}>
          ✅ Interaction logged successfully!
        </div>
      )}

      <div className={styles.content}>
        {mode === 'form' ? (
          <FormInterface onSubmit={handleFormSubmit} loading={interactionLoading} />
        ) : (
          <ChatInterface
            messages={chatMessages}
            onSendMessage={handleChatMessage}
            loading={chatLoading}
          />
        )}
      </div>

      <footer className={styles.footer}>
        <p>AI-Powered HCP CRM Module • Powered by LangGraph & Groq</p>
      </footer>
    </div>
  );
};

export default LogInteractionScreen;
