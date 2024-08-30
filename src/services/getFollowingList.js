import * as request from '~/utils/httpRequest'
export const getFollowingList = async (page) => {
    try {
        const res = await request.get(`/me/followings`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
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