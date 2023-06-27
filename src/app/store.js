import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from '../features/skills/skillsSlice';
import createSagaMiddleware from 'redux-saga'
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
	reducer: {
		skills: skillsReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(saga)

export default store
