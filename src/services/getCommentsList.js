import * as request from '~/utils/httpRequest'

export const getCommentsList = async (id) => {
  try {
    const res = await request.get(`/videos/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    return res.data
  } catch (error) {
    console.log('Error get comments list: ', error)
  }
}
