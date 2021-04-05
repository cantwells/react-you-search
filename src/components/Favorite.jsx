import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { ModalFavourite } from '.';
import { delFavourite, editFavourite } from "../redux/slices/favouriteSlice";
import { fetchVideosByQuery } from '../redux/slices/searchSlice';

let favouriteItem = {}
const Favourite = () => {
    // отображать/скрывать форму
    const [ isModalShow, setIsModalShow ] = React.useState(false);
    
    const dispatch = useDispatch();
    const history = useHistory();
//     //получаем все избранные
    const items = useSelector(({favourites}) => favourites.items);
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