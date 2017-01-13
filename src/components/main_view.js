import React from 'react'
import DungeonMaster from '../lib/dungeon_master'

import MessageList from './message_list'

export default class MainView extends React.Component {
  constructor(props) {
    super(props)
    let dm = new DungeonMaster()
    let {dungeon, currentRoom} = dm

    this.state = {
      msgs: [currentRoom.descriptionMessage()],
      dm,
      currentRoom,
      dungeon
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let {currentRoom, dm, msgs} = this.state
    let input = e.target.command

    let val = input.value.slice(2)

    let message = dm.interact(val, currentRoom)
    currentRoom = dm.currentRoom
    msgs = [...msgs, message]
    if (message !== 'You left the dungeon.') msgs = msgs.concat(currentRoom.descriptionMessage())

    this.setState(Object.assign({}, this.state, {msgs, currentRoom}))
    input.value = '> '
  }

  componentDidMount() {
    let command = document.getElementById('command_line').command
    command.value = '> '
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
