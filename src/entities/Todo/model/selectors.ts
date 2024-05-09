import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { PER_PAGE, todoSelectors } from "./reducer";

export const getPage = createDraftSafeSelector(
  (state: RootState) => todoSelectors.selectAll(state),
  (state: RootState) => state.todo.page,
  (todos, page) => todos.slice((page - 1) * PER_PAGE, page * PER_PAGE)
);

export const getTotal = createDraftSafeSelector(
  (state: RootState) => state.todo.ids,
  (ids) => ids.length
);
