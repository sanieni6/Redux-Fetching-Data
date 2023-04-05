import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://randomuser.me/api/?results=5';
const initialState = {
    users: [],
    isLoading: true,
    error: undefined,

};

export const usersAsync = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try{
            const response = await axios.get(URL);
            const { data } = response;
            return data.results;

        } catch (e) {
            return e;
        }
            
          }
    
  );

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(usersAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(usersAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
        .addCase(usersAsync.rejected, (state, action) => {
            state.isLoading = false;
            action.error = 'Nodata';
        })
    },
})

export default usersSlice.reducer;
