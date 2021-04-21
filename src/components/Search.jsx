import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, DisplayGrid, DisplayList, EmptySearch, ModalFavourite, InfoModal } from '.';
import cn from 'classnames';
import { fetchVideosByQuery, setIsGrid, setLocalData } from '../redux/slices/searchSlice';
import { addFavourite, setLocalFavouriteItems } from '../redux/slices/favouriteSlice';
import browserStorage from '../browserStorage';

const Search = React.memo(() => {

    const dispatch = useDispatch();
    //Получаем данные по запросу из стейта
    const {videos, totalResult, request, isGrid, isLoaded} = useSelector(({search}) => search);
    //Получаем избранные запросы
    const favourites = useSelector(({favourites}) => favourites.favouriteItems);
    //Получаем текущего пользователя
    const user = useSelector( ({login}) => login.user );

    React.useEffect( () => {
        //получаем данные по пользователю из localStorage
        const dataUser = browserStorage.getData(user);
        //Если в localStorage что то есть то записываем в стейт
        if( Object.keys(dataUser).length && !videos.length ){
            dispatch( setLocalData(dataUser) )
            dispatch( setLocalFavouriteItems( dataUser.favouriteItems ) )
        }
       // eslint-disable-next-line
    },[]);

    //Получение данных из поисковой строки
    const [ value, setValue ] = React.useState("");
    //отображать/скрывать модалку с формой
    const [ modalShow, setModalShow ] = React.useState(false);
    //отображать/скрывать модалку для перехода на избранное
    const [ isShowInfoModal, setIsShowInfoModal ] = React.useState(false);
    //проверка вводимой строки на наличие в избранном
    const isFavourite = () => {
        return !!favourites.find( item => item.request === value );
    }
    //создаём реф для возможности отключать таймаут из другой функции
    const clearModal = React.useRef();
    //Обработчик ввода данных в поисковой строке
    const handleGetValue = (event) => {
        setValue(event.target.value);
    }

    //Обработчик для отображения модального окна с преходом в избранное
    const handleShowInfoModal = () => {
        setIsShowInfoModal(true);
        //Отображаем модальное окно в течение 6 сек
        clearModal.current = setTimeout(() => {
            setIsShowInfoModal(false);
        }, 3600)
    }
    //Обработчик для скрытия модального окна
    const handleHideInfoModal = React.useCallback(() => {
        clearTimeout( clearModal.current );
    },[]);

    //Обработчик отправки формы в поисковой строке
    const handleSubmit = (event) => {
        if( value ) dispatch( fetchVideosByQuery({request: value}));
        event.preventDefault();
    }
    //Обрабатывать вид отображения видео 
    const handleIsGrid = ( isGrid ) => {
        dispatch(setIsGrid(isGrid));
    }
    //Показывать/скрывать модальное окно
    const handleIsModalShow = ( isShow ) => {
        isFavourite() ? handleShowInfoModal() : setModalShow(isShow);
    }
    //Добавление в избранное
    const handleAddFavourite = ( data ) => {
        dispatch(addFavourite(data));
    }

    return (
        <>
            {(videos?.length) 
                ?   <main className="main">
                        <h2>Поиск видео</h2>
                        <section className="search">
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="united-search">
                                    <input type="text" 
                                            className="search search__result" 
                                            placeholder="Что хотите посмотреть?"
                                            value={value}
                                            onChange={handleGetValue}
                                        />
                                    {
                                        value && <svg onClick={() => handleIsModalShow(true)} className={cn('search__heart', {'search__heart--fill': isFavourite()}) } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z" stroke="#1390E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                    }
                                    <Button className="button--fill button--search">Найти</Button>
                                    {<InfoModal isShow={isShowInfoModal} onHideModal={handleHideInfoModal} /> }
                                </div>
                            </form>
                        </section>
                        <section className="result">
                            <div className="result__header">
                                <div className="result__descr">
                                    Видео по запросу  «<b>{request}</b>»
                                    <span>{totalResult}</span>
                                </div>
                                <div className="result__output">
                                    <svg onClick={() => handleIsGrid(false)} className={cn({'active': !isGrid})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 6H21" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 12H21" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 18H21" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3 6H3.01" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3 12H3.01" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3 18H3.01" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <svg onClick={() => handleIsGrid(true)} className={cn({'active': isGrid})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 5H5V10H10V5Z" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M19 5H14V10H19V5Z" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M19 14H14V19H19V14Z" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M10 14H5V19H10V14Z" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            {
                                isGrid 
                                ? <DisplayGrid items={videos} isLoaded={isLoaded} />
                                : <DisplayList items={videos} isLoaded={isLoaded} />
                            }
                        </section>
                    </main>
                : <EmptySearch value={value} onSubmit={handleSubmit} onGetValue={handleGetValue} />
            }
            {
                modalShow && <ModalFavourite onIsModalShow={handleIsModalShow} 
                                queryData={ {request} }
                                onDispatchFavourite={handleAddFavourite}
                            />
            }
        </>
    )
});

export default Search;