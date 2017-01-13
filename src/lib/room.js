
/**
 * Rooms that compose a dungeon
 *
 * @export
 * @class Room
 */
export default class Room {

  constructor() {
    this.adjacentRooms = {}
    this.monster = null
    this.hasExit = null
    this.hasEntrance = null
    this.validCommands = []
    this.description = 'a damn room'
  }

  /**
   * Associates passed in room with current room by storing a
   * reference in the adjacentRooms property of each
   *
   * @param {Room} room - adjacent room
   * @param {string} dir - direction of adjacent room
   *
   * @memberOf Room
   */
  addNeighbor(room, dir) {
    let inverse = {n: 's', e: 'w', w: 'e', s: 'n'}

    room.adjacentRooms[inverse[dir]] = this
    this.adjacentRooms[dir] = room
  }

  /**
   * Creates a string based on the properties of the room
   *
   * @returns {string} description message
   *
   * @memberOf Room
   */
  descriptionMessage() {
    let directions = Object.keys(this.adjacentRooms).join(' or ')
    let hasMonster = this.monster ? ' There\'s a monster here!' : ''
    let hasExit = this.hasExit ? ' You can leave if you want.' : ''
    let hasEntrance = this.hasEntrance ? ' This is where you came in.' : ''
    let baseMessage = `You are in ${this.description}. You can go ${directions}.`
    return baseMessage + hasExit + hasEntrance + hasMonster
  }


  /**
   * List of commands based on Room properties
   *
   * @readonly
   *
   * @memberOf Room
   */
  get commands() {
    let commands = ['help', 'look', ...Object.keys(this.adjacentRooms)]
    if (this.hasExit) commands = commands.concat('exit')
    if (this.monster) commands = commands.concat('attack')

    return commands
  }
}