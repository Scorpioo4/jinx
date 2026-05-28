const Character = require('./character');
const Skill = require('./skill');
const BattleEngine = require('./battle');

function createWarrior(name) {
  const warrior = new Character(name, 150, 15, 8);
  const slash = new Skill('旋风斩', 30, 0, 'physical');
  slash.cooldown = 2;
  return { character: warrior, skill: slash };
}

function createMage(name) {
  const mage = new Character(name, 80, 8, 3);
  const fireball = new Skill('火球术', 45, 0, 'magic');
  fireball.cooldown = 3;
  return { character: mage, skill: fireball };
}

function runDemo() {
  const { character: hero, skill: heroSkill } = createWarrior('张无忌');
  const { character: enemy, skill: enemySkill } = createMage('成昆');

  const engine = new BattleEngine();
  const result = engine.fight(hero, enemy, heroSkill, enemySkill);

  console.log('=== 战斗开始 ===');
  engine.getLog().forEach((entry) => console.log(entry));
  console.log('=== 战斗结束 ===');

  if (result.draw) {
    console.log(`平局！共 ${result.round} 回合`);
  } else {
    console.log(`胜者: ${result.winner.name} (HP: ${result.winner.hp})`);
    console.log(`败者: ${result.loser.name}`);
    console.log(`共 ${result.round} 回合`);
  }
}

runDemo();
