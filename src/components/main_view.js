import React from 'react'
import DungeonMaster from '../lib/dungeon_master'

import MessageList from './message_list'

export default class MainView extends React.Component {
  constructor(props) {
    super(props)
    const dm = new DungeonMaster()
    const { dungeon, currentRoom } = dm

    this.state = {
      msgs: [currentRoom.descriptionMessage()],
      dm,
      currentRoom,
      dungeon
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const command = document.getElementById('command_line').command
    command.value = '> '
    document.body.addEventListener('click', () => {
      command.focus()
    })
    document.body.addEventListener('scroll', () => {
      command.focus()
    })
    command.focus()
  }

  handleSubmit(e) {
    e.preventDefault()
    let { currentRoom, dm, msgs } = this.state // eslint-disable-line
    const input = e.target.command

    const val = input.value.slice(2)

    const message = dm.interact(val, currentRoom)
    currentRoom = dm.currentRoom
    msgs = [...msgs, message]
    if (message !== 'You left the dungeon.') msgs = msgs.concat(currentRoom.descriptionMessage())

    this.setState(Object.assign({}, this.state, { msgs, currentRoom }))
    input.value = '> '
  }

  render() {
    return (
      <div >
        <MessageList messages={this.state.msgs} />
        <form id="command_line" onSubmit={this.handleSubmit}>
          <input name="command" type="text" autoComplete="off" />
          <input type="submit" />
        </form>
      </div>)
  }
}
