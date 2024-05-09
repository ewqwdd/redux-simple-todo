import { Button, Flex, Input, Modal } from "antd";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { todoActions } from "../model/reducer";

export default memo(function TodoModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const close = useCallback(() => {
    setIsOpen(false);
    setValue("");
  }, []);

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const submit = useCallback(() => {
    if (value.length > 0) {
      dispatch(
        todoActions.addTodo({
          todo: {
            completed: false,
            title: value,
            userId: 0,
          },
        })
      );
      close();
    }
  }, [dispatch, close, value]);

  return (
    <Flex>
      <Button type="primary" style={{
        marginLeft: 'auto'
      }} onClick={open}>+ Add</Button>
      <Modal centered title="Add Todo" open={isOpen} onCancel={close} onOk={submit}>
        <Input value={value} onChange={onChange} size="large" placeholder="Your todo title"/>
      </Modal>
    </Flex>
  );
});
