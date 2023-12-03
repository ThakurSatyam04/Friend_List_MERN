import { createSlice } from "@reduxjs/toolkit";

export const TeamSlice = createSlice({
    name : "team",
    initialState : [],
    reducers : {
        add : (state, action) => {
            state.push(action.payload);
        },
        remove : (state, action) => {
            return state.filter((item) => item._id !== action.payload);
        }
    }
})

export const { add, remove } = TeamSlice.actions;
export default TeamSlice.reducer;
