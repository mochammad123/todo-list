import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProductApi from "../apis/useProductApi";
import useTransactionApi from "../apis/useTransactionApi";
import useTransactionDetailApi from "../apis/useTransactionDetailApi";

const TransactionDetail = () => {
  const { items, getItems, updateItem } = useProductApi();
  const { transactions } = useTransactionApi();
  const { addTransactionDetail } = useTransactionDetailApi();
  const [cartItems, setCartItems] = useState([]);
  const { invoiceNumber } = useParams();

  const handleAddToCart = (event) => {
    event.preventDefault();

    const selectedProduct = document.querySelector("#combo-box-demo").value;
    const selectedQuantity = document.querySelector("#outlined-basic").value;
    const quantity = parseInt(selectedQuantity);

    if (selectedProduct && selectedQuantity) {
      const transaction = transactions.data.find(
        (item) => item.invoice_number === invoiceNumber
      );
      const product = items.data.find((item) => item.title === selectedProduct);
      const cartItem = {
        transaction_id: transaction.id,
        id: product.id,
        product: product.title,
        quantity: quantity,
        total: product.price * quantity,
      };
      // cek apakah data sudah ada di dalam array
      const exitingIndex = cartItems.findIndex(
        (item) =>
          item.transaction_id === cartItem.transaction_id &&
          item.id === cartItem.id
      );

      if (exitingIndex === -1) {
        setCartItems((prevCartItem) => [...prevCartItem, cartItem]);
      } else {
        // Jika sudah adav update quantity dan total
        const updateCartItems = [...cartItems];
        updateCartItems[exitingIndex].quantity += quantity;
        updateCartItems[exitingIndex].total += cartItem.total;
        setCartItems(updateCartItems);
      }
    }
  };

  const total = cartItems.reduce((accumulator, item) => {
    return accumulator + item.total;
  }, 0);

  const removeFromCart = (index) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems];
      newCartItems.splice(index, 1);
      return newCartItems;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transaction = transactions.data.find(
      (item) => item.invoice_number === invoiceNumber
    );
    const transactionDetails = cartItems.map((item) => ({
      transaction_id: transaction.id,
      item_id: item.id,
      quantity: item.quantity,
    }));

    addTransactionDetail(transactionDetails);

    setCartItems([]);
  };

  // const handleUpdate = async (event) => {
  //   event.preventDefault();

  //   const transactionDetails = cartItems.map((item) => ({
  //     id: item.id,
  //     stock: item.quantity,
  //   }));

  //   try {
  //     await Promise.all(
  //       transactionDetails.map((detail) =>
  //         updateItem(detail.id, { stock: detail.stock })
  //       )
  //     );
  //     setCartItems([]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="min-w-full min-h-screen">
      <div className="container max-w-screen-lg mx-auto py-5 px-5">
        <div className="flex justify-center">
          <h2 className="font-bold text-3xl text-center mr-5">
            Transaction Detail
          </h2>
        </div>
        <form>
          <div className="flex flex-row gap-4 mt-10">
            <div className="basis-4/6">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={items.data}
                getOptionLabel={(option) => option.title || ""}
                renderInput={(params) => (
                  <TextField {...params} label="Product" />
                )}
              />
            </div>
            <div className="basis-1/6">
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                type="number"
              />
            </div>
            <div className="basis-1/6 m-auto">
              <button
                className="delay-200 bg-sky-500 h-14 rounded-full border-none text-white hover:bg-sky-600 w-full px-3 transition duration-150 ease-in-out transform active:scale-75 transition-transform"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </form>
        <div className="bg-sky-200 w-full mt-10 rounded h-96 overflow-auto">
          <div className="flex justify-center mt-10 mb-5">
            <h2 className="text-base font-bold text-xl">Transaction</h2>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => {
                        return (
                          <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.product}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.quantity}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.total}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <button
                                className="delay-200 bg-red-500 h-5 rounded-full border-none text-white hover:bg-red-600 px-3 transition duration-150 ease-in-out transform active:scale-75 transition-transform"
                                onClick={() => removeFromCart(index)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-gray-100 border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Total
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    className="delay-200 bg-sky-500 h-10 rounded-full border-none text-white hover:bg-sky-600 px-3 transition duration-150 ease-in-out transform active:scale-75 transition-transform"
                    onClick={handleSubmit}
                  >
                    <Link to={"/"}>Add Transaction Detail</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
