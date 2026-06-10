const { randomInt } = require('./utils');
const Player = require('./player');
const EnemySpawner = require('./enemy');
const BattleEngine = require('./battle');

class QuestSystem {
  constructor() {
    this.activeQuests = [];
    this.completedQuests = [];
  }

  createQuest(name, description, enemyType, targetCount, rewardGold) {
    return {
      id: `quest_${Date.now()}_${randomInt(1, 999)}`,
      name,
      description,
      enemyType,
      targetCount,
      killCount: 0,
      rewardGold,
    };
  }

  acceptQuest(quest) {
    this.activeQuests.push(quest);
  }

  reportKill(player, questId) {
    const quest = this.activeQuests.find((q) => q.id === questId);
    if (!quest) return null;

    quest.killCount += 1;
    if (quest.killCount >= quest.targetCount) {
      return this.completeQuest(player, questId);
    }
    return { completed: false, killCount: quest.killCount, targetCount: quest.targetCount };
  }

  completeQuest(player, questId) {
    const index = this.activeQuests.findIndex((q) => q.id === questId);
    if (index === -1) return null;

    const quest = this.activeQuests.splice(index, 1)[0];
    player.gold += quest.rewardGold;
    player.gainExp(quest.targetCount * 30);
    this.completedQuests.push(quest);
    return { completed: true, quest, rewardGold: quest.rewardGold };
  }

  simulateQuestBattle(player, quest) {
    const enemyData = EnemySpawner.spawn(quest.enemyType);
    const engine = new BattleEngine();

    const enemy = {
      name: enemyData.name,
      hp: enemyData.hp,
      maxHp: enemyData.hp,
      attack: enemyData.attack,
      defense: enemyData.defense,
      isAlive() { return this.hp > 0; },
      takeDamage(dmg) {
        const actual = Math.max(1, dmg - this.defense);
        this.hp = Math.max(0, this.hp - actual);
        return actual;
      },
      heal() { return this.hp; },
      gainExp() {},
    };

    const result = engine.fight(player, enemy);
    if (result.winner === player) {
      const loot = EnemySpawner.generateLoot(quest.enemyType);
      loot.forEach((item) => player.inventory.addItem(item));
      return { victory: true, loot: loot.map((i) => i.name) };
    }
    return { victory: false };
  }

  listActive() {
    return this.activeQuests.map((q) => ({
      id: q.id,
      name: q.name,
      progress: `${q.killCount}/${q.targetCount}`,
    }));
  }
}

module.exports = QuestSystem;
