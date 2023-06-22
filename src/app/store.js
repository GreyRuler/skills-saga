import { configureStore } from '@reduxjs/toolkit'
import avatarsReducer from '../features/avatars/avatarsSlice';

export default configureStore({
	reducer: {
		avatars: avatarsReducer
	}
})
