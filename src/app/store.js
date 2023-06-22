import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { changeSearchEpic, searchSkillsEpic } from '../epics';
import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from '../features/skills/skillsSlice';

const epic = combineEpics(
	changeSearchEpic,
	searchSkillsEpic,
);

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
	reducer: {
		skills: skillsReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(epic);

export default store
