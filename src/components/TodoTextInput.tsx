import React, { Component } from 'react'
import classnames from 'classnames'

export type Props = {
  onSave: (val: string) => void
  text?: string
  placeholder: string
  editing?: boolean
  newTodo: boolean
}

export type State = {
  text: string
}

export default class TodoTextInput extends Component<Props, State> {
  state = {
    text: this.props.text || '',
  }

  handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = (e.target as HTMLInputElement).value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value })
  }

  handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo,
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
