const Character = require('./character');
const Inventory = require('./inventory');

class Player extends Character {
  constructor(name) {
    super(name, 120, 12, 6);
    this.gold = 500;
    this.inventory = new Inventory(30);
  }

  buyItem(shop, itemId) {
    const result = shop.buy(itemId, this.inventory, this.gold);
    if (result.success) {
      this.gold = result.remaining;
    }
    return result;
  }

  useItemFromInventory(itemId) {
    return this.inventory.useItem(itemId, this);
  }

  equipBestWeapon() {
    const weapons = this.inventory.findByType('weapon');
    if (weapons.length === 0) return null;
    const best = weapons.reduce((a, b) => (a.value > b.value ? a : b));
    return best.use(this);
  }

  getStatus() {
    return {
      name: this.name,
      level: this.level,
      hp: `${this.hp}/${this.maxHp}`,
      attack: this.attack,
      defense: this.defense,
      gold: this.gold,
      items: this.inventory.list(),
    };
  }
}

module.exports = Player;
