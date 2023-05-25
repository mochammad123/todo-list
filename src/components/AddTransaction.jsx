import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTransactionApi from "../apis/useTransactionApi";

const AddTransaction = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const { transactions, isLoading, error, getTransactions, addTransaction } =
    useTransactionApi();
  const history = useNavigate();

  useEffect(() => {
    getTransactions();
  }, [invoiceNumber]);

  const addSubmit = async (e) => {
    e.preventDefault();

    await addTransaction();
    getTransactions();
  };

  return (
    <div className="flex justify-end px-4">
      <div>
        <form onSubmit={addSubmit}>
          {isLoading ? (
            <button className="delay-200 bg-orange-500 mt-5 h-10 rounded-full border-none text-white hover:bg-orange-600 w-full px-3 disabled">
              Loading...
            </button>
          ) : (
            <button className="delay-200 bg-orange-500 mt-5 h-10 rounded-full border-none text-white hover:bg-orange-600 w-full px-3 transition duration-150 ease-in-out transform active:scale-75 transition-transform">
              Add Transaction
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
