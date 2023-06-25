import React, { useState } from "react";
import "./index.css";

function Logo() {
  return (
    <header>
      <h1>🏝️ far away 💼</h1>
    </header>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description) return;

    const newItem = {
      quantity,
      description,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip:</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map(
          (num) => (
            <option value={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

function PackingList({
  items,
  onDeleteItem,
  onPackItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = [...items];

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <main className="list">
      <ul>
        {sortedItems.map((item) => (
          <PackingItem
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onPackItem={onPackItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input" key={1}>
            SORT BY INPUT ORDER
          </option>
          <option value="description" key={2}>
            SORT BY DESCRIPTION
          </option>
          <option value="packed" key={3}>
            SORT BY PACKED STATUS
          </option>
        </select>

        <button onClick={onClearList}>Clear List</button>
      </div>
    </main>
  );
}

function PackingItem({ item, onDeleteItem, onPackItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onPackItem(item.id)}
      />

      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {`${item.quantity} ${item.description}`}
      </span>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer className="stats">
        Start adding some items to your packing list 🚀
      </footer>
    );

  let selectedItemsLength = 0;
  const itemsLength = items.length;

  for (let i = 0; i < itemsLength; i++) {
    if (items[i].packed) {
      selectedItemsLength++;
    }
  }

  const percentagePacked = (
    (selectedItemsLength / itemsLength) *
    100
  ).toFixed(0);
  const allItemsPacked = selectedItemsLength === itemsLength;

  return (
    <footer className="stats">
      <em>
        {allItemsPacked
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${itemsLength} items on your list, and you already packed ${selectedItemsLength} (${percentagePacked}%)`}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (newItem) => {
    setItems((items) => [...items, newItem]);
  };

  const handleDeleteItem = (itemId) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handlePackItem = (itemId) => {
    setItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = () => {
    if (items.length === 0) return;
    if (!window.confirm("Do you want to clear the list")) return;
    setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackItem={handlePackItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
