import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";


type Toggle = "Home"|"Popular"|"Message"|"Profile"


const TabToggleSlice = createSlice({
    name : "Toggle",
    initialState : "Home",
    reducers : {
        handleToggle : (state,action:PayloadAction<{toggleTo:Toggle}>)=>{
            return state = action.payload.toggleTo
        }
    }
})

export default TabToggleSlice.reducer
export const {handleToggle} = TabToggleSlice.actions
const getCurrentToggle = (state:RootState)=>state.tabs;
export {
    getCurrentToggle
}