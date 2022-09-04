import { configureStore } from '@reduxjs/toolkit'

import { uiReducer } from './reducers/uiReducer'
import { profileUpdateReducer } from './reducers/profileUpdateReducer';
import { dataReducer } from './reducers/dataReducer';

const store = configureStore({ 
    reducer: {
        ui: uiReducer,
        profileUpdate: profileUpdateReducer,
        data: dataReducer
    } 
})
export default store;