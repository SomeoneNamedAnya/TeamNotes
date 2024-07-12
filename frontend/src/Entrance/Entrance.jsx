import style from "./entrance.module.css"

const Entrance = () => {

    const formHandler = async () => {
        const data = await (await fetch('http://localhost:3005/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: 'some@email.ru'
            })
        })).json();

        console.log(data);

    }

    return (
        <div>
            <div className={style.form}>
            <p>Создать аккаунт</p>
                <form  className={style.reg}>
                    <input type='text' autocomplete="on" placeholder="Имя"></input>
                    <input type='email' autocomplete="on" placeholder="Почта"></input>
                    <input type="password" autocomplete="on" placeholder="Пароль"></input>
                    <button className={style.subButton} onClick={formHandler} type="button">Регистрация</button>
                </form>
            </div>
        </div> 
    )
};
export default Entrance;