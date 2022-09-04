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
      }
    },
  })

  export const dataAction = dataSlice.actions;
  export const dataReducer = dataSlice.reducer