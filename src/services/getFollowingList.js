import * as request from '~/utils/httpRequest'
export const getFollowingList = async (page, token) => {
    try {
        const res = await request.get(`/me/followings`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page
            }
        })
        return res.data
    }
    catch (error) {
        console.log('error get following list: ', error)
    }
}