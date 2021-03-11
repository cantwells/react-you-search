import React from 'react'
import cn from 'classnames';
import PropTypes from 'prop-types'
import { Button } from '.';
import { useForm } from 'react-hook-form';
import helper from '../helper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const ModalEditFavourite = React.memo( ({ isShow, onModalShow, favouriteItem, onEditFavourite }) => {

    const schema = Yup.object().shape({
        name: Yup
                .string()
                .required('Обязательное поле!'),
        title: Yup
                .string()
                .required('Обязательное поле!')
                .min(3, 'Слишком короткое')
    })

    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const range = favouriteItem.ranger ? favouriteItem.ranger : 25
    const [ value, setValue ] = React.useState(range);

    const closeModal = () => {
        formRef.current.reset();
        onModalShow(false);
    }

    const onSubmit = data => {
        // data.id = idNum++;
        console.log(data);
        // onEditFavourite(data);
        // closeModal();
    }

    const formRef = React.useRef();
    
    const handleChange = (event) => {
        setValue(event.target.value);
        helper.multyColorRange(event);
    }

    return (
        <div className={ cn('modal', 'overlay', { 'visuallyhidden': !isShow }) }>
            <div className="modal__window">
                <h4>Изменить запрос</h4>
                <form onSubmit={ handleSubmit(onSubmit) } ref={formRef} >
                    <div className="form__input">
                        <p>Запрос</p>
                        <input type="text" name="request" defaultValue={favouriteItem?.request} ref={register} />
                    </div>
                    <div className="form__input">
                        <p><i>*</i>Название</p>
                        <input type="text" name="title" defaultValue={favouriteItem?.title} placeholder="Укажите название" ref={register} />
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

ModalEditFavourite.propTypes = {
    isShow: PropTypes.bool.isRequired,
    favouriteItem: PropTypes.object,
    onModalShow: PropTypes.func.isRequired,
    onEditFavourite: PropTypes.func.isRequired
}

export default ModalEditFavourite;