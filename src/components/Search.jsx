import React from 'react';
import { Header } from '.';

const Search = () => {
    return (
        <div className="wrapper">
            <Header/>
            <main className="content">
                <h1>Поиск видео</h1>
                <form className="form">
                    <div className="united-search">
                        <input className="search" type="text" placeholder="Что хотите посмотреть?" />
                        <button className="button button--fill">Найти</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Search;