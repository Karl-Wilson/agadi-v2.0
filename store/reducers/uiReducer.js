import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'UI',
    initialState: {dashboardPages: ['profile-update', 'profile', 'settings']},
    reducers: {
      addLoading: (state, action) => {
        state.loading = action.payload;
      },
      addUser: (state, action) => {
        state.user = action.payload;
      },
      addProfileUpdate: (state, action) =>{
        state.profileUpdate = action.payload;
      },
      addDashboardPages: (state, action) =>{
        state.dashboardPages = action.payload;
      }
    },
  })

  export const uiAction = uiSlice.actions;
  export const uiReducer = uiSlice.reducer