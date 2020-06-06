import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilters'

export type FilterType =
  | typeof SHOW_ALL
  | typeof SHOW_ACTIVE
  | typeof SHOW_COMPLETED

export interface VisibilityFilterAction {
  type: typeof SET_VISIBILITY_FILTER
  filter: FilterType
}

const initialState: FilterType = SHOW_ALL

const visibilityFilter = (
  state: FilterType = initialState,
  action: VisibilityFilterAction
) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
