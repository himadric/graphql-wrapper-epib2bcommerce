import fetch from 'node-fetch';
import config from 'config';
const baseURL = config.get('RestApi.baseUrl');

export default {
    Query: {
        categoryCollection: async (_, {maxdepth, startCategoryId, includeStartCategory}) => {
            let queryString : String = ((maxdepth) ? `maxdepth=${maxdepth.toString()}&` : '') + 
            ((startCategoryId) ? `startCategoryId=${startCategoryId}&` : '') + 
            ((includeStartCategory) ? `includeStartCategory=${includeStartCategory.toString()}` : '');
            let data = await fetch(`${baseURL}/api/v1/categories?${queryString}`).then(res => res.json());
            return data;
        }
    }
}