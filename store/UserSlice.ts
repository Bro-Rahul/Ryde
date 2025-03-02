import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export interface UserSchema {
  id : string,
  name : string,
  date_of_birth : string
}

const initialState: UserSchema = {
  date_of_birth : "",
  id : "",
  name : ""
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData : (state,actions:PayloadAction<UserSchema>)=>{
        return {
            ...actions.payload
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer

const selectUser = (state:RootState)=>state.user
export{
    selectUser
}