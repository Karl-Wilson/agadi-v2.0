import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'UI',
    initialState: {loading: true, dashboardPages: ['profile-update', 'profile', 'settings'], 
    updateModal: false, isUpdated: false, isUpdateSuccessful: false, showDosageUpdateModal: false },
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
      },
      addUpdateModal: (state, action) =>{
        state.updateModal = action.payload;
      },
      addIsUpdated: (state, action) =>{
        state.isUpdated = action.payload;
      },
      addUpdateLoad: (state, action) =>{
        state.updateLoad = action.payload;
      },
      addIsUpdateSuccessful: (state, action) =>{
        state.isUpdateSuccessful = action.payload;
      },
      addShowDosageUpdateModal: (state, action) =>{
        state.showDosageUpdateModal = action.payload;
      },
      addShowSignupModal: (state, action) =>{
        state.showSignupModal = action.payload;
      },
      addUserProfileUpdate:(state, action) =>{
        state.userProfileUpdate = action.payload;
      }
    },
  })

  export const uiAction = uiSlice.actions;
  export const uiReducer = uiSlice.reducer