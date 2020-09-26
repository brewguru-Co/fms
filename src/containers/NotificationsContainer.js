import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../components/Notifications";
import { getNotifications } from "../redux/modules/notifications";

function NotificationsContainer() {
  const { loading, error, notifications: data } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return <>{data && <Notifications records={data} />}</>;
}

export default NotificationsContainer;
