import axios from "axios";

const axiosDefaultConfig = {
  baseUrl: !!process.env.REACT_API
    ? process.env.REACT_API
    : "http://localhost:5000/api/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  responseType: "json",
};

const httpRequest = (options) => {
  const { data, url, method } = options;
  const axiosOption = axiosDefaultConfig;
  return axios({
    method,
    url,
    data,
    ...axiosOption,
  });
};

export default httpRequest;
