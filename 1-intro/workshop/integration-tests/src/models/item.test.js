const Item = require("./Item");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

describe("Create item", () => {
  it("should that create item", async () => {
    await Item.deleteMany({});
    let item = new Item({ name: "My super item" });
    item = await item.save();
  
    const expectedItem = await Item.findOne({ name: "My super item" });
    expect(expectedItem.name).toBe(item.name);
  });
  
  it("should can't create item without name", async () => {
    await Item.deleteMany({});
    let item = new Item({});
    await expect(item.save()).rejects.toThrow('item validation failed: name: Path `name` is required.');
  });
})

it("should that return items list", async () => {
  await Item.deleteMany({});
  await Item.insertMany([
    { name: "My super item" },
    { name: "My super item 2" },
  ]);

  const items = await Item.find({});
  expect(items.length).toBe(2);
  expect(items[0].name).toBe("My super item");
  expect(items[1].name).toBe("My super item 2");
});

describe("Update item", () => {
  it("should that update item", async () => {
    await Item.deleteMany({});
    await Item.insertMany([
      { name: "My super item" },
      { name: "My super item 2" },
    ]);
  
    await Item.updateOne({ name: "My super item" }, { name: "My super item 3" });
    const items = await Item.find({});
    expect(items[0].name).toBe("My super item 3");
    expect(items[1].name).toBe("My super item 2");
  });
  
  it("should can't update item with nont a string name", async () => {
    await Item.deleteMany({});
    await Item.insertMany([
      { name: "My super item" },
      { name: "My super item 2" },
    ]);
  
    await expect(Item.updateOne({ name: "My super item" }, { name: ['bonjour','test'] })).rejects.toThrow("Cast to string failed for value \"[ 'bonjour', 'test' ]\" (type Array) at path \"name\"");
  });
})

it("should that delete item", async () => {
  await Item.deleteMany({});
  await Item.insertMany([
    { name: "My super item" },
    { name: "My super item 2" },
  ]);

  await Item.deleteOne({ name: "My super item" });
  const items = await Item.find({});
  expect(items.length).toBe(1);
  expect(items[0].name).toBe("My super item 2");
});
