var manageCookie = {
    set: function(key, value, expiresTime) {
        document.cookie = key + '=' + value + '; max-age=' + expiresTime;
        return this;
    },

    delete: function(key) {
        this.set(key, '', -1);
        return this;
    },

    get: function(key, callback) {
        var cookiesArray = document.cookie.split('; ');

        for (var i = 0; i < cookiesArray.length; i++) {
            var cookieItem = cookiesArray[i];

            var cookieItemArray = cookieItem.split('=');

            if (cookieItemArray[0] === key) {
                callback(cookieItemArray[1]);
                return this;
            }
        }
        callback(undefined);
        return this;
    }
}

manageCookie.set('name', 'jayden', 1000)
    .set('age', '20', 1000)
    .set('sex', 'female', 3000)
    .delete('name')
    .get('age', function(data) {
        console.log(data);
    });

console.log(document.cookie);