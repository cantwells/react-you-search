import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, fetchUsers, resetError } from '../redux/slices/loginSlice';
import { Redirect } from 'react-router';

const schema = yup.object().shape({
    username: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле')
})

const Login = React.memo(() => {
    //получение нужных инструментов из react-hook-form
    const { register, handleSubmit, errors, reset, setError } = useForm({ resolver: yupResolver(schema) })
    const dispatch = useDispatch();
    //получаем данные из стейта
    const {isAuthorized, error} = useSelector(({login}) => login);

    const [ isHide, setIsHide ] = React.useState(true);
    //получаем ссылку на элемент иконки
    const icon = React.useRef();
    //Обработчик изменения вида иконки в ипуте пароля
    const toggleVisiable = () => {
        icon.current.previousElementSibling.focus();
        setIsHide( !isHide );
    }
    //При первой загрузке получаем список разрешенных пользователей
    React.useEffect( () => {
        dispatch(fetchUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    React.useEffect( () => {
        //При появления ошибок из стейта, добавляем их в форму react-hook-form
        if(error){
            setError("password", {
                type: "manual",
                message: error 
            });
            //после чего очищаем error из стейта
            dispatch( resetError() );
        }
    }, [error, setError, dispatch])

    //обработка отправки почты
    const onSubmit = (credentials ) => {
        dispatch( fetchLogin(credentials) );
        reset();
    }
    //перенаправляем в корень в случае правильно авторизации
    if(isAuthorized) return <Redirect to="/" />
    return (
        <div className="wrapper-login">
            <div className="login__logo">
                <svg width="48" height="48" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M59.1488 43.5667L24.683 60.9559V79.399L59.1488 62.0098V43.5667Z" fill="#1390E5"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.683 26.1787L59.1487 43.5679V62.0111L24.683 44.6218V26.1787Z" fill="#1180CB"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M59.1488 8.79071L24.683 26.1799V44.623L59.1488 27.2338V8.79071Z" fill="#35A2EC"/>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="88" height="88" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <p className="login__title">Вход</p>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__field">
                    <label htmlFor="login">Логин</label><br/>
                    <input type="text" 
                            className="form__input" 
                            name="username"
                            ref={register}
                        />
                    <p>{errors.username?.message}</p>
                </div>
                <div className="form__field">
                    <label htmlFor="pass">Пароль</label><br/>
                    <input type={ isHide ? "password" : "text" } 
                            name="password" 
                            className="form__input"
                            ref={register}
                        />
                    <i className="icon" onClick={toggleVisiable} ref={icon}>
                        {
                            isHide 
                                ?   <svg className="icon__img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94ZM9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24002Z" stroke="#D0D0D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 1L23 23" stroke="#D0D0D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                :   <svg className="icon__img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#D0D0D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#D0D0D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                        }
                    </i>
                    <p>{errors.password?.message}</p>
                </div>
                <button className="button button--fill">Войти</button>
            </form>
        </div>
    );
});

export default Login;