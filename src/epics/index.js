import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	map,
	tap,
	retry,
	filter,
	debounceTime,
	switchMap,
	catchError
} from 'rxjs/operators';
import { of } from 'rxjs';
import {
	failure,
	request,
	searchField, setItems,
	success
} from '../features/skills/skillsSlice';

export const changeSearchEpic = action$ => action$.pipe(
	ofType(searchField().type),
	map(o => o.payload.trim()),
	filter(o => o !== ''),
	debounceTime(100),
	map(o => request(o))
)

export const searchSkillsEpic = action$ => action$.pipe(
	ofType(request().type),
	map(o => o.payload),
	map(o => new URLSearchParams({q: o})),
	tap(o => console.log(o)),
	switchMap(o => ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
		retry(3),
		map(o => success(o)),
		catchError(e => of(failure(e))),
	)),
);
