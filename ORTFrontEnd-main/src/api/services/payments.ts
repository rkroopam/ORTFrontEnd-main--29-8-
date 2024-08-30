import { apiEndPoint } from "../handlers";
import api from "../handlers/api";

const getPaymentModels = async (token: any) => {
  const headers = { "x-access-token": token };
  const { data } = await api.get(apiEndPoint.getPaymentModels, { headers });
  return data;
};

const createPaymentModel = async (payload: any, token: string) => {
  const headers = { "x-access-token": token };
  const { data } = await api.post(apiEndPoint.createPaymentModel, payload, {
    headers,
  });
  return data;
};

const updatePaymentModel = async (id: any, token: string) => {
  const headers = { "x-access-token": token };
  const payload = {
    status: "inactive",
  };
  const { data } = await api.put(apiEndPoint.updatePaymentModel(id), payload, {
    headers,
  });
  return data;
};

const getPayments = async (token: string) => {
  const headers = { "x-access-token": token };
  try {
    const { data } = await api.get(apiEndPoint.payment, { headers });
    return data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

const createPayments = async (token: any, payload: any) => {
  const headers = { "x-access-token": token};
  console.log("inside api=========================",payload);
  try {
    const { data } = await api.post(apiEndPoint.payment, payload, { headers });
    return data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

export {
  getPaymentModels,
  createPaymentModel,
  updatePaymentModel,
  getPayments,
  createPayments,
};
