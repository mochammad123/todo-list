import React, { useState } from "react";
import AddTodo from "./AddTodo";
import CardTodo from "./CardTodo";

const MainTodo = () => {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [item, setItem] = useState(null);

  return (
    <div className="bg-gray-900 min-w-full min-h-screen">
      <div className="container max-w-screen-lg mx-auto bg-gray-900 py-5 px-5">
        <div className="flex justify-center">
          <h2 className="text-white font-bold text-3xl text-center mr-5">
            Todo List
          </h2>
          {showBtn ? (
            <button
              className="transition delay-200 bg-orange-500 w-10 rounded border-none text-white hover:bg-orange-600"
              onClick={() => {
                setShowAddTodo(false);
                setShowBtn(false);
              }}
            >
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </button>
          ) : (
            <button
              className="transition delay-200 bg-sky-500 w-10 rounded border-none text-white hover:bg-sky-600"
              onClick={() => {
                setShowAddTodo(true);
                setShowBtn(true);
              }}
            >
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </button>
          )}
        </div>
        {showAddTodo ? <AddTodo data={item} setData={setItem} /> : ""}
        <CardTodo setItem={setItem} />
      </div>
    </div>
  );
};

export default MainTodo;
