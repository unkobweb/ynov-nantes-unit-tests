class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  modifyQuality(quality, amount) {
    if (typeof quality !== 'number' || typeof amount !== 'number') {
      throw new Error('modifyQuality requires two numbers as arguments');
    }

    if (quality + amount > 50) {
      return 50;
    } else if (quality + amount < 0) {
      return 0;
    } else {
      return quality + amount;
    }
  }

  isValidItem(item) {
    if(!item.name && typeof item.name !== 'string') {
      throw new Error('Item name must be a none empty string');
    }

    if(typeof item.sellIn !== 'number') {
      throw new Error('Item sellIn must be a number');
    }

    if(typeof item.quality !== 'number') {
      throw new Error('Item quality must be a number');
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.isValidItem(this.items[i])

      this.items[i].sellIn--;

      switch (this.items[i].name) {

        case "Aged Brie":
          this.items[i].quality = this.modifyQuality(this.items[i].quality, 1);
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          if (this.items[i].sellIn <= 5 && this.items[i].sellIn > 0) {
            this.items[i].quality = this.modifyQuality(this.items[i].quality, 3);
          } else if (this.items[i].sellIn <= 10 && this.items[i].sellIn > 0) {  
            this.items[i].quality = this.modifyQuality(this.items[i].quality, 2);
          } else if (this.items[i].sellIn > 0) {
            this.items[i].quality = this.modifyQuality(this.items[i].quality, 1);
          } else {
            this.items[i].quality = 0;
          }
          break;

        case "Sulfuras, Hand of Ragnaros":
          this.items[i].sellIn++; // Sulfuras never expires
          break;

        default:
          let degradation = this.items[i].sellIn < 0 ? -2 : -1;

          // If item is conjured, degrade twice as fast
          if (this.items[i].name.toLowerCase().includes('conjured')) {
            degradation *= 2;
          }

          this.items[i].quality = this.modifyQuality(this.items[i].quality, degradation);
          break;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
