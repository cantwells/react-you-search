import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import browserStorage from '../browserStorage';
import { resetFavouritesItems } from '../redux/slices/favouriteSlice';
import { logOut } from '../redux/slices/loginSlice';
import { resetVideos } from '../redux/slices/searchSlice';
//Доступные пункты меню
const menus = ['Поиск', 'Избранное'];
//Доступные сслыки
const menuLink = ['/', '/favourite'];

const Header = React.memo(() => {
    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector( ({login}) => login.user );
    //Задаем ссылку по умолчанию
    const [activeMenu, setActiveMenu] = React.useState('/');

    React.useEffect(() => {
        //Получаем ссылку и возвращаем соответсвующий индекс из массива с сылками
        const initIdx = menuLink.indexOf(location.pathname);
        //который потом и устанавливаем
        setActiveMenu(initIdx)
    }, [location.pathname])
    //Оброботка при переключение пунктов меню
    const onChangeMenu = idx => {
        setActiveMenu(idx);
    }
    //Обработчик выхода из сессии
    const handleLogOut = () => {
        //Сбрасываем все данные из состояний и удаляем токен
        dispatch(resetVideos());
        dispatch(resetFavouritesItems());
        dispatch(logOut());
        browserStorage.removeData('token');
    } 

    if ( menuLink.includes( location.pathname ) ){
        return (
            <header className="header">
                <nav className="nav">
                    <svg width="48" height="48" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M59.1488 43.5667L24.683 60.9559V79.399L59.1488 62.0098V43.5667Z" fill="#1390E5"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.683 26.1787L59.1487 43.5679V62.0111L24.683 44.6218V26.1787Z" fill="#1180CB"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M59.1488 8.79071L24.683 26.1799V44.623L59.1488 27.2338V8.79071Z" fill="#35A2EC"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="88" height="88" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <ul className="menu">
                        { menus.map( (item, idx) => <li key={item + idx} 
                                                        className={ idx === activeMenu ? 'active' : ''} 
                                                        onClick={() => onChangeMenu(idx)}
                                                    ><Link to={menuLink[idx]}>{item}</Link></li> )}
                    </ul>
                </nav>
                <div className="right">
                    {user && <span className="username">{user}</span>}
                    <span className="logout" onClick={() => handleLogOut()}>Выйти</span>
                </div>
            </header>
        );
    }else{
        return null;
    }
    
});

export default Header;