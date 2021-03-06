import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import axios from 'axios'
import { Console } from 'console';
interface Media {
    src: string,
    type: string
}
interface Accident {

    _id: string,
    type: string,
    emergency: boolean,
    date: string,
    address: string,
    media: [Media],
    call: object,
    description: string
}
export interface Accidents {
    accidentArr: Array<Accident>;
    accidentId: string,

    status: 'idle' | 'loading' | 'failed';

}

const initialState: Accidents = {
    accidentArr: [],
    accidentId: '',
    status: 'idle'

}
export const addAccident = createAsyncThunk(
    'accident/addAccident',
    async (accident: any) => {
        try {
            const response = await axios.post('/accidents/addNewAccident', { accident })
            return response.data;
        }
        catch (err: any) {
            console.log(err.message)
        }

    }

)
export const fetchPreviousAccident = createAsyncThunk(
    'previousAccidents/fetchAccidentByUserId',
    async (userEmail: any) => {
        try {
            const { email } = userEmail
            const response = await axios.post('previousAccidents/getPreviousAccidents', { "email": email })
            return response.data;
        }
        catch (err: any) {
            console.log(err.message)
        }

    }

)
export const accidentReducer = createSlice({
    name: 'accident',
    initialState,
    reducers: {
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchPreviousAccident.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPreviousAccident.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log(action);
                state.accidentArr = action.payload.accident;
            })

            .addCase(addAccident.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addAccident.fulfilled, (state, action) => {
                state.status = 'idle';
                state.accidentId = action.payload._id;
                state.accidentArr.push(action.payload.accident);

            });
    },
});
export const getAccidentID = (state: RootState) => state.accident.accidentId;
export const getAccident = (state: RootState) => state.accident.accidentArr;
export const getStatus = (state: RootState) => state.accident.status;



export default accidentReducer.reducer;

