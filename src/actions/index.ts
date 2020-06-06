import * as types from '../constants/ActionTypes'
import {
  AddTodoAction,
  DeleteTodoAction,
  EditTodoAction,
  CompleteTodoAction,
  CompleteAllTodoAction,
  ClearCompletedTodoAction,
} from '../reducers/todos'

export const addTodo = (text: string): AddTodoAction => ({
  type: types.ADD_TODO,
  text,
})
export const deleteTodo = (id: number): DeleteTodoAction => ({
  type: types.DELETE_TODO,
  id,
})
export const editTodo = (id: number, text: string): EditTodoAction => ({
  type: types.EDIT_TODO,
  id,
  text,
})
export const completeTodo = (id: number): CompleteTodoAction => ({
  type: types.COMPLETE_TODO,
  id,
})
export const completeAllTodos = (): CompleteAllTodoAction => ({
  type: types.COMPLETE_ALL_TODOS,
})
export const clearCompleted = (): ClearCompletedTodoAction => ({
  type: types.CLEAR_COMPLETED,
})
export const setVisibilityFilter = (filter: string) => ({
  type: types.SET_VISIBILITY_FILTER,
  filter,
})
