import React from "react";
import {observer} from "mobx-react";
import s from './microprogramm.module.scss';
import gsaImg from '../../img/gsa.png';
import store from "../../store/store";

const Microprogramm: React.FC = (observer(() => {
    return(
        <div className={s.content}>
            <div className={s.gsa__container}>
                <label className={s.a0} htmlFor="0">a0</label>
                <input id="0" className={s.a0} checked={store._aTransition === 0} readOnly={true} type={"checkbox"}/>

                <label className={s.a1} htmlFor="1">a1</label>
                <input id="1" className={s.a1} checked={store._aTransition === 1} readOnly={true} type={"checkbox"}/>

                <label className={s.a2} htmlFor="2">a2</label>
                <input id="2" className={s.a2} checked={store._aTransition === 2} readOnly={true} type={"checkbox"}/>

                <label className={s.a3} htmlFor="3">a3</label>
                <input id="3" className={s.a3} checked={store._aTransition === 3} readOnly={true} type={"checkbox"}/>

                <label className={s.a4} htmlFor="4">a4</label>
                <input id="4" className={s.a4} checked={store._aTransition === 4} readOnly={true} type={"checkbox"}/>

                <label className={s.a5} htmlFor="5">a5</label>
                <input id="5" className={s.a5} checked={store._aTransition === 5} readOnly={true} type={"checkbox"}/>

                <label className={s.a6} htmlFor="6">a6</label>
                <input id="6" className={s.a6} checked={store._aTransition === 6} readOnly={true} type={"checkbox"}/>

                <label className={s.a7} htmlFor="7">a7</label>
                <input id="7" className={s.a7} checked={store._aTransition === 7} readOnly={true} type={"checkbox"}/>

                <label className={s.a8} htmlFor="8">a8</label>
                <input id="8" className={s.a8} checked={store._aTransition === 8} readOnly={true} type={"checkbox"}/>

                <label className={s.a9} htmlFor="9">a0</label>
                <input id="9" className={s.a9} checked={store._aTransition === 0 && store.success} readOnly={true} type={"checkbox"}/>

                <img src={gsaImg} alt={"gsa"} width={600}/>
            </div>
        </div>

    )
}))

export default Microprogramm;