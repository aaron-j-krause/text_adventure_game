import React from 'react'

class Character {
  constructor(type) {

  }

  /**
   * Object with arrays of stat modifiers by type
   * [hp, str, def, dex]
   * @readonly
   * @static
   *
   * @memberOf Character
   */
  static get typeBaseModifiers() {
    return {
      human: [0, 0, 0, 0],
      elf: [0, -1, 0, 1],
      troll: [10, -1, 1, -1],
      shade: [-5, -1, 1, 3]
    }
  }

  static get typeLevelModifiers() {
    return {
      human: [1.15, 1.15, 1.15, 1.15],
      elf: [1.15, 1.1, 1.15, 1.2],
      troll: [1.2, 1.1, 1.2, 1.1],
      shade: [1.1, 1.1, 1.2, 1.25]
    }
  }

  static get baseStats() {
    //[hp, str, def, dex]
    return [10, 2, 2, 2]
  }

  static get statNames() {
    return ['hp', 'str', 'def', 'dex']
  }

  baseStats() {
    let {statNames, typeBaseModifiers, baseStats} = Character
    let mods = typeBaseModifiers[this.type]
    this.level = 1

    statNames.reduce((a, c, i) => {
      a[c] = baseStats[i] + mods[i]
      return this
    }, this)
  }

  levelUp() {
    this.exp = 0
    if (this.nextLevel) this.nextLevel = Math.ceil(this.nextLevel * 1.5)
    let {statNames, typeLevelModifiers} = Character
    let mods = typeLevelModifiers[this.type]
    this.level++

    statNames.reduce((a, c, i) => {
      a[c] = Math.ceil(a[c] * mods[i])
      return this
    }, this)
  }
}

export class Hero extends Character {
  constructor(type) {
    super()

    this.type = type
    this.inventory = []
    this.exp = 0
    this.nextLevel = 10
    super.baseStats()
  }
}

export class Monster extends Character {
  constructor(type, level) {
    super()

    this.type = type
    super.baseStats()
    for (; level > 1; level--) {
      this.levelUp()
    }
  }
}
