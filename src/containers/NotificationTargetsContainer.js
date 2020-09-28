import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CIndicator from "../components/CIndicator";
import EditableTable from "../components/EditableTable";
import {
  getNotificationTargets,
  createNotificationTarget,
  removeNotificationTarget,
  updateNotificationTarget,
} from "../redux/modules/notificationTargets";
import { notificationTargetValidator } from "../lib/formSchema";
import locale from "../locale/ko_KR.json";

const NOTIFICATION = locale.NOTIFICATION;
const columns = [
  {
    id: "name",
    type: "text",
    disablePadding: true,
    label: NOTIFICATION.NAME,
  },
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

function NotificationTargetContainer() {
  const { loading, error, notificationTargets: data } = useSelector(
    (state) => state.notificationTargets
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationTargets());
  }, [dispatch]);

  const onRemove = (id) => dispatch(removeNotificationTarget(id));
  const onUpdate = (notificationTarget) =>
    dispatch(updateNotificationTarget(notificationTarget));
  const onCreate = (notificationTarget) =>
    dispatch(createNotificationTarget(notificationTarget));

  return (
    <>
      {loading && <CIndicator />}
      {data && (
        <>
          <EditableTable
            columns={columns}
            rows={data}
            rowsPerPage={5}
            title="알림 세팅"
            subTitle="측정값이 적정 범위를 벗어날 시 알릴 대상 설정"
            onRemove={onRemove}
            onUpdate={onUpdate}
            onCreate={onCreate}
            dialog="notificationTarget"
            validator={notificationTargetValidator}
            color="yellow"
          />
        </>
      )}
    </>
  );
}

export default NotificationTargetContainer;
