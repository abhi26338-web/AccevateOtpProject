import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

/* LOGIN */
export const postLogin = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/flutter-api/login.php', data);
    return res.data;
  } catch (e) { return rejectWithValue('Login Failed'); }
});

/* OTP */
export const verifyOtp = createAsyncThunk('auth/otp', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/flutter-api/verify_otp.php', data);
    return res.data;
  } catch (e) { return rejectWithValue('OTP Failed'); }
});

/* DASHBOARD */
export const getDashboard = createAsyncThunk('auth/dashboard', async (_, { rejectWithValue }) => {
  try {
    const res = await api.post('/flutter-api/dashboard.php');
    return res.data;
  } catch (e) { return rejectWithValue('Dashboard Failed'); }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    userId: null,
    token: null,
    dashboard: null,
    error: null,
  },
  extraReducers: builder => {
    builder.addCase(postLogin.pending, s => { s.loading = true; s.error = null });
    builder.addCase(postLogin.fulfilled, (s, a) => { s.loading = false; if (a.payload.status) s.userId = a.payload.userid; else s.error = a.payload.msg });
    builder.addCase(postLogin.rejected, (s, a) => { s.loading = false; s.error = a.payload });


    builder.addCase(verifyOtp.pending, s => { s.loading = true; s.error = null });
    builder.addCase(verifyOtp.fulfilled, (s, a) => { s.loading = false; if (a.payload.status) s.token = a.payload.token; else s.error = a.payload.msg });
    builder.addCase(verifyOtp.rejected, (s, a) => { s.loading = false; s.error = a.payload });


    builder.addCase(getDashboard.pending, s => { s.loading = true });
    builder.addCase(getDashboard.fulfilled, (s, a) => { s.loading = false; if (a.payload.status) s.dashboard = a.payload });
    builder.addCase(getDashboard.rejected, (s, a) => { s.loading = false; s.error = a.payload });
  }
});

export default authSlice.reducer;
