const Dungeon = require('../../src/lib/dungeon').default
const expect = require('chai').expect

//grid is hard coded in generate, it has 9 items
//two of them are empty spaces
const GRID_LENGTH = 9
const VALID_ROOMS = 7

describe('dungeon.js', () => {
  describe('init', () => {
    let testDungeon
    before(() => {
      testDungeon = new Dungeon()
    })
    it('should have a property entrance that has an entrance', () => {
      expect(typeof testDungeon.entrance).to.equal('object')
      expect(testDungeon.entrance.hasEntrance).to.be.true
    })
  })

  describe('prototype methods', () => {
    let testDungeon

    before(() => {
      testDungeon = new Dungeon()
    })

    it('flatten should create an array representing the dungeon', () => {
      let flattenedDungeon = testDungeon.flatten()

      expect(Array.isArray(flattenedDungeon)).to.equal(true)
      expect(flattenedDungeon.length).to.equal(VALID_ROOMS)
    })
  })
})