import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames'

const ModalFavourite = React.memo(( {onHideFavourite, isShow} ) => {
    return (
        <div className={ cn('modal__favorite_saved', { 'modal__favorite_saved--show': isShow })}>
            <span role="button" tabIndex="0" aria-label="Закрыть" onClick={onHideFavourite}>X</span>
            <p>Поиск сохранён в разделе «Избранное»</p>
            <Link to="/favourite">Перейти в избранное</Link>
            {/* <p onClick={onHideFavourite}>Перейти в избранное</p> */}
        </div>
    )
});

export default ModalFavourite;