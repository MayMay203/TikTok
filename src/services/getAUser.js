import * as request from '~/utils/httpRequest'
export const getAUser = async (nickname) => {
  try {
    const res = await request.get(`/users/@${nickname}`)
    console.log(res)
    return res.data
  } catch (error) {
    console.log('Error get a user: ', error)
  }
}
