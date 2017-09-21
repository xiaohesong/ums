var array = {
    flatten(arr) {
        return Array.prototype.concat(...arr);
    },

    isIncludes(superset, subset) {
        console.log('superset',superset, 'subset', subset)
        if (0 === subset.length) {
            return false;
        }
        return subset.every(function (value) {
            console.log(superset.indexOf(value) >= 0)
            return (superset.indexOf(value) >= 0);
        });
    }
}

export default array