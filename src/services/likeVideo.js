import * as request from '~/utils/httpRequest'

export const likeVideo = async (id) => {
    try {
        const res = await request.post(`/videos/${id}/like`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    }
    catch (error) {
        console.log('Error like a video', error);
    }
}