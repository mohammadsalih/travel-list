import React from "react";

export default function PackingItem({
  item,
  onDeleteItem,
  onPackItem,
}) {
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
