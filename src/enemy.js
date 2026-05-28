const { randomInt } = require('./utils');
const Item = require('./item');

class EnemySpawner {
  static spawn(type) {
    const templates = {
      goblin: { hp: 30, attack: 6, defense: 2 },
      bandit: { hp: 50, attack: 10, defense: 4 },
      boss: { hp: 200, attack: 20, defense: 12 },
    };
    const tmpl = templates[type] || templates.goblin;
    const name = type === 'boss' ? 'BOSS·金轮法王' : `${type}_${randomInt(1, 999)}`;
    return {
      name,
      hp: tmpl.hp + randomInt(-5, 10),
      attack: tmpl.attack + randomInt(-2, 3),
      defense: tmpl.defense + randomInt(-1, 2),
    };
  }

  static generateLoot(enemyType) {
    const lootTable = {
      goblin: [
        new Item('potion_small', '小红药', 'potion', 30),
      ],
      bandit: [
        new Item('potion_small', '小红药', 'potion', 30),
        new Item('iron_sword', '铁剑', 'weapon', 5),
      ],
      boss: [
        new Item('potion_large', '大红药', 'potion', 80),
        new Item('steel_blade', '精钢刀', 'weapon', 12),
        new Item('chain_mail', '锁子甲', 'armor', 10),
      ],
    };
    const table = lootTable[enemyType] || lootTable.goblin;
    const drops = table.filter(() => randomInt(1, 100) > 40);
    return drops;
  }
}

module.exports = EnemySpawner;
