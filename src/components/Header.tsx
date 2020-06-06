import React from 'react'
import TodoTextInput from './TodoTextInput'

type Props = {
  addTodo: (val: string) => void
}

const Header = ({ addTodo }: Props) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={(text: string) => {
        if (text.length) {
          addTodo(text)
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
)

export default Header
