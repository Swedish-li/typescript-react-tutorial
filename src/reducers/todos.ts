import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
} from '../constants/ActionTypes'

export type TodoState = {
  id: number
  text: string
  completed: boolean
}

export interface AddTodoAction {
  type: typeof ADD_TODO
  text: string
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO
  id: number
}

export interface EditTodoAction {
  type: typeof EDIT_TODO
  id: number
  text: string
}

export interface CompleteTodoAction {
  type: typeof COMPLETE_TODO
  id: number
}

export interface CompleteAllTodoAction {
  type: typeof COMPLETE_ALL_TODOS
}

export interface ClearCompletedTodoAction {
  type: typeof CLEAR_COMPLETED
}

export type TodoAction =
  | AddTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | CompleteTodoAction
  | CompleteAllTodoAction
  | ClearCompletedTodoAction

const initialState: TodoState[] = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
  },
]

export default function todo(state = initialState, action: TodoAction) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
      ]

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id)

    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      )

    case COMPLETE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every((todo) => todo.completed)
      return state.map((todo) => ({
        ...todo,
        completed: !areAllMarked,
      }))

    case CLEAR_COMPLETED:
      return state.filter((todo) => todo.completed === false)

    default:
      return state
  }
}
