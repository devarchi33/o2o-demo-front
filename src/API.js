const ADDRESS = "http://localhost:8000";

export default class API {
    static getJsonTypeHeader = () => {
        const token = 'Bearer ' + '';

        return {
            'Authorization': `${token}`,
            'Content-Type':'application/json'
        };
    };

    static getStock = (skuId) => {
        return fetch(`${ADDRESS}/v1/stock?stockType=store&skuId=${skuId}`, {
            method: "GET",
            headers: API.getJsonTypeHeader()
        }).then(res => res.json());
    }
}