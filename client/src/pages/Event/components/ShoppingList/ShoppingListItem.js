import React from "react";

const ShoppingListItem = ({
  listItem,
  editListItem,
  putListItem,
  listItemToEdit,
  setListItemToEdit,
  toggleListItem,
  deleteListItem
}) => {
  const handleChange = e => {
    setListItemToEdit({ ...listItemToEdit, [e.target.name]: e.target.value });
  };

  const saveEdit = e => {
    e.preventDefault();
    putListItem();
  };

  return (
    <div>
      {/* Conditional rendering of form or item based on editing boolean */}
      {listItemToEdit.id && listItemToEdit.id === listItem.id ? (
        <form onSubmit={saveEdit}>
          <label>
            <input
              type="text"
              name="item_name"
              value={listItemToEdit.item_name}
              onChange={handleChange}
            />
          </label>
          <label>
            $
            <input
              type="number"
              name="item_cost"
              value={listItemToEdit.item_cost}
              onChange={handleChange}
            />
            <span>.00</span>
          </label>
          <div className="item-buttons-container">
            <button id="save-edit">save edit</button>
            <span>toggle</span>
            <span>delete</span>
          </div>
        </form>
      ) : (
        <div
          className={`item-container${
            listItem.item_complete ? "-completed" : ""
          }`}
        >
          <div className="item-text-container">
            <p onClick={() => editListItem(listItem)}>{listItem.item_name}</p>
          </div>
          <div className="item-text-container">
            <p onClick={() => editListItem(listItem)}> ${listItem.item_cost}</p>
          </div>
          <div className="item-buttons-container">
            <span onClick={() => editListItem(listItem)}>edit</span>
            <span onClick={() => toggleListItem(listItem)}>toggle</span>
            <span onClick={() => deleteListItem(listItem.id)}>delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListItem;
