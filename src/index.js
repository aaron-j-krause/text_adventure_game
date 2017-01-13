import React from 'react'
import ReactDOM from 'react-dom'
import '../style.css'
function Room() {
  this.adjacentRooms = {}
  this.monster = null
  this.hasExit = null
  this.hasEntrance = null
}

Room.prototype.addNeighbor = function(room, dir) {
  let inverse = {n: 's', e:'w', w:'e', s:'n'}

  room.adjacentRooms[inverse[dir]] = this
  this.adjacentRooms[dir] = room
}
function Dungeon() {
  this.entrance = null
  

}

Dungeon.prototype.generate = function() {
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
  let dirs = ['n', 's', 'w', 'e']
  let rooms;

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

window.Dungeon = Dungeon

Dungeon.prototype.addRoom = function(dir, room) {

}
function coinFlip() {
  return !!Math.floor(Math.random() * 2)
}

// function genGrid(length) {
//   return (new Array(length)).fill((new Array(length)).map(_ => coinFlip()))
//   function buildSquare(square) {

//   }
//   function countAdjacent(x, y) {
//     let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]
//   }
// }
// console.log(genGrid(3))
// function randomLayout(grid, i, j) {

//   function hasAdjacent(grid, x, y) {
//       let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
//       for (let i = 0; i < dirs.length; i++) {
        
//       }
//   }
// }



let contentArea = document.createElement('main')
document.body.insertBefore(contentArea, document.body.firstChild)
const msgs = ['a', 'b', 'c ']
class MainView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msgs: ['A', 'B', 'C']
    }
  }

  render() {
    return (
      <div>
        <h1>SUP</h1>
        <MessageList messages={this.state.msgs}/>
      </div>)
  }  
}

class MessageList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
      {this.props.messages.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    )
  }
}


ReactDOM.render(<MainView/>, contentArea)