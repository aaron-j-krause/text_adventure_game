const Room = require('../src/lib/room').default
const expect = require('chai').expect

describe('room.js', () => {
  describe('init', () => {
    let testRoom
    beforeEach(() => {
      testRoom = new Room()
    })

    it('should instantiate a room', () => {
      expect(testRoom.adjacentRooms).to.be.a('object')
    })
  })

  describe('prototpe methods', () => {
    let testRoom
    beforeEach(() => {
      testRoom = new Room()
    })

    it('addNeighbor should add a new adjacent connection', () => {
      let adjacentCount = Object.keys(testRoom.adjacentRooms).length
      let newCount
      testRoom.addNeighbor({adjacentRooms: {}}, 'w')

      newCount = Object.keys(testRoom.adjacentRooms).length

      expect(newCount).to.be.above(adjacentCount)
    })
  })
})