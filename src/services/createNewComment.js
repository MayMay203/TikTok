import * as request from '~/utils/httpRequest'
export const createComment = async (uuid, comment) => {
  try {
    const res = await request.post(
      `/videos/${uuid}/comments`,
      {
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      )
      return res.data
  } catch (error) {
    console.log('error create new comment', error)
  }
}
