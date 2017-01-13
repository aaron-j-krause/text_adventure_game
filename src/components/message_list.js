import React from 'react'

export default class MessageList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className="log">
      {this.props.messages.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    )
  }
}
