import React from 'react'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer'

export type MainActions = {
  clearCompleted: () => void
  completeAllTodos: () => void
}

export type Props = {
  todosCount: number
  completedCount: number
  actions: MainActions
}
const MainSection = ({ todosCount, completedCount, actions }: Props) => (
  <section className="main">
    {!!todosCount && (
      <span>
        <input
          type="checkbox"
          className="toggle-all"
          checked={completedCount === todosCount}
          readOnly
        />
        <label onClick={actions.completeAllTodos} />
      </span>
    )}
    <VisibleTodoList />
    {!!todosCount && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
      />
    )}
  </section>
)

export default MainSection
