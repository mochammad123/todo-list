import React, { useState } from "react";
import AddTransaction from "./AddTransaction";
import CardTodo from "./CardTodo";
import TableTransaction from "./TableTransaction";
import TableTransactionDetail from "./TableTransactionDetail";

const MainTodo = () => {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [item, setItem] = useState(null);

  return (
    <div className="min-w-full min-h-screen bg-sky-100">
      <div className="container max-w-screen-lg mx-auto py-5 px-5">
        <div className="flex justify-center">
          <h2 className="font-bold text-3xl text-center mr-5">Transaction</h2>
        </div>
        <AddTransaction />
        <TableTransaction />
      </div>
    </div>
  );
};

export default MainTodo;
