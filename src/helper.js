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
    }
}

export default helper;