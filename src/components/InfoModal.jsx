import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames'

const InfoModal = React.memo(( {onHideModal, isShow} ) => {
    return (
        <div className={ cn('modal__info', { 'modal__info--show': isShow })}>
            <span role="button" tabIndex="0" aria-label="Закрыть" onClick={onHideModal}>X</span>
            <p>Поиск сохранён в разделе «Избранное»</p>
            <Link to="/favourite">Перейти в избранное</Link>
        </div>
    )
});

export default InfoModal;