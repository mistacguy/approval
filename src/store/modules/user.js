import {defineStore} from 'pinia'
import {ref, watch} from "vue";
export const useUserStore = defineStore('user', () => {
    const loginUserInfo = ref(JSON.parse(localStorage.getItem('loginUserInfo')))
    const setLoginUserInfo = (userInfo) => {
        loginUserInfo.value = userInfo
    }
    watch(() => loginUserInfo.value, () => {
        localStorage.setItem('loginUserInfo', JSON.stringify(loginUserInfo.value))
    })

    return {
        loginUserInfo,
    }
})
