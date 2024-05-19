import React, {useEffect} from "react";
import {observer} from "mobx-react";
import store from "../../store/store";
import s from './programControls.module.scss';

const ProgramControls: React.FC = (observer(() => {
    useEffect(() => {
        store.binaryToDecimalUI("C", store.binCInProcess)
    }, [store._C]);
    useEffect(() => {
        store.binCH = new Array(4)
        let temp: number = store._CH;
        for (let i = 3; i >= 0; i--) {
            store.binCH[i] = temp % 2;
            temp >>= 1;
        }
    }, [store._CH]);
    return (
        <div className={s.content}>
            <div className={s.box}>
                <b>Режим выполнения</b>
                <form className={s.box}>
                    <div className={s.box__item}>
                        <input id={"auto"} type={"radio"} checked={store.autoModeling}
                               onChange={() => {
                                   store.changeExecutionMode("auto")
                                   store.chg()
                               }}/>
                        <label htmlFor={"auto"}>Автоматический</label>
                    </div>
                    <div className={s.box__item}>
                        <input id={"step"} type={"radio"} checked={!store.autoModeling}
                               onChange={() => {
                                   store.changeExecutionMode("step")
                                   store.chg();
                               }}/>
                        <label htmlFor={"step"}>Пошаговый</label>
                    </div>

                </form>
            </div>

            <div>
                <b>Уровень моделирования ОУ</b>
                <form className={s.box}>
                    <div className={s.box__item}>
                        <input id={"MP"} type={"radio"} checked={store.isMP} onChange={() => store.changeStageModeling("MP")}/>
                        <label htmlFor={"MP"}>Микропрограмма</label>
                    </div>
                    <div className={s.box__item}>
                        <input id={"UA_OA"} type={"radio"} checked={!store.isMP} onChange={() => store.changeStageModeling("UA_OA")}/>
                        <label htmlFor={"UA_OA"}>Взаимодействие УА и ОА</label>
                    </div>
                </form>

            </div>

            <div>
                <b>Управление вычислением</b>
                <div className={s.box__item}>
                    <button disabled={store.success} onClick={() => {
                        if (store.autoModeling) {
                            store.decimalToBinaryUI();
                            if (store.isMP) {
                                store.autoModelingMode();
                            } else {
                                store.runStep()
                                store.autoUAMode();
                            }
                            store.decimalToBinaryUI();
                            store.chg()
                        } else {
                            store.chg()
                            store.decimalToBinaryUI();
                            if (store.isMP) {
                                store.programStep();
                            } else {
                                store.runStep()
                                store.UAOAStep();
                            }
                            store.decimalToBinaryUI();
                        }
                    }}>
                        {
                            store.autoModeling ? <span>Пуск</span> : <span>Такт</span>
                        }
                    </button>
                    <button onClick={() => window.location.reload()}>
                        Сброс
                    </button>
                </div>
            </div>

            {
                store.success ? <div>
                    Программа закончила свою работу
                </div> : null
            }


            <div>
                Результат: <input value={store._PP ? "Переполнение" : store.UI_C}/>
            </div>

            <div>
                Счетчик:
                <table>
                    <thead>
                    <tr><th>3</th> <th>2</th> <th>1</th> <th>0</th></tr>
                    </thead>
                    <tbody>
                    <tr>
                        {
                            store.binCH.map((item) => (
                                <td>{item}</td>
                            ))
                        }
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}))

export default ProgramControls;