import { Link } from "react-router-dom"

const Nomatch = () => {
    return (
        <div className="wrapper wrapper__nomatch">
            <h1>404! Страница не найдена!</h1>
            <p className="gohome"><Link to="/">Вернуться на главную</Link></p>
        </div>
    )
}

export default Nomatch;