import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const fetchHCPs = createAsyncThunk(
  'hcp/fetchHCPs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/hcps/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const hcpSlice = createSlice({
  name: 'hcp',
  initialState: {
    hcps: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHCPs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHCPs.fulfilled, (state, action) => {
        state.loading = false;
        state.hcps = action.payload;
      })
      .addCase(fetchHCPs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hcpSlice.reducer;
