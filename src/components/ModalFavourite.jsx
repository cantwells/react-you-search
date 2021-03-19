import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames'

const ModalFavourite = ( {onHideFavourite, isShow} ) => {
    return (
        <div className={ cn('modal__favorite_saved', { 'modal__favorite_saved--show': isShow })}>
            <p>Поиск сохранён в разделе «Избранное»</p>
            <Link to="/favourite" onClick={onHideFavourite}>Перейти в избранное</Link>
        </div>
    )
}

export default ModalFavourite;