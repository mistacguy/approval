import server from '@/utils/request';

export const UserApi = {
    fetchApprovers: (params) => {
        console.log(123)
        return server({
            url: '/api/im-biz/api/org/getChildDepartAndUsers',
            params: params
        })
    }
}
