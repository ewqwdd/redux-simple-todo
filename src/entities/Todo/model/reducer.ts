import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchStatus, Todo } from "./types";
import { fetchTodos } from "./fetchTodos";
import { RootState } from "../../../store/store";

export const todosAdapter = createEntityAdapter({
  selectId: (todo: Todo) => todo.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const PER_PAGE = 14;

const todoSlice = createSlice({
  initialState: todosAdapter.getInitialState<{ status: FetchStatus; page: number }>({
    status: "init",
    page: 1,
  }),
  name: "todo",
  reducers: {
    addTodo(state, action: PayloadAction<{ todo: Omit<Todo, "id"> }>) {
      const last = state.ids[state.ids.length - 1];
      todosAdapter.addOne(state, {
        ...action.payload.todo,
        id: last + 1,
      });
    },
    deleteTodo: todosAdapter.removeOne,
    updateTodo: todosAdapter.updateOne,
    setPage(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "success";
      todosAdapter.setMany(state, action.payload);
    });
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = "error";
      todosAdapter.removeAll(state);
    });
  },
});

export const todoSelectors = todosAdapter.getSelectors<RootState>((state) => state.todo);

export const todoActions = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
