import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CIndicator from "../components/CIndicator";
import EditableTable from "../components/EditableTable";
import {
  getNotifications,
  createNotification,
  removeNotification,
  updateNotification,
} from "../redux/modules/notifications";
import locale from "../locale/ko_KR.json";

const NOTIFICATION = locale.NOTIFICATION;
const columns = [
  { id: "name", type: "text", disablePadding: false, label: NOTIFICATION.NAME },
  {
    id: "email",
    type: "email",
    disablePadding: false,
    label: NOTIFICATION.EMAIL,
  },
  {
    id: "phone",
    type: "tel",
    disablePadding: false,
    label: NOTIFICATION.PHONE,
  },
  {
    id: "on",
    type: "checkbox",
    disablePadding: false,
    label: NOTIFICATION.ON_OFF,
  },
];

function NotificationContainer() {
  const { loading, error, notifications: data } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const onRemove = (id) => dispatch(removeNotification(id));
  const onUpdate = (notification) => dispatch(updateNotification(notification));
  const onCreate = (notification) => dispatch(createNotification(notification));

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "40%" }}>
        {loading && <CIndicator />}
        {data && (
          <>
            <EditableTable
              columns={columns}
              rows={data}
              rowsPerPage={10}
              title="알림 세팅"
              onRemove={onRemove}
              onUpdate={onUpdate}
              onCreate={onCreate}
              dialog="notification"
            />
          </>
        )}
      </div>
      <div style={{ width: "60%" }}></div>
    </div>
  );
}

export default NotificationContainer;
