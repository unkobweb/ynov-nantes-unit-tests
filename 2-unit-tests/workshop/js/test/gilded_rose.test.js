const {Shop, Item} = require("../src/gilded_rose");

describe("Test modifyQuality function", () => {
  it("should return 50 when quality + amount > 50", () => { 
    const shop = new Shop();
    expect(shop.modifyQuality(45, 9)).toBe(50);
    expect(shop.modifyQuality(50, 0)).toBe(50);
    expect(shop.modifyQuality(50, 1)).toBe(50);
  });

  it("should return 0 when quality + amount < 0", () => {
    const shop = new Shop();
    expect(shop.modifyQuality(4, -5)).toBe(0);
    expect(shop.modifyQuality(0, -1)).toBe(0);
    expect(shop.modifyQuality(0, -2)).toBe(0);
  });

  it("should return the correct value when quality + amount between 50 and 0", () => {
    const shop = new Shop();
    expect(shop.modifyQuality(0, 1)).toBe(1); 
    expect(shop.modifyQuality(10, 5)).toBe(15);
    expect(shop.modifyQuality(50, -1)).toBe(49);
    expect(shop.modifyQuality(40, -2)).toBe(38);
  })

  it("should throw an error when quality or amount is not a number", () => {
    const shop = new Shop();
    expect(() => shop.modifyQuality("a", 1)).toThrow();
    expect(() => shop.modifyQuality(1, "a")).toThrow();
    expect(() => shop.modifyQuality("a", "a")).toThrow();
    expect(() => shop.modifyQuality(1)).toThrow();
    expect(() => shop.modifyQuality()).toThrow();
    expect(() => shop.modifyQuality(undefined, 1)).toThrow();
    expect(() => shop.modifyQuality(1, undefined)).toThrow();
  })
})

describe("Test isValidItem function", () => {
  const incorrectItems = [
    new Item({name: "", sellIn: 1, quality: 1}),
    new Item({name: "Aged Brie", sellIn: "a", quality: 1}),
    new Item({name: "Aged Brie", sellIn: 1, quality: "a"})
  ];

  it.each(incorrectItems)("should throw an error when %p", (item) => {
    const shop = new Shop();
    expect(() => shop.isValidItem(item)).toThrow();
  })
  
})

describe("Gilded Rose", function() {

  const dataSetInvalid = [
    new Item(),
    new Item("Super item"),
    new Item("Super item", null),
    new Item("Super item", 30, null)
  ]

  // TODO : Tous les éléments ont une valeur sellIn qui désigne le nombre de jours restant pour vendre l'article.
  // TODO : Tous les articles ont une valeur quality qui dénote combien l'article est précieux.
  it.each(dataSetInvalid)("should failed when given sellIn is undefined", (item) => {
    const gildedRose = new Shop([item]);
    expect(() => gildedRose.updateQuality()).toThrow()
  });

  // TODO : À la fin de chaque journée, notre système diminue ces deux valeurs pour chaque produit.
  it('should decrease sellIn and quality by 1', () => {
    const gildedRose = new Shop([new Item("Super item", 10, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(9);
  })

  // TODO : Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  it('should decrease quality twice as fast when sellIn is 0', () => {
    const gildedRose = new Shop([new Item("Super item", 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(8);
  })

  // TODO : La qualité (quality) d'un produit ne peut jamais être négative.
  it ('quality should never be negative', () => {
    const gildedRose = new Shop([new Item("Super item", 10, 0), new Item("Super item", -1, 1)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(0);
    expect(gildedRose.items[1].sellIn).toBe(-2);
    expect(gildedRose.items[1].quality).toBe(0);
  }) 

  // TODO : "Aged Brie" augmente sa qualité (quality) plus le temps passe.
  it('should increase quality by 1 when item is "Aged Brie"', () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 10), new Item("Aged Brie", -1, 1)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(11);
    expect(gildedRose.items[1].sellIn).toBe(-2);
    expect(gildedRose.items[1].quality).toBe(2);
  })

  // TODO : La qualité d'un produit n'est jamais de plus de 50.
  it('quality should never be more than 50', () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50), new Item("Aged Brie", -1, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(50);
    expect(gildedRose.items[1].sellIn).toBe(-2);
    expect(gildedRose.items[1].quality).toBe(50);
  })

  // TODO : "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)
  it('should never decrease quality and sellIn when item is "Sulfuras"', () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80), new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(10);
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[1].sellIn).toBe(-1);
    expect(gildedRose.items[1].quality).toBe(80);
  })

  // TODO : "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.
  it('should increase quality by 2 when item is "Backstage passes" and sellIn is 10 or less', () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(12);
    expect(gildedRose.items[1].sellIn).toBe(4);
    expect(gildedRose.items[1].quality).toBe(13);
    expect(gildedRose.items[2].sellIn).toBe(-1);
    expect(gildedRose.items[2].quality).toBe(0);
    expect(gildedRose.items[3].sellIn).toBe(11);
    expect(gildedRose.items[3].quality).toBe(11);
  })

  // BONUS
  // TODO : les éléments "Conjured" voient leur qualité se dégrader de deux fois plus vite que les objets normaux.
  it('should decrease quality twice as fast when item is "Conjured"', () => {
    const gildedRose = new Shop([new Item("Conjured", 10, 10), new Item("Conjured", -1, 1)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(8);
    expect(gildedRose.items[1].sellIn).toBe(-2);
    expect(gildedRose.items[1].quality).toBe(0);
  })
});
