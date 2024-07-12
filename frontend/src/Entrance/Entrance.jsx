import style from "./entrance.module.css"

const Entrance = () => {

    return (
        <div>
            <div className={style.form}>
            <p>Создать аккаунт</p>
                <form  className={style.reg}>
                    <input type='text' autocomplete="on" placeholder="Имя"></input>
                    <input type='email' autocomplete="on" placeholder="Почта"></input>
                    <input type="password" autocomplete="on" placeholder="Пароль"></input>
                    <button className={style.subButton}>Регистрация</button>
                </form>
            </div>
        </div> 
    )
};
export default Entrance;