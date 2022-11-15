import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FiltersState {
    search: string;
    status: string;
    priority: Array<string>;
}

const initialState: FiltersState = {
    search: "",
    status: "All",
    priority: [],
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        searchFilter: (state, action) => {
            state.search = action.payload;
        },
        statusFilter: (state, action) => {
            state.status = action.payload;
        },
        priorityFilter: (state, action) => {
            state.priority = action.payload;
        }
    },
});

export const { searchFilter, statusFilter, priorityFilter } = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
