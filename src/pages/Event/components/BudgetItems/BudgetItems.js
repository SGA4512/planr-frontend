import React, { useState, useEffect } from "react";
import BudgetItemsForm from "./BudgetItemsForm";
import BudgetItem from "./BudgetItem";
import Expenditures from "../Expenditures/Expenditures";
import * as api from "../../../../services/api";

const initialListItem = {
  id: -1,
  event_id: "",
  name: "",
  cost: 0,
  quantity: null,
  completed: false,
  vendor_id: ""
};

const BudgetItems = ({ budgetItems, budget, eventId }) => {
  const [budgetItemsList, setBudgetItemsList] = useState(budgetItems);
  const [listItemToEdit, setListItemToEdit] = useState(initialListItem);
  const [totalCost, setTotalCost] = useState(0);
  const [purchasedItemsCost, setPurchasedItemsCost] = useState(0);

  useEffect(() => {
    setBudgetItemsList(budgetItems);
  }, [budgetItems]);

  console.log(budgetItemsList);

  // ALL ITEMS COST
  useEffect(() => {
    let temp = budgetItemsList.reduce(
      (acc, item) => acc + Number(item.cost),
      0
    );
    setTotalCost(temp);
  }, [budgetItemsList]);

  // PURCHASED ITEMS COST
  useEffect(() => {
    let temp = budgetItemsList
      .filter(item => item.completed)
      .reduce((acc, item) => acc + Number(item.cost), 0);
    setPurchasedItemsCost(temp);
  }, [budgetItemsList]);

  const editListItem = item => {
    setListItemToEdit(item);
  };

  // DELETE
  const deleteListItem = id => {
    api
      .deleteListItem(id)
      .then(_ => {
        let temp = budgetItemsList.filter(item => item.id !== id);
        setBudgetItemsList(temp);
      })
      .catch(err => console.log(err));
  };

  // PUT - EDIT
  const putListItem = () => {
    api
      .editListItem(listItemToEdit)
      .then(res => {
        console.log(res.data);
        console.log("budgetItemsList", budgetItemsList);
        let temp = budgetItemsList.map(item => {
          if (item.id === listItemToEdit.id) {
            return res.data;
          }
          return item;
        });
        setBudgetItemsList(temp);
        setListItemToEdit(initialListItem);
      })
      .catch(err => console.log(err.response));
  };

  // PUT - TOGGLE
  const toggleListItem = listItem => {
    api
      .editListItem({
        completed: !listItem.completed,
        id: listItem.id
      })
      .then(res => {
        let temp = budgetItemsList.map(item => {
          if (item.id === listItem.id) {
            return res.data;
          }
          return item;
        });
        setBudgetItemsList(temp);
      })
      .catch(err => console.log(err.response));
  };

  // POST
  const addListItem = (item, event_id) => {
    api
      .addListItem({ ...item, event_id })
      .then(res => {
        let temp = [...budgetItemsList, res.data];
        setBudgetItemsList(temp);
      })
      .catch(err => console.log(err.response));
  };

  if (!budgetItemsList) {
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
      <BudgetItemsForm
        addListItem={addListItem}
        initialListItem={initialListItem}
        eventId={eventId}
      />
      <div className="shopping-list-items-container">
        {budgetItemsList.map(listItem => (
          <BudgetItem
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

export default BudgetItems;
