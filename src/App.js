import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTodo from "./components/MainTodo";
import TransactionDetail from "./components/TransactionDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainTodo />} />
        <Route
          path="/transaction/:invoiceNumber"
          element={<TransactionDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
