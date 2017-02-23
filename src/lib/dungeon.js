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
    const grid = [
      ['x', 'n', 'x'],
      ['x', 'o', 'x'],
      ['x', 'e', 'o']
    ]
    let currentRoom
    let newRoom

    for (let y = 0; y < grid.length; y += 1) {
      for (let x = 0; x < grid[y].length; x += 1) {
        currentRoom = grid[y][x]
        if (currentRoom === 'x' || currentRoom === 'n' || currentRoom === 'e') {
          newRoom = new Room()

          newRoom.hasEntrance = currentRoom === 'n'
          newRoom.hasExit = currentRoom === 'e'
          newRoom.id = (y * 3) + x

          if (newRoom.hasEntrance) this.entrance = newRoom
          grid[y][x] = newRoom
          join(x, y, newRoom)
        }
      }
    }

    function join(x, y, room) {
      const steps = [[1, 0], [0, 1], [-1, 0], [0, -1]]
      const dirs = ['east', 'south', 'west', 'north']
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
    const flattened = []
    this.forEach(this.entrance, (r) => {
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
  forEach(room, fn, visited = {}) {
    Object.keys(room.adjacentRooms).forEach((r) => {
      const currentRoom = room.adjacentRooms[r]
      if (visited[currentRoom.id]) return
      visited[currentRoom.id] = true
      fn(Object.assign({}, currentRoom))
      this.forEach(currentRoom, fn, visited)
    })
  }
}
