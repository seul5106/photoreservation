import {createSlice} from "@reduxjs/toolkit"

export const SignInDataSlice = createSlice({
    name: "SignInData",
    initialState: {
        USER_ID: "",
        USER_EMAIL: "",
        USER_PASSWORD: "",
        USER_NAME: "",
        USER_TEL: "",
        USER_POSTCODE: "",
        USER_ADDRESS: "",
        USER_DETAIL_ADDRESS: "",
        USER_REF_ADDRESS: "",
        USER_BIRTHDAY: ""
    },

    reducers: {

        setSignInfo: (state, action)=>{
            const setUSERID = action.payload.USER_ID
            const setUSEREMAIL = action.payload.USER_EMAIL
            const setUSERPASSWORD = action.payload.USER_PASSWORD
            const setUSERNAME = action.payload.USER_NAME
            const setUSERTEL = action.payload.USER_TEL
            const setPostCode = action.payload.USER_POSTCODE
            const setAddress = action.payload.USER_ADDRESS
            const setRefAddress = action.payload.USER_REF_ADDRESS
            const setDetailAddress = action.payload.USER_DETAIL_ADDRESS
            const setBIRTHDAY = action.payload.USER_BIRTHDAY
            
            return {
                USER_ID: setUSERID,
                USER_EMAIL: setUSEREMAIL,
                USER_PASSWORD:setUSERPASSWORD,
                USER_NAME:setUSERNAME,
                USER_TEL:setUSERTEL,
                USER_POSTCODE: setPostCode, 
                USER_ADDRESS: setAddress, 
                USER_REF_ADDRESS:setRefAddress,
                USER_DETAIL_ADDRESS:setDetailAddress,
                USER_BIRTHDAY:setBIRTHDAY
            }
        }

       
        
    }
});

export const {setSignInfo} = SignInDataSlice.actions;

export default SignInDataSlice.reducer;