import React from 'react'
import cn from 'classnames';
import PropTypes from 'prop-types'
import { Button } from '.';

const ModalAddFavourite = React.memo( ({ isShow, onModalShow }) => {

    const closeModal = () => {
        onModalShow(false);
    }
    return (
        <div className={ cn('modal', 'overlay', { 'visuallyhidden': !isShow }) }>
            <div className="modal__window">
                <h4>Сохранить запрос</h4>
                <form>
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
                        <Button className="button--outline" onClick={closeModal}>Не сохранять</Button>
                        <Button className="button--fill">Сохранять</Button>
                    </div>
                </form>
            </div>
        </div>
    )
});

ModalAddFavourite.propTypes = {
    isShow: PropTypes.bool.isRequired
}

export default ModalAddFavourite;