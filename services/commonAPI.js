import axios from "axios";

const commonAPI = async (
    httpRequest,
    url,
    reqBody,
    reqHeader = {},
    axiosConfig = {}
) => {

    const token = localStorage.getItem("token");

    const headers = {
        ...reqHeader,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const requestConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers,
        ...axiosConfig
    };

    return await axios(requestConfig);
};

export default commonAPI;