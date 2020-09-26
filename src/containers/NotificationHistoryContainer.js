import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SortTable from "../components/SortTable";
import { getTimeString } from "../lib/time";
import { getNotificationRecords } from "../redux/modules/notificationRecords";

const formatTime = (rows) =>
  rows.map((row) => ({
    ...row,
    createdAt: getTimeString(row.createdAt, "YYYY-MM-DD"),
  }));

const columns = [
  { id: "createdAt", numeric: true, label: "제조일 (년월일)" },
  { id: "series", numeric: false, label: "품목명" },
  { id: "code", numeric: true, label: "오류 내용" },
];

function NotificationHistoryContainer() {
  const { loading, error, notificationRecords: data } = useSelector(
    (state) => state.notificationRecords
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationRecords());
  }, [dispatch]);

  return (
    <>
      {data && (
        <SortTable
          rows={formatTime(data)}
          columns={columns}
          title="오류 알림 히스토리"
          color="red"
        />
      )}
    </>
  );
}

export default NotificationHistoryContainer;
