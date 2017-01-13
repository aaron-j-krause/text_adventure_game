import Dungeon from './dungeon'

export default class DungeonMaster {
  constructor() {
    let dungeon = new Dungeon()

    this.dungeon = dungeon
    this.currentRoom = dungeon.entrance    
  }

  interact(command, room) {
    let commands = room.commands
    console.log(command, room.commands, room)
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