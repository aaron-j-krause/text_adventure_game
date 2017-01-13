import React from 'react'
import ReactDOM from 'react-dom'
import '../style.css'

import Dungeon from './lib/dungeon'

let contentArea = document.createElement('main')
document.body.insertBefore(contentArea, document.body.firstChild)

class MainView extends React.Component {
  constructor(props) {
    super(props)
    let dungeon = window.d = new Dungeon()

    this.state = {
      msgs: [dungeon.entrance.commandMessage()],
      currentRoom: dungeon.entrance,
      dungeon
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let room = this.state.currentRoom
    let input = e.target.command
    let val = input.value.slice(2)
    let message = room.interact(val)
    let currentRoom = room.adjacentRooms[val] ? room.adjacentRooms[val] : room
    let msgs = [...this.state.msgs, message]

    if (message !== 'You left the dungeon.') msgs = msgs.concat(currentRoom.commandMessage())
    this.setState(Object.assign({}, this.state, {msgs, currentRoom}))
    input.value = '> '
  }

  componentDidMount() {
    let command = document.getElementById('command_line').command
    document.body.addEventListener('click', () => {
      command.focus()
    })
    document.body.addEventListener('scroll', () => {
      command.focus()
    })
    command.focus()
  }

  handleClick(e) {
    e.preventDefault()

    document.getElementById('command_line').command.focus()
  }

  render() {
    return (
      <div >
        <MessageList messages={this.state.msgs}/>
        <form id="command_line" onSubmit={ this.handleSubmit }>
          <input name="command" type="text" autoComplete="off"></input>
          <input type="submit"></input>
        </form>
      </div>)
  }  
}

class MessageList extends React.Component {
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

class RoomComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div></div>
    )
  }
}


ReactDOM.render(<MainView/>, contentArea)