import * as request from '~/utils/httpRequest'
export const getUserLikedVideos = async (id) => {
  try {
    const res = await request.get(`/users/${id}/liked-videos`)
    return res.data
  } catch (error) {
    // console.log("Error get user's liked videos: ", error)
  }
}
