import * as request from '~/utils/httpRequest'
export const unFollowUser = async (id) => {
  try {
      const res = await request.post(
        `/users/${id}/unfollow`,
        {},
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
      )
    return res.data
  } catch (error) {
    console.log('Error unfollow a user', error)
  }
}
