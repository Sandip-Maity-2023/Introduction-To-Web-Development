
import axios from "axios";
import SummaryApi,{baseURL} from "../common/SummaryApi";

const Axios=axios.create({
    baseURL:baseURL,
    withCredentials:true
})

Axios.interceptors.request.use(
    async(config)=>{
        const accessToken=localStorage.getItem('accesstoken')

        if(accessToken) config.headers.Authorization=`Bearer ${accessToken}`

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
        let originRequest=error.config

        if(error.response.status===401 && !originRequest.retry){
            originRequest.retry=true
            const refreshToken=localStorage.getItem("refreshToken")

            if(refreshToken){

                const newAccessToken=await refreshAccessToken(refreshToken)
                originRequest.headers.Authorization=`Bearer ${newAccessToken}`
                return Axios(originRequest)
            }
        }
    }
)








