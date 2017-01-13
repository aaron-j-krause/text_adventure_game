export default class Room {

  constructor() {
    this.adjacentRooms = {}
    this.monster = null
    this.hasExit = null
    this.hasEntrance = null
    this.validCommands = []
    this.description = 'a damn room'
  }

  addNeighbor(room, dir) {
    let inverse = {n: 's', e: 'w', w: 'e', s: 'n'}

    room.adjacentRooms[inverse[dir]] = this
    this.adjacentRooms[dir] = room
  }

  descriptionMessage() {
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
}