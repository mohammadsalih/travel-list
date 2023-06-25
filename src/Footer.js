export default function Stats({ items }) {
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
