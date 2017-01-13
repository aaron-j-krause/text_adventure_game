import React from 'react'
import ReactDOM from 'react-dom'
import '../style.css'

class Room {
  constructor() {
    this.adjacentRooms = {}
    this.monster = null
    this.hasExit = null
    this.hasEntrance = null
    this.validCommands = []
    this.description = 'a damn room'
  }

  addNeighbor(room, dir) {
    let inverse = {n: 's', e:'w', w:'e', s:'n'}

    room.adjacentRooms[inverse[dir]] = this
    this.adjacentRooms[dir] = room
  }

  commandMessage() {
    let directions = Object.keys(this.adjacentRooms).join(' or ')
    let hasMonster = this.monster ? ' There\'s a monster here!' : ''
    let hasExit = this.hasExit ? ' You can leave if you want.' : ''
    let hasEntrance = this.hasEntrance ? ' This is where you came in.' : ''
    let baseMessage = `You are in ${this.description}. You can go ${directions}.`
    return baseMessage + hasExit + hasEntrance + hasMonster
  }

  get commands() {
    let commands = ['help', 'look', ...Object.keys(this.adjacentRooms)]
    if (this.hasExit) commands = commands.concat('exit')
    if (this.monster) commands = commands.concat('attack')

    return commands
  }

  interact(command) {
    let commands = this.commands
    if (!commands.includes(command)) return 'you can\'t do that'

    switch (command) {
      case 'n':
      case 's':
      case 'w':
      case 'e':
        return `You went ${command}.`
      case 'help':
        return 'Your choices are ' + commands.join(' ')
      case 'fight':
        return 'You died.'
      case 'exit':
        return 'You left the dungeon.'
      case 'look':
        return this.commandMessage()
    }
  }
}


class Dungeon {
  constructor() {
    this.entrance = null
    this.generate()
  }

  generate() {
    let grid = [
      ['x', 'n', 'x'],
      ['x', 'o', 'x'],
      ['x', 'e', 'o']
    ]
    let curr
    let newRoom

    for (var y = 0; y < grid.length; y++) {
      for (var x = 0; x < grid[y].length; x++) {
        curr = grid[y][x]
        if (curr === 'x' || curr === 'n' || curr === 'e') {
          newRoom = new Room()

          newRoom.hasEntrance = curr === 'n'
          newRoom.hasExit = curr === 'e'
          newRoom.coords = `${x},${y}`

          if (newRoom.hasEntrance) this.entrance = newRoom
          grid[y][x] = newRoom
          join(x, y, newRoom)
        }
      }
    }

    function join(x, y, room) {
      let steps = [[1, 0], [0, 1], [-1, 0], [0, -1]]
      let dirs = ['e', 's', 'w', 'n']
      let modX
      let modY
      let curr

      steps.forEach((s, i) => {
        modX = x + s[0]
        modY = y + s[1]
        if (grid[modY] && grid[modY][modX]) {
          curr = grid[modY][modX]

          if (typeof curr === 'object') {
            room.addNeighbor(curr, dirs[i])
          }
        }
      })
    }
  }
}

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
    let val = input.value.slice(1)
    let message = room.interact(val)
    let currentRoom = room.adjacentRooms[val] ? room.adjacentRooms[val] : room
    let msgs = [...this.state.msgs, message]

    if (message !== 'You left the dungeon.') msgs = msgs.concat(currentRoom.commandMessage())
    this.setState(Object.assign({}, this.state, {msgs, currentRoom}))
    input.value = '>'
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