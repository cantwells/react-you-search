const browserStorage = {
    getData: (key) => {
        try{
            const serializeDate = localStorage.getItem(key);
            if(serializeDate){
                return JSON.parse(serializeDate);
            }
            return {}
        }catch(err){
            console.error(err);
        }
    },
    
    saveData: ( key, obj ) => {
        try{
            localStorage.setItem(key, JSON.stringify(obj))
        }catch(err){
            console.error(err);
        }
    },
    
    removeData: (key) => {
        try{
            localStorage.removeItem(key)
        }catch(err){
            console.error(err);
        }
    }
}

export default browserStorage;