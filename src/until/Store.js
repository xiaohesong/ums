var methods = {

    store(namespace, data){
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }
        var store = localStorage.getItem(namespace);
        // console.log(store);
        return (store && JSON.parse(store));
    }
}

export default methods;
