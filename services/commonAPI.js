import axios from "axios";

const commonAPI = async (httpRequest, url, reqBody, reqHeader = {}, axiosConfig = {}) => {
    // console.log(">>> API CALLED:", url); // DEBUG

    const requestConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers: reqHeader,
        ...axiosConfig
    };

    return await axios(requestConfig);
};

export default commonAPI;
