import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ interactionId, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/interactions/${interactionId}/chat/`,
        { message }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchHistory',
  async (interactionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/interactions/${interactionId}/chat/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
