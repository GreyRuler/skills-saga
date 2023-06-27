import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import {
	failure,
	request,
	searchField,
	success
} from '../features/skills/skillsSlice';
import { searchSkills } from '../api';

function filterChangeSearchAction({type, payload}) {
	return searchField().type === type && payload.trim() !== ''
}

function* handleChangeSearchSaga(action) {
	yield put(request(action.payload))
}

function* watchChangeSearchSaga() {
	yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga)
}

function* handleSearchSkillsSaga(action) {
	try {
		const retryCount = 3
		const retryDelay = 1000
		const data = yield retry(retryCount, retryDelay, searchSkills, action.payload)
		yield put(success(data))
	} catch (e) {
		yield put(failure(e.message))
	}
}

function* watchSearchSkillsSaga() {
	yield takeLatest(request().type, handleSearchSkillsSaga)
}

export default function* saga() {
	yield spawn(watchChangeSearchSaga)
	yield spawn(watchSearchSkillsSaga)
}
