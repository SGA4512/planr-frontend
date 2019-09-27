import React, { useState } from "react";
import { notification } from "antd";

const initialEditingListItem = {
  event_id: "",
  name: "",
  quantity: 1,
  cost: 0,
  completed: false
  // vendor_id: null
};

const BudgetItemsForm = ({ addListItem, eventId }) => {
  const [input, setInput] = useState(initialEditingListItem);

  const handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setInput({
      ...input,
      // [e.target.name]: e.target.value,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (input.name === "") {
      notification.open({
        message: "Please enter the budget item name"
      });
    } else {
      addListItem(input, eventId);
      setInput(initialEditingListItem);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="add-item-form">
        <input
          name="name"
          value={input.name}
          onChange={handleChange}
          type="text"
          placeholder="item name"
        />
        <label>
          $
          <input
            name="cost"
            value={input.cost}
            onChange={handleChange}
            type="number"
            placeholder="cost"
          />
          <span>.00</span>
        </label>
        <label>
          <input
            name="completed"
            onChange={handleChange}
            type="checkbox"
            checked={input.completed}
          />
          bought?
        </label>
        <div className="item-buttons-container">
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};
export default BudgetItemsForm;
