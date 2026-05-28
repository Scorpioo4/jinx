class Item {
  constructor(id, name, type, value) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.value = value;
    this.stackable = type === 'potion';
    this.quantity = 1;
  }

  use(character) {
    switch (this.type) {
      case 'potion':
        return character.heal(this.value);
      case 'weapon':
        character.attack += this.value;
        return character.attack;
      case 'armor':
        character.defense += this.value;
        return character.defense;
      default:
        return null;
    }
  }

  clone() {
    const copy = new Item(this.id, this.name, this.type, this.value);
    copy.quantity = this.quantity;
    return copy;
  }
}

module.exports = Item;
