import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatInterface.module.css';

const ChatInterface = ({ messages, onSendMessage, loading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Chat with AI Agent</h2>
        <p className={styles.subtitle}>Natural language interaction logging</p>
      </div>

      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Start a conversation about your HCP interaction</p>
            <p className={styles.hint}>The AI agent will help log and summarize your interactions</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
              <div className={styles.messageContent}>
                <p>{msg.content}</p>
                <span className={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tell me about your HCP interaction..."
          disabled={loading}
          className={styles.textarea}
          rows="3"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className={styles.sendBtn}
        >
          {loading ? 'Processing...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
