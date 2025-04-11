import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn:false,
  user:{}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
        setUser:(state,action)=>{
            const payLoad=action.payload
            state.isLoggedIn=true
            state.user=payLoad
        },

        removeUser :(state,action)=>{
            state.isLoggedIn=false
            state.user={}
        }

  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer