import axios from "axios";
import {useUserStore} from "@/store/modules/user.js";

const server = axios.create({
    timeout: 10000,
    baseURL: '/api',
})

server.interceptors.request.use(config => {
    const userStore = useUserStore()
    config.headers = {
        'X-User-ID': userStore ? userStore.phone : null,
        ...config.headers,
    }
    return config
})

server.interceptors.response.use(response => {
    if (response.status === 200 && response.data.success) {
        return response.data;
    }
    throw new Error(response.statusText);
    },
    error => {

    }
)

export default server
