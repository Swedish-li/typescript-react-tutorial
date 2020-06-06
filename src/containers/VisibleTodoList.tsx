import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { RootState } from "../reducers";
import { getVisibleTodos } from "../selectors";
import { Dispatch, bindActionCreators } from "redux";
import { editTodo, deleteTodo, completeTodo } from "../actions";

const todoActions = {
  editTodo,
  deleteTodo,
  completeTodo,
};

const mapStateToProps = (state: RootState) => ({
  filteredTodos: getVisibleTodos(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(todoActions, dispatch),
});

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
