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
  doLowOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_DO)
    .required(FORM.REQUIRED),
  doHighOp: Yup.number()
    .typeError(FORM.REQUIRED)
    .min(0, FORM.WRONG_DO)
    .moreThan(Yup.ref("doLowOp"), FORM.MORE_THAN_LOW_DO)
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

export const NotificationSchema = Yup.object().shape({
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
