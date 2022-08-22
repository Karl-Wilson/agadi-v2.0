import { createSlice } from '@reduxjs/toolkit'

const profileUpdateSlice = createSlice({
    name: 'ProfileUpdate',
    initialState: {},
    reducers: {
      addDay: (state, action) => {
        state.day = action.payload;
      },
      addMonth: (state, action) => {
        state.month = action.payload;
      },
      addYear: (state, action) => {
        state.year = action.payload;
      },
      addGender: (state, action) => {
        state.gender = action.payload;
      },
      addUnitMethod: (state, action) =>{
        state.unitMethod = action.payload;
      },
      addFeet: (state, action) =>{
        state.feet = action.payload;
      },
      addInches: (state, action) =>{
        state.inches = action.payload;
      },
      addCentimeter: (state, action) =>{
        state.centimeter = action.payload;
      },
      addKg: (state, action) =>{
        state.kg = action.payload;
      },
      addPounds: (state, action) =>{
        state.pounds = action.payload;
      },
      addBloodPressure: (state, action) =>{
        state.bloodPressure = action.payload;
      },
      addSugarLevel: (state, action) =>{
        state.sugarLevel = action.payload;
      },
      addMedication: (state, action) =>{
        state.medication = action.payload;
      },
    },
  })

  export const profileUpdateAction = profileUpdateSlice.actions;
  export const profileUpdateReducer = profileUpdateSlice.reducer