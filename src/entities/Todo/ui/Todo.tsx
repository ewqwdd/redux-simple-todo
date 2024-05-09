import { Button, Checkbox, Flex } from "antd";
import { type Todo } from "../model/types";
import styles from "./Todo.module.css";
import { memo, useCallback } from "react";
import { useAppDispatch } from "../../../store/store";
import { todoActions } from "../model/reducer";
import { bindActionCreators } from "redux";

interface TodoProps {
  todo: Todo;
}

export default memo(
  function Todo({ todo: { completed, id, title } }: TodoProps) {
    const dispatch = useAppDispatch();
    const actions = bindActionCreators(todoActions, dispatch);

    const check = useCallback(() => {
      actions.updateTodo({
        id,
        changes: {
          completed: !completed,
        },
      });
    }, [completed, id, actions]);

    const remove = useCallback(() => {
      actions.deleteTodo(id);
    }, [id, actions]);

    return (
      <Flex align="center" className={styles.todo}>
        <Flex onClick={check} style={{
            overflow: 'clip',
            textOverflow: 'ellipsis',
            flexShrink: '1',
            gap: '0.5rem'
        }}>
          <Checkbox checked={completed} onChange={check} />
          <p className={styles.clickable} style={{
            textOverflow: 'ellipsis',
            textWrap: 'nowrap',
            overflow: 'hidden'
          }}>
            <b>{id}. </b>
            {title}
          </p>
        </Flex>
        <Button onClick={remove} style={{
            marginLeft: 'auto'
        }}>x</Button>
      </Flex>
    );
  },
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
