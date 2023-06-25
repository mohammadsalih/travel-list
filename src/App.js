import React, { useState } from "react";
import "./index.css";

import Logo from "./logo";
import Form from "./form.js";
import PackingList from "./PackingList.js";
import Stats from "./Footer.js";

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
