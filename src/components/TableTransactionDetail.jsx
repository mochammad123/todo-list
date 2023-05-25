import React, { useEffect } from "react";
import useTransactionDetailApi from "../apis/useTransactionDetailApi";

const TableTransactionDetail = ({ setItem }) => {
  const { transactionDetails, isLoading, error, getTransactionDetails } =
    useTransactionDetailApi();

  useEffect(() => {
    getTransactionDetails();
  }, []);

  return (
    <div>
      {!transactionDetails || transactionDetails == 0 ? (
        <div className="flex justify-center mt-10">
          <p className="text-white">Data not found</p>
        </div>
      ) : transactionDetails &&
        transactionDetails.data &&
        transactionDetails.data.length === 0 ? (
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
                  <th>Transaction</th>
                  <th>Product</th>
                  <th>Quality</th>
                </tr>
              </thead>
              {transactionDetails.data.map((item, index) => {
                const { id, transaction_id, item_id, quality } = item;
                return (
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{transaction_id}</td>
                      <td>{item_id}</td>
                      <td>{quality}</td>
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

export default TableTransactionDetail;
