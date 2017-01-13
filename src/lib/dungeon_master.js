import Dungeon from './dungeon'

/**
 * Class that runs the game
 *
 * @export
 * @class DungeonMaster
 */
export default class DungeonMaster {
  constructor() {
    let dungeon = new Dungeon()

    this.dungeon = dungeon
    this.currentRoom = dungeon.entrance
  }

  /**
   * Interact with the dungeon via command string
   *
   * @param {string} command - command from user input
   * @param {Room} room - current room instance
   * @returns
   *
   * @memberOf DungeonMaster
   */
  interact(command, room) {
    let commands = room.commands
    if (!commands.includes(command)) return 'you can\'t do that'

    switch (command) {
      case 'n':
      case 's':
      case 'w':
      case 'e':
        this.currentRoom = this.currentRoom.adjacentRooms[command]
        return `You went ${command}.`
      case 'help':
        return 'Your choices are ' + commands.join(' ')
      case 'fight':
        return 'You died.'
      case 'exit':
        return 'You left the dungeon.'
      case 'look':
        return this.descriptionMessage()
    }
  }
}