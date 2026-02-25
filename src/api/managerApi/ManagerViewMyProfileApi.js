import axiosInstance from "../axiosInstance";

const managerViewMyProfileApi = {};

// Manager View My Profile
managerViewMyProfileApi.viewMyProfile = async () => {
    const response = await axiosInstance.get("/manager/my-profile");
    return response.data;
};

export default managerViewMyProfileApi;



