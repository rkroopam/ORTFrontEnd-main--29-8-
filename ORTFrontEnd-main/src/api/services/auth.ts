import { apiEndPoint } from "../handlers";
import api from "../handlers/api";
const login_user = async (payload: any) => {
  const { data } = await api.post(apiEndPoint.login, payload);
  return data;
};
const parent_signup = async (payload: any) => {
  const { data } = await api.post(apiEndPoint.parentSignUp, payload);
  return data;
};

const learner_signup = async (payload: any, token: any) => {
  const headers = { "x-access-token": `${token}` };
  const { data } = await api.post(apiEndPoint.learnerSignUp, payload, {
    headers,
  });
  return data;
};
const sendMailforResetPassword = async (value: any) => {
  const { data } = await api.post(apiEndPoint.sendMailforResetPassword, value);
  return data;
};
const forgetPassword = async (value: any) => {
  const { data } = await api.post(apiEndPoint.forgetpassword, value);
  return data;
};
const reset_password = async (token: string, password: any) => {
  const { data } = await api.post(
    apiEndPoint.resetPassword,
    { password: password },
    {
      headers: { "x-access-token": token },
    }
  );
  return data;
};

const verifyEmail = async (token: any) => {
  const headers = {
    "x-access-token": token,
  };
  const { data } = await api.get(apiEndPoint.verifyEmail, {
    headers,
  });
  return data;
};
export {
  login_user,
  sendMailforResetPassword,
  forgetPassword,
  verifyEmail,
  reset_password,
  parent_signup,
  learner_signup,
};
