import commonAPI from "./commonAPI"
import serverURL from "./serverURL"



// ---------------------------------
// ------------- Pooja -------------
// ---------------------------------

export const getAllPoojaAPI = async () => {
    return await commonAPI("GET", `${serverURL}/pooja/get-all`, {})
}


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