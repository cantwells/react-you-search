import React from 'react'
import cn from 'classnames';
import PropTypes from 'prop-types'
import { Button } from '.';
import { useForm } from 'react-hook-form';
import helper from '../helper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ModalAddFavourite = React.memo( ({ isShow, onModalShow, query, onAddFavourite }) => {

    const schema = Yup.object().shape({
        title: Yup
                .string()
                .required('Обязательное поле!')
                .min(3, 'Слишком короткое')
    })

    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const [ value, setValue ] = React.useState(25);

    const closeModal = () => {
        formRef.current.reset();
        onModalShow(false);
    }

    const onSubmit = data => {
        onAddFavourite(data);
        closeModal();
    }

    const formRef = React.useRef();
    
    const handleChange = (event) => {
        setValue(event.target.value);
        helper.multyColorRange(event);
    }

    const handleFakeChange = () => {}

    return (
        <div className={ cn('modal', 'overlay', { 'visuallyhidden': !isShow }) }>
            <div className="modal__window">
                <h4>Сохранить запрос</h4>
                <form onSubmit={ handleSubmit(onSubmit) } ref={formRef} >
                    <div className="form__input">
                        <p>Запрос</p>
                        <input type="text" name="request" value={query} onChange={handleFakeChange} ref={register} />
                    </div>
                    <div className="form__input">
                        <p><i>*</i>Название</p>
                        <input type="text" name="title" placeholder="Укажите название" ref={register} />
                        { <p className="form__input_error">{errors.title?.message}</p> }
                    </div>
                    <div className="form__input">
                        <select name="sort" ref={register}>
                            <option value="">Сортировать по</option>
                            <option value="name">По имени</option>
                            <option value="date">По дате</option>
                        </select>
                    </div>
                    <div className="form__input">
                        <p>Максимальное количество</p>
                        <div className="range-block">
                            <input name="ranger" type="range" min="0" max="50" value={value} step="1" className="ranger" onChange={handleChange} ref={register} />
                            <span className="range-result">{value}</span>    
                        </div>
                    </div>
                    <div className="button-block">
                        <Button type="button" className="button--outline" onClick={closeModal}>Не сохранять</Button>
                        <Button role="submit" className="button--fill">Сохранять</Button>
                    </div>
                </form>
            </div>
        </div>
    )
});

ModalAddFavourite.propTypes = {
    isShow: PropTypes.bool.isRequired,
    query: PropTypes.string.isRequired,
    onModalShow: PropTypes.func.isRequired,
    onAddFavourite: PropTypes.func.isRequired
}

export default ModalAddFavourite;