import Room from './room'

/**
 * Dungeon class
 * calls generate on init and stores a reference to the
 * dungeon entrance on dungeon.entrance
 * @export
 * @class Dungeon
 */
export default class Dungeon {
  constructor() {
    this.entrance = null
    this.generate()
  }

  /**
   * create a graph of rooms and store a reference
   * to the entrance on this.entrance
   *
   *
   * @memberOf Dungeon
   */
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
          newRoom.id = y * 3 + x

          if (newRoom.hasEntrance) this.entrance = newRoom
          grid[y][x] = newRoom
          join(x, y, newRoom)
        }
      }
    }

    function join(x, y, room) {
      let steps = [[1, 0], [0, 1], [-1, 0], [0, -1]]
      let dirs = ['east', 'south', 'west', 'north']
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


  /**
   * Traverses dungeon and returns an array of copies of the rooms
   *
   * @returns {Object[]} array of room objects
   *
   * @memberOf Dungeon
   */
  flatten() {
    let flattened = []
    this.forEach(this.entrance, r => {
      flattened.push(Object.assign({}, r))
    })

    return flattened
  }

  /**
   * Recursively traverses dungeon starting with passed in room
   *
   * @param {Room} room - instance of room
   * @param {function(room:Room)} fn - function to call for each room, gets passed room
   *
   * @memberOf Dungeon
   */
  forEach(room, fn, visited={}) {
    Object.keys(room.adjacentRooms).forEach(r => {
      let currentRoom = room.adjacentRooms[r]
      if (visited[currentRoom.id]) return
      visited[currentRoom.id] = true
      fn(Object.assign({}, currentRoom))
      this.forEach(currentRoom, fn, visited)
    })
  }
}