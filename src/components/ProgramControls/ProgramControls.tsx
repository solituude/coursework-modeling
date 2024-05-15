import React, {useEffect} from "react";
import {observer} from "mobx-react";
import store from "../../store/store";
import s from './programControls.module.scss';

const ProgramControls: React.FC = (observer(() => {
    useEffect(() => {
        store.binaryToDecimalUI("C", store.binCInProcess)
    }, [store._C]);
    return (
        <div className={s.content}>
            <div className={s.box}>
                Режим выполнения
                <form className={s.box}>
                    <div className={s.box__item}>
                        <label htmlFor={"auto"}>Автоматический</label>
                        <input id={"auto"} type={"radio"} checked={store.autoModeling}
                               onChange={() => store.changeExecutionMode("auto")}/>
                    </div>
                    <div className={s.box__item}>
                        <label htmlFor={"step"}>Пошаговый</label>
                        <input id={"step"} type={"radio"} checked={!store.autoModeling}
                               onChange={() => store.changeExecutionMode("step")}/>
                    </div>

                </form>
            </div>

            <div>
                Уровень моделирования ОУ
                <form className={s.box}>
                    <div className={s.box__item}>
                        <label htmlFor={"MP"}>Микропрограмма</label>
                        <input id={"MP"} type={"radio"} checked={false}/>
                    </div>
                    <div className={s.box__item}>
                        <label htmlFor={"UA_OA"}>Взаимодействие УА и ОА</label>
                        <input id={"UA_OA"} type={"radio"} checked={false}/>
                    </div>


                </form>

            </div>

            <div>
                Управление вычислением
                <div className={s.box__item}>
                    <button onClick={() => {
                        store.decimalToBinaryUI();
                        store.programStep();
                        store.decimalToBinaryUI();
                    }}>Пуск</button>
                    <button>Сброс</button>
                </div>
            </div>

            <div>
                Результат: <input value={store.UI_C}/>

            </div>
        </div>
    )
}))

export default ProgramControls;