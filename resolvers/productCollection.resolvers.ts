import fetch from 'node-fetch';
import config from 'config';
const baseURL = config.get('RestApi.baseUrl');

export default {
    Query: {
        productCollection: async (_, {categoryId, query, page, pagesize, sortType, expand}) => {
            let queryString : String = ((categoryId) ? `categoryid=${categoryId}&` : '') + 
            ((query) ? `query=${query}&` : '') + 
            ((page) ? `page=${page.toString()}&` : '') + 
            ((pagesize) ? `pagesize=${pagesize.toString()}&` : '') + 
            ((sortType) ? `sorTypee=${sortType}&` : '') + 
            ((expand) ? `expand=${expand}` : '');
            let data = await fetch(`${baseURL}/api/v1/products?${queryString}`).then(res => res.json());
            return data;
        }
    }
}       