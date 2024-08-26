import * as request from '~/utils/httpRequest'
export const getVideosList = async(type, page) => {
  try {
    const res = await request.get('/videos', {
      params: {
        type,
        page,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return res.data
  } catch (error) {
    console.log('error get videos list: ', error)
  }
}
