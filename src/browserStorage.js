const browserStorage = {
    getData: () => {
        try{
            const serializeDate = localStorage.getItem('token');
            if(serializeDate){
                return JSON.parse(serializeDate);
            }
            return {}
        }catch(err){
            console.error(err);
        }
    },
    
    saveData: ( obj ) => {
        try{
            localStorage.setItem('token', JSON.stringify(obj))
        }catch(err){
            console.error(err);
        }
    },
    
    removeData: () => {
        try{
            localStorage.removeItem('token')
        }catch(err){
            console.error(err);
        }
    }
}

export default browserStorage;