import * as request from '~/utils/httpRequest'
export const followUser = async (id) => {
  try {
    const res = await request.post(
      `/users/${id}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return res.data
  } catch (error) {
    console.log('Error follow a user', error)
  }
}
