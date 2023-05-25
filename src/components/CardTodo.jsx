import React, { useEffect } from "react";
import Swal from "sweetalert2";
import useProductApi from "../apis/useProductApi";

const CardTodo = ({ setItem }) => {
  const { items, isLoading, error, getItems, deleteItem } = useProductApi();

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      {!items || items == 0 ? (
        <div className="flex justify-center mt-10">
          <p className="text-white">Data not found</p>
        </div>
      ) : items && items.data && items.data.length === 0 ? (
        <div className="flex justify-center mt-10">
          <p className="text-white">Data not found</p>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-3 gap-6">
            <table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              {items.data.map((item, index) => {
                const { id, title, price, stock } = item;
                return (
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{title}</td>
                      <td>{price}</td>
                      <td>{stock}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTodo;