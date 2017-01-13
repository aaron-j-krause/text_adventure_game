import Room from './room'

export default class Dungeon {
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