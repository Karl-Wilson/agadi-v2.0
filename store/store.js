import { configureStore } from '@reduxjs/toolkit'

import { uiReducer } from './reducers/uiReducer'
import { profileUpdateReducer } from './reducers/profileUpdateReducer';

const store = configureStore({ 
    reducer: {
        ui: uiReducer,
        profileUpdate: profileUpdateReducer
    } 
})
export default store;