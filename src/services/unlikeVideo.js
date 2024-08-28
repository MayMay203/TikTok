import * as request from '~/utils/httpRequest'

export const unlikeVideo = async (id) => {
    try {
        const res = await request.post(`/videos/${id}/unlike`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    }
    catch (error) {
        console.log('error unlike a video'. error)
    }
}