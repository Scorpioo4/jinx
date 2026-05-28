const { clamp } = require('./utils');

class Character {
  constructor(name, hp = 100, attack = 10, defense = 5) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.attack = attack;
    this.defense = defense;
    this.skills = [];
    this.level = 1;
    this.exp = 0;
  }

  takeDamage(rawDamage) {
    const actualDamage = Math.max(1, rawDamage - this.defense);
    this.hp = clamp(this.hp - actualDamage, 0, this.maxHp);
    return actualDamage;
  }

  heal(amount) {
    this.hp = clamp(this.hp + amount, 0, this.maxHp);
    return this.hp;
  }

  isAlive() {
    return this.hp > 0;
  }

  gainExp(amount) {
    this.exp += amount;
    const threshold = this.level * 100;
    if (this.exp >= threshold) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;
    this.maxHp += 20;
    this.attack += 5;
    this.defense += 3;
    this.hp = this.maxHp;
    this.exp = 0;
  }
}

module.exports = Character;
