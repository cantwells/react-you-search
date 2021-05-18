import React from 'react'
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Button } from '.';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import nextId, {setPrefix} from "react-id-generator";
setPrefix("");

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
    //получаем реф на форму
    const formRef = React.useRef();
    //Состояние для значения инпута range
    const [ value, setValue ] = React.useState(queryData?.amount || 25);
    //функция скрытия модального окна
    const closeModal = () => {
        formRef.current.reset();
        onIsModalShow(false);
    }
    //При ререндеренге записывать данные в об типе сортировке
    React.useEffect(() => {
        if(queryData?.sort){
            setSelected(queryData?.sort)
        }
    }, [queryData])

    //Функция обработки при отправке формы
    const onSubmit = data => {
        data.amount = value;
        onDispatchFavourite(data);
        closeModal();
    }

    //Обработчик изменения инпута range
    const handleChange = (value) => {
        setValue(value);
    }
    
    //состояние для выбора option в выпадающем списке
    const [selected, setSelected] = React.useState('')

    //Обновление поля select
    const setChoose = (event) => setSelected( event.target.value );
    return (
        <div className={ cn('modal', 'overlay') }>
            <div className="modal__window">
                <h4>{isAdd ? 'Сохранить запрос' : 'Изменить запрос'}</h4>
                <form onSubmit={ handleSubmit(onSubmit) } ref={formRef} >
                    <input type="hidden" name="id" defaultValue={queryData?.id || nextId()}  ref={register}/>
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
                                value={selected}
                                onChange={setChoose}
                                className={cn({ 'selected': selected})}
                            >
                            <option className="input-disabled" disabled value="">Сортировать по</option>
                            <option value="title">По названию</option>
                            <option value="date">По дате</option>
                            <option value="rating">По рейтингу</option>
                            <option value="viewCount">По количеству просмотров</option>
                        </select>
                    </div>
                    <div className="form__input">
                        <p>Максимальное количество</p>
                        <div className="range-block">
                            {/* <input name="amount" type="range" min="0" max="50" value={value} step="1" className="ranger" onChange={handleChange} ref={register} /> */}
                            <Slider name="amount" min={0} max={50} step={1} value={value} onChange={handleChange}/>
                            <span className="range-result">{value}</span>    
                        </div>
                    </div>
                    <div className="button-block">
                        <Button type="button" className="button--outline button--save" onClick={closeModal}>Не сохранять</Button>
                        <Button type="submit" className="button--fill button--save">Сохранять</Button>
                    </div>
                </form>
            </div>
        </div>
    )
})

ModalFavourite.propTypes = {
    isAdd: PropTypes.bool,
    queryData: PropTypes.object,
    onIsModalShow: PropTypes.func.isRequired,
    onDispatсhFavourite: PropTypes.func
}

export default ModalFavourite;