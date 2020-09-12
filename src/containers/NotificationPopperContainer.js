import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationRecords } from "../redux/modules/notificationRecords";
import NotificationPopper from "../components/NotificationPopper";

function NotificationPopperContainer() {
  const { loading, error, notificationRecords: data } = useSelector(
    (state) => state.notificationRecords
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationRecords());
  }, [dispatch]);

  return <>{data && <NotificationPopper records={data} />}</>;
}

export default NotificationPopperContainer;
