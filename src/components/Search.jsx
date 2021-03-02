import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Button, DisplayGrid, DisplayList } from '.';
import cn from 'classnames';
import { fetchVideosByQuery, setIsGrid } from '../redux/slices/searchSlice';

let query = '';

// const map = {
//     '&amp;': '&',
//     '&lt;': '<',
//     '&gt;': '>',
//     '&quot;': '"',
//     '&#x27;': "'",
//     '&#x2F;': "/",
// };

const Search = React.memo(() => {
    const [ value, setValue ] = React.useState("");
    const dispatch = useDispatch();
    const {videos, totalResult, isGrid} = useSelector(({search}) => search);

    const handleValue = (event) => {
        setValue(event.target.value);
    }
    const handleSubmit = (event) => {
        if( value ) {
            query = value;
            dispatch( fetchVideosByQuery(value));
        }
        setValue('');
        event.preventDefault();
    }

    const handleIsGrid = ( isGrid ) => {
        dispatch(setIsGrid(isGrid));
    }

    console.log(videos);
    return (
        <>
            <main className="main">
                <h2>Поиск видео</h2>
                <section className="search">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="united-search">
                            <input type="text" 
                                    className="search search__result" 
                                    placeholder="Что хотите посмотреть?"
                                    value={value}
                                    onChange={handleValue}
                                />
                            <svg className="search__heart" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z" stroke="#1390E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <Button className="button--fill">Найти</Button>
                            <div className="modal__favorite-saved">
                                <p>Поиск сохранён в разделе «Избранное»</p>
                                <Link to="/favourite">Перейти в избранное</Link>
                            </div>
                        </div>
                    </form>
                </section>
                <section className="result">
                    <div className="result__header">
                        <div className="result__descr">
                            Видео по запросу  «<b>{query}</b>»
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
                        ? <DisplayGrid items={videos} />
                        : <DisplayList items={videos} />
                    }
                </section>
            </main>
            {/* <div className="modal overlay visuallyhidden">
                <div className="modal__window">
                    <h4>Сохранить запрос</h4>
                    <form action="">
                        <div className="form__input">
                            <p>Запрос</p>
                            <input type="text" name="request" />
                        </div>
                        <div className="form__input">
                            <p><i>*</i>Название</p>
                            <input type="text" name="title" placeholder="Укажите название" />
                        </div>
                        <div className="form__input">
                            <p>Сортировать по</p>
                            <input type="text" name="sortby" placeholder="Без сортировки" />
                            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.29289 4.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H8.79289C9.23835 0 9.46143 0.53857 9.14645 0.853553L5.70711 4.29289C5.31658 4.68342 4.68342 4.68342 4.29289 4.29289Z" fill="#D1D1D1"/>
                            </svg>
                        </div>
                        <div className="form__input">
                            <p>Максимальное количество</p>
                            <div className="range-block">
                                <input type="range" min="0" max="50" value="25" step="1" className="ranger" />
                                <span className="range-result">25</span>
                            </div>
                        </div>
                        <div className="button-block">
                            <button className="button button--outline">Не сохранять</button>
                            <button className="button button--fill">Сохранять</button>
                        </div>
                    </form>
                </div>
            </div> */}
        </>
    )
});

export default Search;