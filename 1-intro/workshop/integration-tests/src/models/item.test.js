const Item = require("./Item");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

it("should that create item", async () => {
  await Item.deleteMany({});
  let item = new Item({ name: "My super item" });
  item = await item.save();

  const expectedItem = await Item.findOne({ name: "My super item" });
  expect(expectedItem.name).toBe(item.name);
});

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

// TODO : test update item

// TODO : test delete item
