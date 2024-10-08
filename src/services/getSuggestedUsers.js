import * as request from "~/utils/httpRequest"
export const getSuggestedUsers = async ({page, perPage}) => {
    try {
        const res = await request.get('/users/suggested', {
            params: {
                page,
                per_page: perPage
            }
        });
        return res.data;
    }
    catch (error) {
        console.log(error)
    }
}