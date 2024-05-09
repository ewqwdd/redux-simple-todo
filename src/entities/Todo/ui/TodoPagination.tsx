import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getTotal } from "../model/selectors";
import { memo, useCallback } from "react";
import { PER_PAGE, todoActions } from "../model/reducer";

export default memo(function TodoPagination() {
  const page = useAppSelector((state) => state.todo.page);
  const total = useAppSelector(getTotal);
  const dispatch = useAppDispatch();

  const setPage = useCallback(
    (page: number) => {
      dispatch(todoActions.setPage({ page }));
    },
    [dispatch]
  );

  const pageChange = useCallback((page: number) => setPage(page), [setPage]);
  return (
    <Pagination
      current={page}
      onChange={pageChange}
      total={total}
      pageSize={PER_PAGE}
    />
  );
}
)