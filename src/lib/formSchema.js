import * as Yup from "yup";
import locale from "../locale/ko_KR.json";

const FORM = locale.FORM;

export const TeaSchema = Yup.object().shape({
  name: Yup.string().min(1).required(FORM.REQUIRED),
  phLowOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_PH)
    .max(14, FORM.WRONG_PH)
    .required(FORM.REQUIRED),
  phHighOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_PH)
    .max(14, FORM.WRONG_PH)
    .moreThan(Yup.ref("phLowOp"), FORM.MORE_THAN_LOW_PH)
    .required(FORM.REQUIRED),
  tempLowOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_TEMP)
    .max(100, FORM.WRONG_TEMP)
    .required(FORM.REQUIRED),
  tempHighOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_TEMP)
    .max(100, FORM.WRONG_TEMP)
    .moreThan(Yup.ref("tempLowOp"), FORM.MORE_THAN_LOW_TEMP)
    .required(FORM.REQUIRED),
  doxLowOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_DO)
    .required(FORM.REQUIRED),
  doxHighOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_DO)
    .moreThan(Yup.ref("doxLowOp"), FORM.MORE_THAN_LOW_DO)
    .required(FORM.REQUIRED),
  brixLowOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_BRIX)
    .max(100, FORM.WRONG_BRIX)
    .required(FORM.REQUIRED),
  brixHighOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_BRIX)
    .max(100, FORM.WRONG_BRIX)
    .moreThan(Yup.ref("brixLowOp"), FORM.MORE_THAN_LOW_BRIX)
    .required(FORM.REQUIRED),
});

export const TankSchema = Yup.object().shape({
  name: Yup.string().min(1).required(FORM.REQUIRED),
  teaName: Yup.string().required(FORM.REQUIRED),
  phLow: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_PH)
    .max(14, FORM.WRONG_PH)
    .required(FORM.REQUIRED),
  phHigh: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_PH)
    .max(14, FORM.WRONG_PH)
    .moreThan(Yup.ref("phLow"), FORM.MORE_THAN_LOW_PH)
    .required(FORM.REQUIRED),
  tempLow: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_TEMP)
    .max(100, FORM.WRONG_TEMP)
    .required(FORM.REQUIRED),
  tempHigh: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_TEM)
    .max(100, FORM.WRONG_TEMP)
    .moreThan(Yup.ref("tempLow"), FORM.MORE_THAN_LOW_TEMP)
    .required(FORM.REQUIRED),
  doxLow: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_DO)
    .required(FORM.REQUIRED),
  doxHigh: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_DO)
    .moreThan(Yup.ref("doxLow"), FORM.MORE_THAN_LOW_DO)
    .required(FORM.REQUIRED),
  brixLow: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_BRIX)
    .max(100, FORM.WRONG_BRIX)
    .required(FORM.REQUIRED),
  brixHigh: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_BRIX)
    .max(100, FORM.WRONG_BRIX)
    .moreThan(Yup.ref("brixLow"), FORM.MORE_THAN_LOW_BRIX)
    .required(FORM.REQUIRED),
});

export const NotificationTargetSchema = Yup.object().shape({
  name: Yup.string().min(1).required(FORM.REQUIRED),
  email: Yup.string().email(FORM.WRONG_EMAIL),
  phone: Yup.string()
    .min(8, FORM.WRONG_PHONE)
    .max(11, FORM.WRONG_PHONE)
    .when("email", {
      is: (email) => !email || email.length === 0,
      then: Yup.string().required(FORM.NEED_PHONE_OR_EMAIL),
    }),
});

export const TeaOffsetSchema = Yup.object().shape({
  teaName: Yup.string().required(FORM.REQUIRED),
  ph: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_PH)
    .max(14, FORM.WRONG_PH)
    .required(FORM.REQUIRED),
  temp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_TEMP)
    .max(100, FORM.WRONG_TEMP)
    .required(FORM.REQUIRED),
  dox: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_DO)
    .required(FORM.REQUIRED),
  brix: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_BRIX)
    .max(100, FORM.WRONG_BRIX)
    .required(FORM.REQUIRED),
});

function validator(schema, target) {
  try {
    schema.validateSync(target, { abortEarly: false });
    return null;
  } catch (err) {
    const { inner } = err;
    return inner.reduce(
      (obj, error) => ({
        ...obj,
        [error.path]: error.message,
      }),
      {}
    );
  }
}

export const notificationTargetValidator = (notificationTarget) => {
  return validator(NotificationTargetSchema, notificationTarget);
};

export const teaValidator = (tea) => {
  return validator(TeaSchema, tea);
};

export const tankValidator = (tank) => {
  return validator(TankSchema, tank);
};

export const teaOffsetValidator = (teaOffset) => {
  return validator(TeaOffsetSchema, teaOffset);
};
