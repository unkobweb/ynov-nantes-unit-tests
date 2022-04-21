const Item = require("../models/Item");
const ItemService = require("./itemService");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

describe("Create item", () => {
  it("should that cannot create item", async () => {
    await Item.deleteMany({});

    expect(() => ItemService.createItem({})).toThrow(
      "No name provided in the body"
    );
  });

  it("should that create item", async () => {
    await Item.deleteMany({});
    const item = await ItemService.createItem({ name: "My super item" });

    await Item.findOne({ name: "My super item" });
    expect(item.name).toBe("My super item");
  });
});

it("should that return items list", async () => {
  await Item.deleteMany({});
  await Item.insertMany([
    { name: "My super item" },
    { name: "My super item 2" },
  ]);

  const items = await ItemService.listItems();
  expect(items.length).toBe(2);
  expect(items[0].name).toBe("My super item");
  expect(items[1].name).toBe("My super item 2");
});
