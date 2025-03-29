import TableData, { TravelResponseI } from "@/src/services/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface State {
    value: number;
    travels: TableData[];
}

const initialState: State = {
    value: 0,
    travels: [{
        id: "",
        source: "",
        destination: "",
        departureTime: new Date(),
        arrivalTime: new Date(),
        status: ""
    }],
};


const travelSlice = createSlice({
    name: "travel",
    initialState,
    reducers: {
        updateTravels: (state, action: PayloadAction<TableData[]>) => {
            state.travels = action.payload
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

export const {
    updateTravels,
    decrement,
    incrementByAmount,
} = travelSlice.actions;
export default travelSlice.reducer;