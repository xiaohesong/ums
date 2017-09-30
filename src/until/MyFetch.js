const API_URL = process.env.REACT_APP_DEV_API_URL

var myFetch = {
    all(path) {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${path}`,{
                headers: new Headers({
                    Authentication: '009aa9774b5cf730a880956fe6caab23',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    let errors = `${res.status}, ${res.statusText}`
                    throw errors;
                }
            })
                .then(json => {
                    resolve(json);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    post(values, path) {
        console.log(`post values is ${JSON.stringify(values)}`)
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${path}`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            }).then(function (data) {
                resolve(data);
            }).catch( error => {
                reject(error)
            })
        })

    },

    put(values, id) {
        console.log(`post values is ${JSON.stringify(values)}`)
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            }).then(function (data) {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })

    },

    del(id) {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/customers/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                })
            }).then(res=> {
                if (res.ok) {
                    return res.json();
                } else {
                    let errors = `${res.status}, ${res.statusText}`
                    throw errors;
                }
            }).then(json => resolve(json))
                .catch(result => reject(result));
        })

    }
}

export default myFetch
