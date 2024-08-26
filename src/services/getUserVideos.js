import * as request from '~/utils/httpRequest'
export const getUserVideos = async (id) => {
    try {
        const res = await request.get(`/users/${id}/videos`)
        return res.data;
    }
    catch (error) {
        // console.log("Error get user's videos: ", error)
    }
}