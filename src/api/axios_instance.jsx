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
    incident_by_id : (incident_id) => axiosInstance.get(`incidents/incident/${incident_id}/details/`),
    create_incident : (data) => axiosInstance.post("incidents/create_incident/",data)
  }

export const UserEndpoints = {
    get_token: (credentials) => axiosInstance.post("users/token/",credentials),
    refresh_token: (refreshToken) => axiosInstance.post("users/refresh/",{refresh:refreshToken}),
    // for user creation
    create_incident: (data) => axiosInstance.post("users/user-service/",data),
    // for password update
    change_password: (data) => axiosInstance.patch("users/user-service/",data),

}

export default axiosInstance;
