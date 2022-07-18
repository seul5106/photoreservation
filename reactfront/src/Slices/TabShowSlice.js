import {createSlice} from "@reduxjs/toolkit"

export const TabShowSlice = createSlice({
    name: "TabShowData",
    initialState: {
        TAB_SHOW: true,
    },

    reducers: {
        setTabShow: (state, action)=>{
            const ShowData = action.payload
            return {
                TAB_SHOW: ShowData
            };
        },
    }
});

export const {setTabShow} = TabShowSlice.actions;

export default TabShowSlice.reducer;