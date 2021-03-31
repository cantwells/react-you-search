import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ModalFavourite } from '.';
import { delFavourite, editFavourite } from "../redux/slices/favouriteSlice";

let favouriteItem = {}
const Favourite = () => {
    // отображать/скрывать форму
    const [ isModalShow, setIsModalShow ] = React.useState(false);
    
    const dispatch = useDispatch();
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

    return (
        <>
            <main className="main main-favourits">
                <h2>Избранное</h2>
                <div className="favourits">
                    {
                        items.map( item => (
                            <div className="item" key={ `${item.request}-${new Date().getTime()}` }>
                                <div className="item__title"><span className="text__cursor">{item.request}</span></div>
                                <div className="item__edit">
                                    <span onClick={() => getFavourite(item.id)}>Изменить</span>
                                    <span className="item__edit-del" onClick={ () => delFavouriteByID(item.id) }>Удалить</span>
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