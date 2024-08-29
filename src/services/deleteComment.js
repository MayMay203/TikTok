import * as request from '~/utils/httpRequest'
export const deleteComment = async (id) => {
    try {
        const res = await request.DELETE(`/comments/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        return res.data;
    }
    catch (error) {
        console.log('error delete a comment', error)
    }
}