import React from 'react';
import { Button } from '.';
import PropTypes from 'prop-types';
import { Error } from './Error';

const EmptySearch = React.memo(({ onSubmit, value, onGetValue, error }) => {
    return (        
        <main className="content">
            <h1>Поиск видео</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="united-search">
                    <input className="search" 
                            type="text" 
                            placeholder="Что хотите посмотреть?" 
                            onChange={onGetValue}
                            value={value}
                        />
                    <Button className="button--fill button-search">Найти</Button>
                </div>
            </form>
            { error && <Error text={error} /> }
        </main>
    );
});

EmptySearch.propTypes = {
    value: PropTypes.string.isRequired,
    onGetValue: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default EmptySearch;