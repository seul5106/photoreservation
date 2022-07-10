import {createSlice} from "@reduxjs/toolkit"

export const SignInPostCodeSlice = createSlice({
    name: "SignInPostCode",
    initialState: {
        USER_POSTCODE: "",
        USER_ADDRESS: "",
        USER_DETAIL_ADDRESS: "",
        USER_REF_ADDRESS: "",
    },

    reducers: {
        setPostCode: (state, action)=>{
            const setPostCode = action.payload.postcode
            const setAddress = action.payload.longaddress
            const setRefAddress = action.payload.refaddress
            const setDetailAddress = action.payload.detailaddress
            return {
                USER_POSTCODE: setPostCode, 
                USER_ADDRESS: setAddress, 
                USER_REF_ADDRESS:setRefAddress,
                USER_DETAIL_ADDRESS:setDetailAddress
            };
        },
    }
});

export const {setPostCode} = SignInPostCodeSlice.actions;

export default SignInPostCodeSlice.reducer;