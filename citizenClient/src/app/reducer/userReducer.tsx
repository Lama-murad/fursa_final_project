import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import axios from 'axios'
export interface User {
    userInfo: {
        _id: string,
        name: string;
        email: string;
        phone: string;
        location: string;
        gender: string;
        type: string;
    }
    isLogIn: boolean;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: User = {
    userInfo: {
        _id: "",
        name: "",
        email: "",
        phone: "",
        location: "",
        gender: "",
        type: "",
    },
    isLogIn: false,
    status: 'idle',
};


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (obj: any) => {
        const { email, password } = obj
        try {
            const response = await axios.post('/users/get-user', { "email": email, "password": password })
            console.log(response.data)
            return response.data;
        }
        catch (err: any) {
            console.log(err.message)
        }
    }
);
export const signUpUser = createAsyncThunk(
    'user/signUpUser',
    async (user: any, thunkAPI) => {
        try {
            const { name, email, phone, location, password, gender } = user
            if (!name || !gender || !email || !phone || !location || !password) throw "invalid fields"
            const response = await axios.post('/users/sign-up', user)
            const data: any = response.data
            return data
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }

    }
);
export const authenticate = createAsyncThunk(
    'user/authenticate',
    async () => {
        try {
            const response = await axios.get('/users/get-authentication');
            console.log(response)
            return response.data
        }
        catch (err: any) {
            console.log(err.message)
        }
    }
);

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                if (action.payload.ok === true) {
                    state.status = 'idle';
                    state.userInfo = action.payload.user;
                    state.isLogIn = true;
                }
            })
            .addCase(signUpUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                if (action.payload.log === true) {
                    state.status = 'idle';
                    state.userInfo = action.payload.user;
                    state.isLogIn = true;
                }
            })
            .addCase(authenticate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                if (action.payload.log === true) {
                    state.status = 'idle';
                    state.userInfo = action.payload.user;
                    if (action.payload.user.type !== "anonymous")
                        state.isLogIn = true;
                    else state.isLogIn = false;
                }
            })
    },
});


export const getName = (state: RootState) => state.user.userInfo.name;
export const getGender = (state: RootState) => state.user.userInfo.gender;
export const getID = (state: RootState) => state.user.userInfo._id;
export const userInfo = (state: RootState) => state.user.userInfo;
export const getloginState = (state: RootState) => state.user.isLogIn;
export const getUserEmail = (state: RootState) => state.user.userInfo.email;
export const getRole = (state: RootState) => state.user.userInfo.type;
export const getLocation = (state: RootState) => state.user.userInfo.location;
export default userReducer.reducer;
