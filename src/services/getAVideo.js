import * as request from '~/utils/httpRequest'

export const getAVideo = async (uuid) => {
  try {
    const res = await request.get(`/videos/${uuid}`)
    return res.data
  } catch (error) {
    console.log('error get a video', error)
  }
}
