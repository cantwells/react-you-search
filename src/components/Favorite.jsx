const Favourite = () => {
    return (
        <main class="main main-favourits">
            <h2>Избранное</h2>
            <div class="favourits">
                <div class="item">
                    <div class="item__title">чем кормить кота</div>
                    <div class="item__edit">
                        <span>Изменить</span>
                        <span class="item__edit-del">Удалить</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item__title">видео</div>
                    <div class="item__edit">
                        <span>Изменить</span>
                        <span class="item__edit-del">Удалить</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item__title">bad bunny</div>
                    <div class="item__edit">
                        <span>Изменить</span>
                        <span class="item__edit-del">Удалить</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Favourite;