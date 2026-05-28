const Item = require('./item');

class Inventory {
  constructor(maxSlots = 20) {
    this.slots = [];
    this.maxSlots = maxSlots;
  }

  addItem(item) {
    if (item.stackable) {
      const existing = this.slots.find((s) => s.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
        return true;
      }
    }
    if (this.slots.length >= this.maxSlots) {
      return false;
    }
    this.slots.push(item.clone());
    return true;
  }

  removeItem(itemId, quantity = 1) {
    const index = this.slots.findIndex((s) => s.id === itemId);
    if (index === -1) return false;

    const item = this.slots[index];
    if (item.quantity > quantity) {
      item.quantity -= quantity;
    } else {
      this.slots.splice(index, 1);
    }
    return true;
  }

  useItem(itemId, character) {
    const item = this.slots.find((s) => s.id === itemId);
    if (!item) return null;

    const result = item.use(character);
    if (item.type === 'potion') {
      this.removeItem(itemId);
    }
    return result;
  }

  findByType(type) {
    return this.slots.filter((s) => s.type === type);
  }

  list() {
    return this.slots.map((s) => `${s.name} x${s.quantity}`);
  }
}

module.exports = Inventory;
