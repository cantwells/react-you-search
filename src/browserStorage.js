import helper from "./helper";

const browserStorage = {
    getData: (key) => {
        try{
            if(localStorage.getItem(key)){
                return JSON.parse(helper.b64_to_utf8( localStorage.getItem(key) ));
            }
            return {}
        }catch(err){
            console.error(err);
        }
    },
    
    saveData: ( key, obj ) => {
        const serializedObj = helper.utf8_to_b64(JSON.stringify(obj));
        try{
            localStorage.setItem(key, serializedObj)
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