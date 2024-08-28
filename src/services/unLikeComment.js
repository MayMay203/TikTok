import * as request from '~/utils/httpRequest'
export const unlikeComment = async (id) => {
  try {
    const res = await request.post(
      `/comments/${id}/unlike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return res.data
  } catch (error) {
    console.log('error unlike a comment')
  }
}
