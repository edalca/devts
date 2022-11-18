export default {
    methods: {
        isUnique: (element, axios, url, params) => async(value) => {
            const data = await axios
                .get(url, {
                    params: params,
                })
                .then((res) => {
                    return res.data.find((items) => items[element] == value);
                })
                .catch((err) => {
                    return [];
                });
            if (data == undefined || data == null) return true;
            if (Object.keys(data).length > 0) return false;
        },
        isUniqueSelect: (element, axios, url, params, elvalue) => async(value) => {
            const data = await axios
                .get(url, {
                    params: params,
                })
                .then((res) => {
                    return res.data.find((items) => items[element] == value[elvalue]);
                })
                .catch((err) => {
                    return [];
                });
            if (data == undefined || data == null) return true;
            if (Object.keys(data).length > 0) return false;
        },
    },
};