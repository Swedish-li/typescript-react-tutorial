import { RootState } from "../reducers";

import { createSelector } from "reselect";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "../constants/TodoFilters";

const getVisiblityFilter = (state: RootState) => state.visibilityFilter;
const getTodos = (state: RootState) => state.todos;

export const getVisibleTodos = createSelector([getVisiblityFilter, getTodos],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case SHOW_ALL:
                return todos;
            case SHOW_ACTIVE:
                return todos.filter(t => !t.completed);
            case SHOW_COMPLETED:
                return todos.filter(t => t.completed);
            default:
                throw new Error('Unknown filter:' + visibilityFilter)
        }
    })

export const getCompletedTodoCount = createSelector(
    [getTodos],
    todos => (
        todos.reduce(
            (count, todo) => todo.completed ? count + 1 : count,
            0)
    ))
