import { createSlice } from '@reduxjs/toolkit'

const profileUpdateSlice = createSlice({
    name: 'ProfileUpdate',
    initialState: {},
    reducers: {
      addDoB: (state, action) => {
        state.loading = action.payload;
      },
      addGender: (state, action) => {
        state.user = action.payload;
      },
      addUnitMethod: (state, action) =>{
        state.unitMethod = action.payload;
      },
      addHeight: (state, action) =>{
        state.height = action.payload;
      },
      addWeight: (state, action) =>{
        state.weight = action.payload;
      },
      addBloodPressure: (state, action) =>{
        state.bloodPressure = action.payload;
      },
      addSugarLevel: (state, action) =>{
        state.sugarLevel = action.payload;
      },
    },
  })

  export const profileUpdateAction = profileUpdateSlice.actions;
  export const profileUpdateReducer = profileUpdateSlice.reducer