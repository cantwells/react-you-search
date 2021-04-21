import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';

const InfoModal = React.memo(( {onHideModal, isShow} ) => {
    return (
        <div className={ cn('modal__info', { 'modal__info--show': isShow })}>
            <p>Поиск сохранён в разделе «Избранное»</p>
            <Link onClick={onHideModal} to="/favourite">Перейти в избранное</Link>
        </div>
    )
});

InfoModal.propTypes = {
    isShow: PropTypes.bool,
    onHideModal: PropTypes.func
}

export default InfoModal;