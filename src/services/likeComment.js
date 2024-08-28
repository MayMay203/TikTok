import * as request from '~/utils/httpRequest'
export const likeComment = async (id) => {
  try {
    const res = await request.post(
      `/comments/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return res.data
  } catch (error) {
    console.log('error like a comment')
  }
}
