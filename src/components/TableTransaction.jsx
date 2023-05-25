import {
  Autocomplete,
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useTransactionApi from "../apis/useTransactionApi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useProductApi from "../apis/useProductApi";
import { Link } from "react-router-dom";
import useTransactionDetailApi from "../apis/useTransactionDetailApi";

const TableTransaction = () => {
  const { transactions, getTransactions, deleteTransaction } =
    useTransactionApi();
  const { items, getItems } = useProductApi();
  const { transactionDetails, getTransactionDetails } =
    useTransactionDetailApi();
  const [openRows, setOpenRows] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  let totalPrices = 0;

  const handleRowClick = (id) => {
    if (openRows.includes(id)) {
      setOpenRows(openRows.filter((rowId) => rowId !== id));
    } else {
      setOpenRows([...openRows, id]);
    }
  };

  useEffect(() => {
    getTransactions();
    getTransactionDetails();
    getItems();
  }, []);

  const deleteHandler = async (id) => {
    await deleteTransaction(id).then((response) => {
      getTransactions();
    });
  };

  return (
    <div>
      {!transactions || transactions == 0 ? (
        <div className="flex justify-center mt-10">
          <p className="text-white">Data not found</p>
        </div>
      ) : transactions &&
        transactions.data &&
        transactions.data.length === 0 ? (
        <div className="flex justify-center mt-10">
          <p className="text-white">Data not found</p>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          {/* Table */}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    #
                  </TableCell>
                  <TableCell sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    Number Invoice
                  </TableCell>
                  <TableCell sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {!transactions || transactions.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{ paddingTop: 1, paddingBottom: 1 }}
                      align="center"
                      colSpan={9}
                    >
                      Data Not Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {transactions.data?.map((item, index) => {
                    const { id, invoice_number } = item;

                    // Filter data detail transaksi berdasarkan id transaksi
                    const filteredDetails =
                      !transactionDetails || transactionDetails.length == 0
                        ? []
                        : transactionDetails?.data.filter(
                            (transactionDetail) =>
                              transactionDetail.transaction_id === id
                          );

                    const getProductById = (productId) => {
                      return !items || items.length == 0
                        ? []
                        : items.data.find(
                            (product) => product.id === productId
                          );
                    };

                    return (
                      <>
                        <TableRow
                          key={id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": { background: "#EEEEEE" },
                          }}
                        >
                          <TableCell>
                            {openRows.includes(id) ? (
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleRowClick(id)}
                              >
                                <KeyboardArrowUpIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleRowClick(id)}
                              >
                                <KeyboardArrowDownIcon />
                              </IconButton>
                            )}
                          </TableCell>
                          <TableCell
                            sx={{ paddingTop: 1, paddingBottom: 1 }}
                            align="left"
                          >
                            {index + 1}
                          </TableCell>

                          <TableCell
                            sx={{ paddingTop: 1, paddingBottom: 1 }}
                            align="left"
                          >
                            {invoice_number}
                          </TableCell>
                          <TableCell
                            sx={{ paddingTop: 1, paddingBottom: 1 }}
                            align="left"
                          >
                            <div className="flex justify-center gap-2">
                              <button
                                className="text-xs delay-200 bg-sky-500 h-7 rounded-full border-none text-white hover:bg-sky-600 w-full px-3 transition duration-150 ease-in-out transform active:scale-75 transition-transform"
                                type="button"
                              >
                                <Link to={`transaction/${invoice_number}`}>
                                  Add Product
                                </Link>
                              </button>
                              <button
                                className="text-xs delay-200 bg-red-500 h-7 rounded-full border-none text-white hover:bg-red-600 w-full px-3 transition duration-150 ease-in-out transform active:scale-75 transition-transform"
                                type="button"
                                onClick={() => deleteHandler(id)}
                              >
                                Delete
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-slate-50">
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={6}
                          >
                            <Collapse
                              in={openRows.includes(id)}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 1 }}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                >
                                  Detail
                                </Typography>

                                <Table size="small" aria-label="purchases">
                                  <TableBody>
                                    <TableRow>
                                      <TableCell sx={{ fontWeight: 600 }}>
                                        Product
                                      </TableCell>
                                      <TableCell sx={{ fontWeight: 600 }}>
                                        Quantity
                                      </TableCell>
                                      <TableCell sx={{ fontWeight: 600 }}>
                                        Price
                                      </TableCell>
                                    </TableRow>
                                    {filteredDetails.map((detail) => {
                                      const product = getProductById(
                                        detail.item_id
                                      );
                                      totalPrices += product
                                        ? product.price * detail.quantity
                                        : 0;
                                      return (
                                        <TableRow key={detail.id}>
                                          <TableCell>
                                            {product
                                              ? product.title
                                              : "Unknown Product"}
                                          </TableCell>
                                          <TableCell>
                                            {detail.quantity}
                                          </TableCell>
                                          <TableCell>
                                            {product
                                              ? product.price * detail.quantity
                                              : "Unknown Product"}
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                    <TableRow>
                                      <TableCell>Total</TableCell>
                                      <TableCell></TableCell>
                                      <TableCell>{totalPrices}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {showModalUpdate ? (
            <>
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  onClick={() => setShowModalUpdate(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                  <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 sm:flex">
                      <div className="mt-2 text-center sm:text-left w-full">
                        <h4 className="text-lg font-medium text-gray-800 mb-5">
                          Add Product
                        </h4>
                        <hr className="mb-8" />
                        <form>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={items.data}
                            sx={{ width: "100%", mt: 3, mb: 5 }}
                            getOptionLabel={(option) => option.title || ""}
                            renderInput={(params) => (
                              <TextField {...params} label="Category" />
                            )}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TableTransaction;
