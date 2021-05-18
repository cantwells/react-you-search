const helper = {
    asynizer: (str) => {
        const map = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#x27;': "'",
            '&#39;': "'",
            '&#x2F;': "/",
        };
        const re = /&#?\w{2,4};/gi;

        return str.replace(re, (match) => map[match])
    },
    multyColorRange: (event) => {
        const target = event.target;
        target.style.background = 'linear-gradient(to right, #1390E5 0%, #1390E5 ' + (target.value * 2) + '%, #EAEAEA ' + (target.value * 2) + '%, #EAEAEA 100%)'
    },
    utf8_to_b64: str => btoa(encodeURI(str)),

    b64_to_utf8: str => decodeURI(atob(str)),

    logIn(credentials, users) {
        const { username, password } = credentials;
        return new Promise((resolve, reject) => {
            const user = users.find(item => item.username === username);
            if (user && this.b64_to_utf8(user.password) === password) {
                resolve(username);
            } else {
                reject("Не верный логин или пароль!");
            }
        })
    },
}

export default helper;