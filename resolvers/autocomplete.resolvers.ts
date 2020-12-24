import fetch from 'node-fetch';
import config from 'config';
const baseURL = config.get('RestApi.baseUrl');

export default {
    Query: {
        autocomplete: async (_, {query, categoryEnabled, contentEnabled, productEnabled, brandEnabled}) => {
            let queryString : String = ((query) ? `query=${query}&` : '') + 
            ((categoryEnabled) ? `categoryEnabled=${categoryEnabled.toString()}&` : '') + 
            ((contentEnabled) ? `contentEnabled=${contentEnabled.toString()}&` : '') + 
            ((productEnabled) ? `productEnabled=${productEnabled.toString()}&` : '') + 
            ((brandEnabled) ? `brandEnabled=${brandEnabled.toString()}&` : '');
            let data = await fetch(`${baseURL}/api/v1/autocomplete?${queryString}`).then(res => res.json());
            return data;
        }
    }
}       