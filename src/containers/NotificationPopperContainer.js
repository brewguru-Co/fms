import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../redux/modules/notifications";
import NotificationPopper from "../components/NotificationPopper";

function NotificationPopperContainer() {
  const { loading, error, notifications: data } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return <>{data && <NotificationPopper records={data} />}</>;
}

export default NotificationPopperContainer;
