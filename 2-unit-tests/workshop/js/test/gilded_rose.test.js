const {Shop, Item} = require("../src/gilded_rose");

const fs = require('fs');
jest.mock('fs');
const writeFileSpy = fs.writeFileSync.mockImplementation();

describe("Test modifyQuality function", () => {
  const dataSetReturn50 = [
    [45, 9, 50],
    [50, 0, 50],
    [50, 1, 50],
  ]
  it.each(dataSetReturn50)("should return 50 when quality + amount > 50", (quality, amount, expectedQuality) => { 
    const shop = new Shop();
    expect(shop.modifyQuality(quality, amount)).toBe(expectedQuality);
  });

  const dataSetNeverUnderZero = [
    [4, -5, 0],
    [0, -1, 0],
    [0, -2, 0],
  ];
  it.each(dataSetNeverUnderZero)("should return 0 when quality + amount < 0", (quality, amount, expected) => {
    const shop = new Shop();
    expect(shop.modifyQuality(quality, amount)).toBe(expected);
  });

  const dataSetReturnQuality = [
    [0, 1, 1],
    [10, 5, 15],
    [50, -1, 49],
    [40, -2, 38],
  ];
  it.each(dataSetReturnQuality)("should return the correct value when quality + amount between 50 and 0", (quality, amount, expected) => {
    const shop = new Shop();
    expect(shop.modifyQuality(quality, amount)).toBe(expected);
  })

  const dataSetThrowError = [
    ["a", 1],
    [1, "a"],
    ["a", "a"],
    [1],
    [],
    [undefined, 1],
    [1, undefined],
  ]
  it.each(dataSetThrowError)("should throw an error when quality or amount is not a number", (quality = undefined, amount = undefined) => {
    const shop = new Shop();
    expect(() => shop.modifyQuality(quality, amount)).toThrow();
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

describe("Gilded Rose update quality", function() {

  afterEach(() => {
    writeFileSpy.mockClear();
  })
  
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
    expect(fs.writeFileSync).toBeCalledTimes(1);
  })

  // TODO : Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  it('should decrease quality twice as fast when sellIn is 0', () => {
    const gildedRose = new Shop([new Item("Super item", 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(8);
    expect(fs.writeFileSync).toBeCalledTimes(1);
  })

  // TODO : La qualité (quality) d'un produit ne peut jamais être négative.
  const dataSetQuality = [
    [new Item("Super item", 10, 0), 9, 0],
    [new Item("Super item", -1, 1), -2, 0],
  ]
  it.each(dataSetQuality)('quality should never be negative', (item, expectedSellIn, expectedQuality) => {
    const gildedRose = new Shop([item]);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(expectedSellIn);
    expect(item.quality).toBe(expectedQuality);
    expect(fs.writeFileSync).toBeCalledTimes(1);
  }) 

  // TODO : "Aged Brie" augmente sa qualité (quality) plus le temps passe.
  const dataSetAgedBrie = [
    [new Item("Aged Brie", 10, 10), 9, 11],
    [new Item("Aged Brie", -1, 1), -2, 2],
  ]
  it.each(dataSetAgedBrie)('should increase quality by 1 when item is "Aged Brie"', (item, expectedSellIn, expectedQuality) => {
    const gildedRose = new Shop([item]);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(expectedSellIn);
    expect(item.quality).toBe(expectedQuality);
    expect(fs.writeFileSync).toBeCalledTimes(1);
  })

  // TODO : La qualité d'un produit n'est jamais de plus de 50.
  const dataSetQualityMax = [
    [new Item("Aged Brie", 10, 50), 9, 50],
    [new Item("Aged Brie", -1, 50), -2, 50],
  ]
  it.each(dataSetQualityMax)('quality should never be more than 50', (item, expectedSellIn, expectedQuality) => {
    const gildedRose = new Shop([item]);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(expectedSellIn);
    expect(item.quality).toBe(expectedQuality);
    expect(fs.writeFileSync).toBeCalledTimes(1);
  })

  // TODO : "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)
  const dataSetSulfuras = [
    [new Item("Sulfuras, Hand of Ragnaros", 10, 80), 10, 80],
    [new Item("Sulfuras, Hand of Ragnaros", -1, 80), -1, 80],
  ]
  it.each(dataSetSulfuras)('should never decrease quality and sellIn when item is "Sulfuras"', (item, expectedSellIn, expectedQuality) => {
    const gildedRose = new Shop([item]);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(expectedSellIn);
    expect(item.quality).toBe(expectedQuality);
    expect(fs.writeFileSync).toBeCalledTimes(1);
  })

  // TODO : "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.
  const dataSetBackstagePasses = [
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10), 9, 12],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10), 4, 13],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10), -1, 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10), 11, 11],
  ]
  it.each(dataSetBackstagePasses)('should increase quality by 2 when item is "Backstage passes" and sellIn is 10 or less', (item, expectedSellIn, expectedQuality) => {
    const gildedRose = new Shop([item]);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(expectedSellIn);
    expect(item.quality).toBe(expectedQuality);
    expect(fs.writeFileSync).toBeCalledTimes(1);
  })

  // BONUS
  // TODO : les éléments "Conjured" voient leur qualité se dégrader de deux fois plus vite que les objets normaux.
  const dataSetConjured = [
    [new Item("Conjured", 10, 10), 9, 8],
    [new Item("Conjured", -1, 1), -2, 0],
  ]
  it.each(dataSetConjured)('should decrease quality twice as fast when item is "Conjured"', (item, expectedSellIn, expectedQuality) => {
    const gildedRose = new Shop([item]);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(expectedSellIn);
    expect(item.quality).toBe(expectedQuality);
    expect(fs.writeFileSync).toBeCalledTimes(1);
  })
});

describe('Gilded rose write file', () => {

  it('write valid file', () => {
    const gildedRose = new Shop([new Item("Super item", 10, 10)]);
    gildedRose.writeFile();
    expect(fs.writeFileSync).toBeCalledTimes(1);
  })  

  it('write file throw an error', () => {
    // simulate a write file error
    fs.writeFileSync.mockImplementation(() => {
      throw new Error('error')
    })

    const gildedRose = new Shop([new Item("Super item", 10, 10)]);
    expect(() => gildedRose.writeFile()).toThrow();
  })
    
})
