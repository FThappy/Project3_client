import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  Platform.OS === "ios"
    ? "http://localhost:5000/api/"
    : "http://10.0.2.2:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  async function (request) {
    const data = await AsyncStorage.getItem("persist:root"); // Thay 'khóa_lưu_trữ' bằng khóa bạn đã sử dụng khi lưu trữ dữ liệu.
    if (data !== null) {
      request.headers.token =
        "Bearer " + JSON.parse(JSON.parse(data).currentUser).accessToken;
      console.log(request.headers.Authorization);
    } else {
      // Không tìm thấy dữ liệu trong AsyncStorage
      console.log("Không có dữ liệu trong AsyncStorage");
    }
    return request;
  },

  function (error) {
    return Promise.reject(error);
  }
);
export { userRequest };
