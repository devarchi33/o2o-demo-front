const ADDRESS = "http://localhost:8000";

export default class API {
    static getJsonTypeHeader = () => {
        const token = 'Bearer ';

        return {
            'Authorization': `${token}`,
            'Content-Type':'application/json'
        };
    };

    static getStocks = (stockType, skuIds, unit) => {
        let url = `${ADDRESS}/v1/stock?stockType=${stockType}&skuIds=${skuIds}`;
        if (stockType === 'province') {
            url += `&province=${unit}`
        }
        if (stockType === 'district') {
            url += `&district=${unit}`
        }
        if (stockType === 'area') {
            url += `&area=${unit}`
        }
        return fetch(url, {
            method: "GET",
            headers: API.getJsonTypeHeader()
        }).then(res => res.json());
    }
}