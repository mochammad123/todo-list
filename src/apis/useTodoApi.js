import { create } from "zustand";
import todoApi from "./todoApi";

const useTodoApi = create((set) => ({
  todos: [],
  isLoading: false,
  error: null,

  getTodos: async () => {
    set({ isLoading: true });
    try {
      const response = await todoApi.get("todos");
      set({ todos: response.data, isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  addTodo: async (todoData) => {
    set({ isLoading: true });
    try {
      const response = await todoApi.post("todo", todoData);
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  updateTodo: async (todoId, todoData) => {
    set({ isLoading: true });
    try {
      const response = await todoApi.post(`todo/${todoId}`, todoData);
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  deleteTodo: async (todoId) => {
    set({ isLoading: true });
    try {
      const response = await todoApi.delete(`todo/${todoId}`);
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
}));

export default useTodoApi;
