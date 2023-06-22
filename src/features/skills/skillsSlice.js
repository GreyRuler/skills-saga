import { createSlice } from '@reduxjs/toolkit';

const skillsSlice = createSlice({
	name: 'skills',
	initialState: {
		value: {
			items: [],
			loading: false,
			error: null,
			search: '',
		}
	},
	reducers: {
		request: (state) => {
			state.value = {
				...state.value,
				loading: true,
				error: null
			}
		},
		failure: (state, action) => {
			state.value = {
				...state.value,
				loading: false,
				error: action.payload,
			}
		},
		success: (state, action) => {
			state.value = {
				...state.value,
				items: action.payload,
				loading: false,
				error: null,
			}
		},
		searchField: (state, action) => {
			state.value = {
				...state.value,
				search: action.payload,
				items: action.payload.trim() !== '' ? state.value.items : []
			}
		},
	}
})

export const {request, searchField, failure, success, setItems} = skillsSlice.actions

export default skillsSlice.reducer
