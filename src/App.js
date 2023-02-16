import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTodo from "./components/MainTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
