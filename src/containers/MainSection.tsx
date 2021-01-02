import { RootState } from '../reducers'
import { getCompletedTodoCount } from '../selectors'
import { clearCompleted, toggleAllTodos } from '../actions'
import { connect } from 'react-redux'
import MainSection, { MainActions } from '../components/MainSection'
import { Dispatch, bindActionCreators } from 'redux'

const actions: MainActions = {
  clearCompleted,
  toggleAll: toggleAllTodos,
}

const mapStateToProps = (state: RootState) => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainSection)
