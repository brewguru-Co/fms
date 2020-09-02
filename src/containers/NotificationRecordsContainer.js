import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationRecords from "../components/NotificationRecords";
import { getNotificationRecords } from "../redux/modules/notificationRecords";

function NotificationRecordsContainer() {
  const { loading, error, notificationRecords: data } = useSelector(
    (state) => state.notificationRecords
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationRecords());
  }, [dispatch]);

  return <>{data && <NotificationRecords records={data} />}</>;
}

export default NotificationRecordsContainer;
