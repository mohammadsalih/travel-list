import React, { useState } from "react";
import PackingItem from "./PackingItem";

export default function PackingList({
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
