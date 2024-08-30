import { apiEndPoint } from "../handlers";
import api from "../handlers/api";
const getTestList= async (token: string,datatype:any) => {
  const headers = { "x-access-token": token };
  const { data } = await api.get(`${apiEndPoint?.getTestList}=${datatype}`, { headers});
  return data;
};
const getTestDetails= async (token: string,testId:any) => {
  const headers = { "x-access-token": token };
  const { data } = await api.get(`${apiEndPoint?.getTestDetails}/${testId}`, { headers});
  return data;
};

export{getTestList,getTestDetails}