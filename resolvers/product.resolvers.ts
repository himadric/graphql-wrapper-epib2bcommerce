import fetch from 'node-fetch';
import objectHelper from '../helpers/objectHelper';
import config from 'config';

const baseURL = config.get('RestApi.baseUrl');


export default {
    Query: {
        product: async (_, {id, expand}) => {
            let queryString : String = ((expand) ? `expand=${expand}` : '');
            const data = await fetch(`${baseURL}/api/v1/products/${id}?${queryString}`).then(res => res.json());
            const entries = objectHelper.convertPropertiesToKeyValue(data.product.properties);
            data.product.properties=entries;
            console.log("API Called...")
            return data;
        }
    }
}