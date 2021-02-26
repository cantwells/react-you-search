const Favourite = () => {
    return (
        <main className="main main-favourits">
            <h2>Избранное</h2>
            <div className="favourits">
                <div className="item">
                    <div className="item__title">чем кормить кота</div>
                    <div className="item__edit">
                        <span>Изменить</span>
                        <span className="item__edit-del">Удалить</span>
                    </div>
                </div>
                <div className="item">
                    <div className="item__title">видео</div>
                    <div className="item__edit">
                        <span>Изменить</span>
                        <span className="item__edit-del">Удалить</span>
                    </div>
                </div>
                <div className="item">
                    <div className="item__title">bad bunny</div>
                    <div className="item__edit">
                        <span>Изменить</span>
                        <span className="item__edit-del">Удалить</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Favourite;