import helper from "./helper";

const browserStorage = {
    getData: (key) => {
        try{
            if(localStorage.getItem(key)){
                /*
                    1. Получаем данные из localStorage
                    2. Перекодируем из base64 в utf8
                    3. Парсим из  JSON
                */
                return JSON.parse(helper.b64_to_utf8( localStorage.getItem(key) ));
                // return JSON.parse(localStorage.getItem(key));
            }
            return {}
        }catch(err){
            console.error(err);
        }
    },
    
    saveData: ( key, obj ) => {
        /*
            1. Кодируем в base64
            2. Cериализуем в JSON
            3. Добавляем в localStorage
        */
        const serializedObj = helper.utf8_to_b64(JSON.stringify(obj));
        // const serializedObj = JSON.stringify(obj);
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