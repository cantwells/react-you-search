import React from 'react'
import cn from 'classnames';
import PropTypes from 'prop-types'
import { Button } from '.';
import { useForm } from 'react-hook-form';
import helper from '../helper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ModalFavourite = React.memo( ({isAdd=true, onIsModalShow, onDispatchFavourite, queryData }) => {
    //Схема для валидации полей формы
    const schema = Yup.object().shape({
        request: Yup
                .string()
                .required('Обязательное поле!'),
        title: Yup
                .string()
                .required('Обязательное поле!')
                .min(3, 'Слишком короткое')
    });
    //нужные инструменты из react-hook-form
    const { register, errors, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    console.log(errors);
    //получаем реф на форму
    const formRef = React.useRef();
    //функция скрытия модального окна
    const closeModal = () => {
        formRef.current.reset();
        onIsModalShow(false);
    }

    //Функция обработки при отправке формы
    const onSubmit = data => {
        console.log(data);
        // data.id = favouriteItem.id;
        onDispatchFavourite(data);
        closeModal();
    }
    
    //Состояние для значения инпута range
    const [ value, setValue ] = React.useState(queryData?.ranger || 25);
    //Обработчик изменения инпута range
    const handleChange = (event) => {
        setValue(event.target.value);
        //функция для правильного отображения стилей
        helper.multyColorRange(event);
    }
    //состояние для выбора option в выпадающем списке
    const [selected, setSelected] = React.useState('')
    const setChoose = (event) => setSelected( event.target.value );
    return (
        <div className={ cn('modal', 'overlay') }>
            <div className="modal__window">
                <h4>{isAdd ? 'Сохранить запрос' : 'Изменить запрос'}</h4>
                <form onSubmit={ handleSubmit(onSubmit) } ref={formRef} >
                    <div className="form__input">
                        <p>Запрос</p>
                        {/* <input type="text" name="request" defaultValue={favouriteItem?.request} ref={register} disabled /> */}
                        <input type="text" name="request" defaultValue={queryData.request} ref={register} readOnly={isAdd} />
                        { <p className="form__input_error">{errors.request?.message}</p> }
                    </div>
                    <div className="form__input">
                        <p><i>*</i>Название</p>
                        <input type="text" name="title" defaultValue={queryData?.title} placeholder="Укажите название" ref={register} />
                        { <p className="form__input_error">{errors.title?.message}</p> }
                    </div>
                    <div className="form__input">
                        <select name="sort" 
                                ref={register}
                                value={queryData?.sort || selected}
                                onChange={setChoose}
                                className={cn({ 'selected': !!selected})}
                            >
                            <option className="input-disabled" disabled value="">Сортировать по</option>
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
                        <Button type="submit" className="button--fill">Сохранять</Button>
                    </div>
                </form>
            </div>
        </div>
    )
})

ModalFavourite.propTypes = {
    queryData: PropTypes.object,
    onIsModalShow: PropTypes.func.isRequired,
    onDispatсhFavourite: PropTypes.func
}

export default ModalFavourite;