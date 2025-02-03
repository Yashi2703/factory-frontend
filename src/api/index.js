import axios from "axios";
const requestTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const apiEndpoint = "http://localhost:8016";
const generateConfigData = (cancelToken = null, token = null) => {
  let header = {
    "Content-Type": "application/json",
  };
  const clsData = localStorage?.getItem("token");

  const bearerToken = token ? token : clsData;

  if (bearerToken) {
    header.Authorization = `Token ${bearerToken}`;
  }

  let configData = { headers: header };
  if (cancelToken && Object.keys(cancelToken).length) {
    configData.cancelToken = cancelToken;
  }
  return configData;
};

export const apiPostMethod = (
  url,
  data,
  cancelToken = null,
  ct = null,
  token = ""
) => {
  return new Promise((resolve, reject) => {
    const configData = generateConfigData(cancelToken, token);
    axios
      .post(`${apiEndpoint}${url}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
export const apiGetMethod = (url, cancelToken = null, token = null) => {
  return new Promise((resolve, reject) => {
    const configData = generateConfigData(cancelToken, token);
    axios
      .get(`${apiEndpoint}${url}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response ? err.response.data : err.message);
      });
  });
};

export const apiDeleteMethod = (url) => {
  console.log("API Call URL:", url); // Debugging log
  // return axios.delete(`${apiEndpoint}${url}`).then((res) => res.data);
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiEndpoint}${url}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
export const apiPutMethod = (
  url,
  data,
  cancelToken = null,
  ct = null,
  token = ""
) => {
  return new Promise((resolve, reject) => {
    // const configData = generateConfigData(cancelToken, token);
    axios
      .put(`${apiEndpoint}${url}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
