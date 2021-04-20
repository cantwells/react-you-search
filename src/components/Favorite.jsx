import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { ModalFavourite } from '.';
import browserStorage from '../browserStorage';
import { delFavourite, editFavourite, setLocalFavouriteItems } from "../redux/slices/favouriteSlice";
import { fetchVideosByQuery } from '../redux/slices/searchSlice';

let favouriteItem = {}
const Favourite = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // отображать/скрывать форму
    const [ isModalShow, setIsModalShow ] = React.useState(false);
    
    //получаем все избранные запросы
    const items = useSelector(({favourites}) => favourites.favouriteItems);
    //Получаем текущего пользователя
    const user = useSelector( ({login}) => login.user );
    //При загрузке страницы проверяем есть ли по текущему пользователю данные в LocalStorage
    React.useEffect( () => {
        //получаем данные из localStorage
        const dataUser = browserStorage.getData(user);
        //Если есть заливаем в стейт
        if( Object.keys(dataUser).length ){
            dispatch( setLocalFavouriteItems( dataUser.favouriteItems ) )
        }
    }, [user, dispatch] );

    //удалить избраное
    const delFavouriteByID = (id) => {
        dispatch( delFavourite({id}) );
        favouriteItem = {};
    }

    //получить избраное по id
    const getFavourite = (id) => {
        favouriteItem = items.find( item => item.id === id);
        setIsModalShow(true);
    }

    //Показывать/скрывать модальное окно
    const handleIsModalShow = ( isShow ) => {
        setIsModalShow(isShow);
    }

    //оброботчик для изменения избраного
    const handleEditFavourite = ( obj ) => {
        dispatch(editFavourite(obj));
    }
    //Отображение видео по избранным запросам
    const handleShowFavourite = ( request, amount, sort )  => {
        dispatch( fetchVideosByQuery({request, amount, sort }));
        history.push('/');
    }

    return (
        <>
            <main className="main main-favourits">
                <h2>Избранное</h2>
                <div className="favourits">
                    {
                        items.map( ({id, request, sort, amount}) => (
                            <div className="item" key={ `${request}-${new Date().getTime()}` }>
                                <div className="item__title"><span className="text__cursor" onClick={() => handleShowFavourite(request, amount, sort)}>{request}</span></div>
                                <div className="item__edit">
                                    <span onClick={() => getFavourite(id)}>Изменить</span>
                                    <span className="item__edit-del" onClick={ () => delFavouriteByID(id) }>Удалить</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </main>
            {
                isModalShow && <ModalFavourite
                                    isAdd={false}
                                    onIsModalShow={handleIsModalShow}
                                    queryData={favouriteItem}
                                    onDispatchFavourite={handleEditFavourite}
                                />
            }
        </>
    )
}

export default Favourite;