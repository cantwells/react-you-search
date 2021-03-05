import { useSelector } from "react-redux";

const Favourite = () => {
    const items = useSelector(({favourites}) => favourites.items)
    return (
        <main className="main main-favourits">
            <h2>Избранное</h2>
            <div className="favourits">
                {
                    items.map( item => (
                        <div className="item">
                            <div className="item__title">{item.request}</div>
                            <div className="item__edit">
                                <span>Изменить</span>
                                <span className="item__edit-del">Удалить</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default Favourite;