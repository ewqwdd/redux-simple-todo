import { useAppDispatch, useAppSelector } from "../../../store/store";
import Todo from "./Todo";
import { List, Spin } from "antd";
import TodoError from "./TodoError";
import { memo, useEffect } from "react";
import { fetchTodos } from "../model/fetchTodos";
import { getPage } from "../model/selectors";
import TodoPagination from "./TodoPagination";
import TodoModal from "./TodoModal";

export default memo(function TodoList() {
  const todos = useAppSelector(getPage);
  const status = useAppSelector((state) => state.todo.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Spin spinning={status === "loading"}>
      <TodoError status={status} />
      <TodoModal />
      <List
        style={{
          textAlign: 'center',
          margin: '1rem 0',
        }}
        size="default"
        dataSource={todos}
        bordered
        renderItem={(elem) => (
          <List.Item>
            <Todo key={elem.id} todo={elem} />
          </List.Item>
        )}
        header={<h1>Todos:</h1>}
      />
      <TodoPagination />
    </Spin>
  );
});
