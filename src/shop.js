const Item = require('./item');
const { randomInt } = require('./utils');

class Shop {
  constructor() {
    this.stock = [];
    this.initDefaultStock();
  }

  initDefaultStock() {
    this.stock = [
      new Item('potion_small', '小红药', 'potion', 30),
      new Item('potion_large', '大红药', 'potion', 80),
      new Item('iron_sword', '铁剑', 'weapon', 5),
      new Item('steel_blade', '精钢刀', 'weapon', 12),
      new Item('leather_armor', '皮甲', 'armor', 4),
      new Item('chain_mail', '锁子甲', 'armor', 10),
    ];
    this.stock[0].quantity = 10;
    this.stock[1].quantity = 5;
    this.stock[2].quantity = 3;
    this.stock[3].quantity = 1;
    this.stock[4].quantity = 3;
    this.stock[5].quantity = 1;
  }

  listItems() {
    return this.stock.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      value: item.value,
      quantity: item.quantity,
      price: this.getPrice(item),
    }));
  }

  getPrice(item) {
    const base = item.value * 10;
    const fluctuation = randomInt(-5, 5);
    return Math.max(1, base + fluctuation);
  }

  buy(itemId, inventory, gold) {
    const stockItem = this.stock.find((s) => s.id === itemId);
    if (!stockItem || stockItem.quantity <= 0) {
      return { success: false, reason: 'item_not_available' };
    }
    const price = this.getPrice(stockItem);
    if (gold < price) {
      return { success: false, reason: 'not_enough_gold' };
    }
    const purchased = stockItem.clone();
    purchased.quantity = 1;
    if (!inventory.addItem(purchased)) {
      return { success: false, reason: 'inventory_full' };
    }
    stockItem.quantity -= 1;
    return { success: true, cost: price, remaining: gold - price };
  }
}

module.exports = Shop;
