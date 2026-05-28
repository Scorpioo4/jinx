const Character = require('./character');
const Skill = require('./skill');

class BattleEngine {
  constructor() {
    this.round = 0;
    this.log = [];
  }

  attack(attacker, defender) {
    if (!attacker.isAlive() || !defender.isAlive()) {
      return null;
    }
    const damage = defender.takeDamage(attacker.attack);
    this.log.push(`${attacker.name} 对 ${defender.name} 造成了 ${damage} 点伤害`);
    return damage;
  }

  useSkill(caster, target, skill) {
    if (!skill.canUse(Infinity)) {
      return null;
    }
    const damage = skill.calculateDamage(caster);
    const actualDamage = target.takeDamage(damage);
    skill.use();
    this.log.push(`${caster.name} 使用 ${skill.name} 对 ${target.name} 造成了 ${actualDamage} 点伤害`);
    return actualDamage;
  }

  executeTurn(fighter1, fighter2, skill1 = null, skill2 = null) {
    this.round += 1;

    if (skill1 && skill1.canUse(Infinity)) {
      this.useSkill(fighter1, fighter2, skill1);
    } else {
      this.attack(fighter1, fighter2);
    }

    if (!fighter2.isAlive()) {
      fighter1.gainExp(50);
      return { winner: fighter1, loser: fighter2, round: this.round };
    }

    if (skill2 && skill2.canUse(Infinity)) {
      this.useSkill(fighter2, fighter1, skill2);
    } else {
      this.attack(fighter2, fighter1);
    }

    if (!fighter1.isAlive()) {
      fighter2.gainExp(50);
      return { winner: fighter2, loser: fighter1, round: this.round };
    }

    return null;
  }

  fight(fighter1, fighter2, skill1 = null, skill2 = null) {
    const maxRounds = 100;
    while (fighter1.isAlive() && fighter2.isAlive() && this.round < maxRounds) {
      const result = this.executeTurn(fighter1, fighter2, skill1, skill2);
      if (result) return result;
    }
    return { winner: null, loser: null, round: this.round, draw: true };
  }

  getLog() {
    return [...this.log];
  }

  reset() {
    this.round = 0;
    this.log = [];
  }
}

module.exports = BattleEngine;
