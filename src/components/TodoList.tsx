import React from 'react'
import TodoItem, { Todo, Actions } from './TodoItem'

export type Props = {
  filteredTodos: Todo[]
  actions: Actions
}

const TodoList = ({ filteredTodos, actions }: Props) => {
  const { editTodo, deleteTodo, completeTodo } = actions

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        )
      })}
    </ul>
  )
}

export default TodoList
