import axios from "axios";

const axiosInstance = axios.create({
  baseURL: " http://127.0.0.1:8000/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const IncidentEndpoints = {
    incidents_list : () => axiosInstance.get("incidents/incidents_list/"),
    incident_by_id : (incident_id) => axiosInstance.get(`incidents/incident/${incident_id}/details/`)
}

export const UserEndpoints = {
    get_token: () => axiosInstance.post("users/token/"),
    refresh_token: () => axiosInstance.post("users/refresh/"),
    // for user creation
    user_service: () => axiosInstance.post("users/user-service/"),
    // for password update
    user_service: () => axiosInstance.patch("users/user-service/"),

}

export default axiosInstance;
