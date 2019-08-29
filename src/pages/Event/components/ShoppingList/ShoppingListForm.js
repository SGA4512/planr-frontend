import React, { useState } from "react";

const initialEditingListItem = {
  event_id: "",
  item_name: "",
  item_cost: 0,
  item_complete: false
  // item_vendor: ""
};

const ShoppingListForm = ({ addListItem, eventId }) => {
  const [input, setInput] = useState(initialEditingListItem);

  const handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // console.log("target", value)

    setInput({
      ...input,
      // [e.target.name]: e.target.value,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // post request to shoppingListItems
    addListItem(input, eventId);
    setInput(initialEditingListItem);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="add-item-form">
        <input
          name="item_name"
          value={input.item_name}
          onChange={handleChange}
          type="text"
          placeholder="item name"
        />
        <label>
          $
          <input
            name="item_cost"
            value={input.item_cost}
            onChange={handleChange}
            type="number"
            placeholder="item cost"
          />
          <span>.00</span>
        </label>
        <label>
          <input
            name="item_complete"
            onChange={handleChange}
            type="checkbox"
            checked={input.item_complete}
          />
          bought?
        </label>
        <div className="item-buttons-container">
          <button type="submit">add to list</button>
        </div>
      </form>
    </>
  );
};
export default ShoppingListForm;
