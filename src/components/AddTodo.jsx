import React, { useEffect, useState } from "react";
import useTodoApi from "../apis/useTodoApi";

const AddTodo = ({ data, setData }) => {
  const { isLoading, error, getTodos, addTodo, updateTodo } = useTodoApi();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBody(data.body);
    }
  }, [data]);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (data) {
      await updateTodo(data.id, { title, body }).then(() => {
        setTitle("");
        setBody("");
        getTodos();
        setData(null);
      });
    } else {
      await addTodo({ title, body }).then(() => {
        setTitle("");
        setBody("");
        getTodos();
      });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex justify-center">
      <form onSubmit={handleCreate}>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Title"
            className="border-double rounded-full w-72 h-10 px-5 mt-5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="text area"
            placeholder="Body"
            id=""
            cols="20"
            rows="10"
            className="border-double rounded w-72 h-32 px-5 py-2 mt-5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          {data ? (
            <div className="flex justify-center gap-2">
              <button className="delay-200 bg-orange-500 mt-5 h-10 rounded-full border-none text-white hover:bg-orange-600 w-full">
                Update
              </button>
              <button
                className="delay-200 bg-red-500 mt-5 h-10 rounded-full border-none text-white hover:bg-red-600 w-full"
                onClick={() => {
                  setData(null);
                  setTitle("");
                  setBody("");
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="delay-200 bg-orange-500 mt-5 h-10 rounded-full border-none text-white hover:bg-orange-600 ">
              Add Todo
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
