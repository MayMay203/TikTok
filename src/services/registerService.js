import * as request from '~/utils/httpRequest'
export const register = async (email, password) => {
    try {
    const res = await request.post('/auth/register', {
      type: 'email',
      email,
      password,
    })
    return res.data
    }
    catch (error) {
        console.log('Register error: ', error);
    }
}