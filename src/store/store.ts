import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { todoReducer } from "../entities/Todo/model/reducer";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>()