import React, { useEffect } from "react";
import Swal from "sweetalert2";
import useTodoApi from "../apis/useTodoApi";

const CardTodo = ({ setItem }) => {
  const { todos, isLoading, error, getTodos, deleteTodo } = useTodoApi();

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodoHandler = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await deleteTodo(id).then((response) => {
      getTodos();
    });
  };

  return (
    <div>
      {!todos || todos == 0 ? (
        <div className="flex justify-center mt-10">
          <p>Data not found</p>
        </div>
      ) : todos && todos.data && todos.data.length === 0 ? (
        <div className="flex justify-center mt-10">
          <p>Data not found</p>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-3 gap-6">
            {todos.data.map((item, index) => {
              const { id, title, body } = item;
              return (
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col bg-white w-80 h-80"
                  key={index}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base overflow-auto">
                      {body}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2 mt-auto mb-2">
                    <div className="flex justify-center gap-4">
                      <button className="transition delay-200 bg-orange-500 h-10 w-10 rounded border-none text-white hover:bg-orange-600 w-full">
                        <div
                          className="flex justify-center"
                          onClick={() => setItem(item)}
                        >
                          Update
                        </div>
                      </button>
                      <button className="transition delay-200 bg-red-500 h-10 w-10 rounded border-none text-white hover:bg-red-600 w-full">
                        <div
                          className="flex justify-center"
                          onClick={() => deleteTodoHandler(item.id)}
                        >
                          Delete
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTodo;
