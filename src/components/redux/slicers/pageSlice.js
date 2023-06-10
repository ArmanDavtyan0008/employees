import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage:'',
    secondPage: 'tasks'
}

const pageSlice = createSlice({
    name:'page',
    initialState,
    reducers:{
    changePageName: (state,{payload})=> {
state.currentPage = payload
    }
}
})

export const {changePageName} = pageSlice.actions

export default pageSlice.reducer
