import * as request from "~/utils/httpRequest"
export const findSugAccounts = async () => {
    try {
        const res = await request.get('/users/suggested');
        return res.data;
    }
    catch (error) {
        console.log(error)
    }
}