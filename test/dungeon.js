const Dungeon = require('../src/lib/dungeon').default
const assert = require('assert')
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

  describe('flatten', () => {
    let flattenedDungeon

    before(() => {
      let testDungeon = new Dungeon()
      flattenedDungeon = testDungeon.flatten()
    })

    it('should create an array representing the dungeon', () => {
      expect(Array.isArray(flattenedDungeon)).to.equal(true)
      expect(flattenedDungeon.length).to.equal(VALID_ROOMS)
    })
  })
})