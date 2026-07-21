import commonAPI from "./commonAPI"
import serverURL from "./serverURL"


// ------------------------------------
// ------------- Users -------------
// ------------------------------------
export const addUserAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/user/add`, reqBody);
};

export const editUserAPI = async (id, reqBody) => {
    return await commonAPI("PUT", `${serverURL}/users/edit/${id}`, reqBody);
};

export const getUsersAPI = async () => {
    return await commonAPI("GET", `${serverURL}/users/get-all`);
};

export const deleteUserAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/users/delete/${id}`);
};

export const userLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/user/login`, reqBody);
};

// ---------------------------------
// ------------- Pooja -------------
// ---------------------------------

export const addPoojaAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/pooja/add`, reqBody);
};

export const getAllPoojaAPI = async () => {
    return await commonAPI("GET", `${serverURL}/pooja/get-all`);
};

export const editPoojaAPI = async (id, reqBody) => {
    return await commonAPI("PUT", `${serverURL}/pooja/edit/${id}`, reqBody);
};

export const deletePoojaAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/pooja/delete/${id}`);
};



// ---------------------------------
// ------------- Payment -------------
// ---------------------------------


export const createPaymentAPI = async (reqBody) => {
    return commonAPI("POST", `${serverURL}/payment/create`, reqBody)
}
export const verifyPaymentAPI = async (reqBody) => {
    return commonAPI("POST", `${serverURL}/payment/verify`, reqBody)
}
export const getAllPaymentsAPI = async () => {
    return await commonAPI("GET", `${serverURL}/payment/get-all`);
};
export const getPaymentAPI = async (id) => {
    return await commonAPI("GET", `${serverURL}/payment/get/${id}`);
};
export const editPaymentAPI = async (id, reqBody) => {
    return await commonAPI("PUT", `${serverURL}/payment/edit/${id}`, reqBody);
};
export const deletePaymentAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/payment/delete/${id}`);
};

// ------------------------------------
// ------------- Receipts -------------
// ------------------------------------


export const getAllReceiptAPI = async () => {
    return await commonAPI("GET", `${serverURL}/receipt/get-all`, {})
}
export const generateReceiptNumberAPI = async () => {
    return await commonAPI("GET", `${serverURL}/receipt/generate-number`, {})
}
export const saveReceiptsAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/receipt/save`, reqBody)
}

export const exportExcelAPI = async () => {
    return await commonAPI("GET", `${serverURL}/receipt/export/excel`, {}, {}, { responseType: "blob", })
}