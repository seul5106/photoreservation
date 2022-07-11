import {createSlice} from "@reduxjs/toolkit"

export const SetTapItemSlice = createSlice({
    name: "SetTapItemV",
    initialState: {
        setTabItem: 0,
    },

    reducers: {
        SetTapItemValue: (state, action)=>{
            const setTabItem = action.payload
            return {
                setTabItem: setTabItem
            };
        },
    }
});

export const {SetTapItemValue} = SetTapItemSlice.actions;

export default SetTapItemSlice.reducer;