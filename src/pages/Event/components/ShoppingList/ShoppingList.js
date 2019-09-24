import React, { useState, useEffect } from "react";
import ShoppingListForm from "./ShoppingListForm";
import ShoppingListItem from "./ShoppingListItem";
import Expenditures from "../Expenditures/Expenditures";
import * as api from "../../../../services/api";

const initialListItem = {
  id: -1,
  event_id: "",
  item_name: "",
  item_cost: 0,
  item_complete: false
  // item_vendor: ""
};

const ShoppingList = ({ shoppingList, budget, eventId }) => {
  const [shoppingListItems, setShoppingListItems] = useState(shoppingList);
  const [listItemToEdit, setListItemToEdit] = useState(initialListItem);
  const [totalCost, setTotalCost] = useState(0);
  const [purchasedItemsCost, setPurchasedItemsCost] = useState(0);

  useEffect(() => {
    setShoppingListItems(shoppingList);
  }, [shoppingList]);

  // ALL ITEMS COST
  useEffect(() => {
    let temp = shoppingListItems.reduce(
      (acc, item) => acc + Number(item.item_cost),
      0
    );
    setTotalCost(temp);
  }, [shoppingListItems]);

  // PURCHASED ITEMS COST
  useEffect(() => {
    let temp = shoppingListItems
      .filter(item => item.item_complete)
      .reduce((acc, item) => acc + Number(item.item_cost), 0);
    setPurchasedItemsCost(temp);
    console.log(totalCost);
  }, [shoppingListItems]);

  const editListItem = item => {
    console.log("item clicked", item);
    setListItemToEdit(item);
  };

  // DELETE
  const deleteListItem = id => {
    // With endpoint
    api
      .deleteListItem(id)
      .then(res => {
        let temp = shoppingListItems.filter(item => item.id !== id);
        setShoppingListItems(temp);
      })
      .catch(err => console.log(err));

    // With dummy data
    // let temp = shoppingListItems.filter(item => item.id !== id);
    // setShoppingListItems(temp);
  };

  const putListItem = () => {
    api
      // .editListItem(listItem) // includes vendor_name which throws backend error
      .editListItem({
        id: listItemToEdit.id,
        item_name: listItemToEdit.item_name,
        item_cost: listItemToEdit.item_cost
      })
      .then(res => {
        // console.log("PUT LIST ITEM", res);
        let temp = shoppingListItems.map(item => {
          if (item.id === listItemToEdit.id) {
            return res.data[0];
            // return res.data; // ask Samantha to do .first
          }
          return item;
        });
        setShoppingListItems(temp);
        setListItemToEdit(initialListItem);
      })
      .catch(err => console.log(err.response));
  };

  // PUT
  const toggleListItem = listItem => {
    // With endpoint
    api
      // .editListItem({ item_complete: !listItem.item_complete })
      .editListItem({
        item_complete: !listItem.item_complete,
        id: listItem.id
      })
      .then(res => {
        let temp = shoppingListItems.map(item => {
          if (item.id === listItem.id) {
            return res.data[0];
            // return res.data; // ask Samantha to do .first
          }
          return item;
        });
        setShoppingListItems(temp);
      })
      .catch(err => console.log(err.response));

    // With dummy data
    // let temp = shoppingListItems.map(item => {
    //   if (item.id === id) {
    //     return { ...item, item_complete: !item.item_complete };
    //   }
    //   return item;
    // });
    // setShoppingListItems(temp);
  };

  // POST
  const addListItem = (item, event_id) => {
    // With endpoint
    api
      // .addListItem({ ...item, event_id, vendor_id: 1 }) // Samantha added left join
      .addListItem({ ...item, event_id })
      .then(res => {
        console.log("ADD ITEM", res.data);
        let temp = [...shoppingListItems, res.data[0]];
        // let temp = [...shoppingListItems, res.data]; // ask Samantha to do .first
        setShoppingListItems(temp);
      })
      .catch(err => console.log(err.response));

    // With dummy data
    // let temp = [...shoppingListItems, item];
    // console.log(temp);
    // setShoppingListItems(temp);
  };

  if (!shoppingListItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shopping-list-container">
      <h4>Budget Items</h4>
      <Expenditures
        totalCost={totalCost}
        purchasedItemsCost={purchasedItemsCost}
        budget={budget}
      />
      <ShoppingListForm
        addListItem={addListItem}
        initialListItem={initialListItem}
        eventId={eventId}
      />
      <div className="shopping-list-items-container">
        {shoppingListItems.map(listItem => (
          <ShoppingListItem
            key={listItem.id}
            putListItem={putListItem}
            listItemToEdit={listItemToEdit}
            setListItemToEdit={setListItemToEdit}
            editListItem={editListItem}
            listItem={listItem}
            toggleListItem={toggleListItem}
            deleteListItem={deleteListItem}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
