// import { useState } from "react";
import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function Logo() {
  return <h1>🏝️ far away 💼</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = {
      quantity,
      description,
      packed: false,
      id: Date.now(),
    };

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip : </h3>

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
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>add</button>
    </form>
  );
}

function PackingList({ data }) {
  return (
    <div className="list">
      <ul>
        {data.map((item) => (
          <PackingItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function PackingItem({ item }) {
  // const [packed, setPacked] = useState(false);

  return (
    <li>
      <input
        type="checkbox"
        // value={packed}
        // onChange={setPacked(!packed)}
      />

      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {`${item.quantity} ${item.description}`}
      </span>

      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        you have x items on your list , and you already packed x%
      </em>
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList data={initialItems} />
      <Stats />
    </div>
  );
}

export default App;
