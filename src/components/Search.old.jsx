import React from 'react';

const SearchOld = () => {
    return (        
        <main className="content">
            <h1>Поиск видео</h1>
            <form className="form">
                <div className="united-search">
                    <input className="search" type="text" placeholder="Что хотите посмотреть?" />
                    <button className="button button--fill">Найти</button>
                </div>
            </form>
        </main>
    );
}

export default SearchOld;