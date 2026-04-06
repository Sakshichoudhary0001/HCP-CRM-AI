import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const logInteraction = createAsyncThunk(
  'interaction/logInteraction',
  async (interactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/interactions/log-interaction/`,
        interactionData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editInteraction = createAsyncThunk(
  'interaction/editInteraction',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE}/interactions/${id}/`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchInteractions = createAsyncThunk(
  'interaction/fetchInteractions',
  async (hcpId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/interactions/`,
        { params: { hcp_id: hcpId } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const interactionSlice = createSlice({
  name: 'interaction',
  initialState: {
    interactions: [],
    currentInteraction: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInteraction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInteraction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInteraction = action.payload;
        state.success = true;
      })
      .addCase(logInteraction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editInteraction.pending, (state) => {
        state.loading = true;
      })
      .addCase(editInteraction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInteraction = action.payload;
        state.success = true;
      })
      .addCase(editInteraction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInteractions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.loading = false;
        state.interactions = action.payload;
      })
      .addCase(fetchInteractions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = interactionSlice.actions;
export default interactionSlice.reducer;
