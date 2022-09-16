import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
    name: 'data',
    initialState: {},
    reducers: {
      addBloodPressure: (state, action) => {
        state.bloodPressure = action.payload;
      },
      addSugarLevel: (state, action) => {
        state.sugarLevel = action.payload;
      },
      addHeight: (state, action) => {
        state.height = action.payload;
      },
      addWeight: (state, action) => {
        state.weight = action.payload;
      },
      addUnitMethod: (state, action) => {
        state.unitMethod = action.payload;
      },
      addBloodPressureList: (state, action) => {
        state.bloodPressureList = action.payload;
      },
      addSugarLevelList: (state, action) => {
        state.sugarLevelList = action.payload;
      },
    },
  })

  export const dataAction = dataSlice.actions;
  export const dataReducer = dataSlice.reducer