import axiosInstance from "../axiosInstance";

const hrTimeSheetApi = {};

/* GET TIMESHEETS */

hrTimeSheetApi.getTimeSheets = async () => {
  const res = await axiosInstance.get("/hr/timesheet");
  return res.data?.data || [];
};

/*  UPDATE STATUS  */

hrTimeSheetApi.updateStatus = async (id, status) => {
  try {
    const res = await axiosInstance.get("/hr/timesheet", {
      params: {
        id: id,
        status: status,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Timesheet update error:", error);
    throw error;
  }
};

/*  DOWNLOAD PDF  */

hrTimeSheetApi.downloadPDF = async () => {
  try {
    const res = await axiosInstance.get("/hr/timesheet/download/pdf", {
      responseType: "blob",
    });

    return res.data;
  } catch (error) {
    console.error("PDF download error:", error);
    throw error;
  }
};

/*  DOWNLOAD EXCEL  */

hrTimeSheetApi.downloadExcel = async () => {
  try {
    const res = await axiosInstance.get("/hr/timesheet/download/excel", {
      responseType: "blob",
    });

    return res.data;
  } catch (error) {
    console.error("Excel download error:", error);
    throw error;
  }
};

export default hrTimeSheetApi;
