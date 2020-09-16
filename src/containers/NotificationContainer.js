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
import { notificationValidator } from "../lib/formSchema";
import locale from "../locale/ko_KR.json";

const NOTIFICATION = locale.NOTIFICATION;
const columns = [
  { id: "name", type: "text", disablePadding: true, label: NOTIFICATION.NAME },
  {
    id: "email",
    type: "email",
    disablePadding: true,
    label: NOTIFICATION.EMAIL,
  },
  {
    id: "phone",
    type: "tel",
    disablePadding: true,
    label: NOTIFICATION.PHONE,
  },
  {
    id: "on",
    type: "checkbox",
    disablePadding: true,
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
    <>
      {loading && <CIndicator />}
      {data && (
        <>
          <EditableTable
            columns={columns}
            rows={data}
            rowsPerPage={10}
            title="알림 세팅"
            subTitle="측정값이 적정 범위를 벗어날 시 알릴 대상 설정"
            onRemove={onRemove}
            onUpdate={onUpdate}
            onCreate={onCreate}
            dialog="notification"
            validator={notificationValidator}
            color="indigo"
          />
        </>
      )}
    </>
  );
}

export default NotificationContainer;
