import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menus = ['Поиск', 'Избранное'];
const menuLink = ['/', '/favourite'];

const Header = React.memo(() => {
    const location = useLocation();

    const initIdx = menuLink.indexOf(location.pathname);
    const [activeMenu, setActiveMenu] = React.useState(initIdx);

    const onChangeMenu = idx => {
        setActiveMenu(idx);
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
                <div className="logout">Выйти</div>
            </header>
        );
    }else{
        return null;
    }
    
});

export default Header;