const { randomInt } = require('./utils');

class Skill {
  constructor(name, baseDamage, mpCost, type = 'physical') {
    this.name = name;
    this.baseDamage = baseDamage;
    this.mpCost = mpCost;
    this.type = type;
    this.cooldown = 0;
    this.currentCooldown = 0;
  }

  calculateDamage(attacker) {
    const bonus = randomInt(1, 10);
    if (this.type === 'physical') {
      return Math.floor(attacker.attack * 1.5) + bonus;
    }
    return this.baseDamage + bonus * 2;
  }

  canUse(casterMp) {
    return casterMp >= this.mpCost && this.currentCooldown === 0;
  }

  use() {
    this.currentCooldown = this.cooldown;
  }

  tickCooldown() {
    if (this.currentCooldown > 0) {
      this.currentCooldown -= 1;
    }
  }
}

module.exports = Skill;
