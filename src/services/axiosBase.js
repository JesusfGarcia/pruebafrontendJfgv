import axios from "axios";

const axiosBase = ({ method, endpoint }) => {
  return axios({
    baseURL: "https://atlantia-dev-test.herokuapp.com/api",
    method,
    url: endpoint,
  });
};

export default axiosBase;
