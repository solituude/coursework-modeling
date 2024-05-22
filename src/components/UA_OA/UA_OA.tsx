import React from "react";
import {observer} from "mobx-react";
import struct from '../../img/struct.drawio.png';
import store from "../../store/store";
import s from './uaoa.module.scss';
import ProgramControls from "../ProgramControls/ProgramControls";

const UA_OA: React.FC = (observer(() => {
    return(
        <div className={s.container}>
            <img className={s.img} src={struct}/>
            <div className={s.q}>
                <div>
                    <label htmlFor="0">Q0</label>
                    <input id="0"  readOnly={true} type={"checkbox"} checked={store._Q[0]}/>
                </div>
                <div>
                    <label  htmlFor="1">Q1</label>
                    <input id="1" readOnly={true} type={"checkbox"} checked={store._Q[1]}/>
                </div>
                <div>
                    <label  htmlFor="2">Q2</label>
                    <input id="2" readOnly={true} type={"checkbox"} checked={store._Q[2]}/>
                </div>
                <div>
                    <label  htmlFor="3">Q3</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._Q[3]}/>
                </div>
            </div>

            <div className={s.a}>
                <div>
                    <label  htmlFor="0">a0</label>
                    <input id="0"  readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 0}/>
                </div>
                <div>
                    <label  htmlFor="1">a1</label>
                    <input id="1" readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 1}/>
                </div>
                <div>
                    <label  htmlFor="2">a2</label>
                    <input id="2" readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 2}/>
                </div>
                <div>
                    <label  htmlFor="3">a3</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 3}/>
                </div>
                <div>
                    <label  htmlFor="3">a4</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 4}/>
                </div>
            </div>
            <div className={s.a}>
                <div>
                    <label  htmlFor="0">a5</label>
                    <input id="0"  readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 5}/>
                </div>
                <div>
                    <label  htmlFor="2">a6</label>
                    <input id="2" readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 6}/>
                </div>
                <div>
                    <label  htmlFor="3">a7</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 7}/>
                </div>
                <div>
                    <label  htmlFor="3">a8</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={!store.isMP && store._aTransition === 8}/>
                </div>
            </div>

            <div className={s.d}>
                <div>
                    <label  htmlFor="0">D0</label>
                    <input id="0"  readOnly={true} type={"checkbox"} checked={store._D[0]}/>
                </div>
                <div>
                    <label  htmlFor="2">D1</label>
                    <input id="2" readOnly={true} type={"checkbox"} checked={store._D[1]}/>
                </div>
                <div>
                    <label  htmlFor="3">D2</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._D[2]}/>
                </div>
                <div>
                    <label  htmlFor="3">D3</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._D[3]}/>
                </div>
            </div>

            <div className={s.x}>
                <div>
                    <label  htmlFor="0">x0</label>
                    <input id="0"  readOnly={true} type={"checkbox"} checked={store._x[0]}/>
                </div>
                <div>
                    <label  htmlFor="2">x1</label>
                    <input id="2" readOnly={true} type={"checkbox"} checked={store._x[1]}/>
                </div>
                <div>
                    <label  htmlFor="3">x2</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._x[2]}/>
                </div>
                <div>
                    <label  htmlFor="3">x3</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._x[3]}/>
                </div>
                <div>
                    <label  htmlFor="3">x4</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._x[4]}/>
                </div>
                <div>
                    <label  htmlFor="3">x5</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._x[5]}/>
                </div>
                <div>
                    <label  htmlFor="3">x6</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._x[6]}/>
                </div>
            </div>


            <div className={s.y}>

                <div>
                    <label  htmlFor="2">y1</label>
                    <input id="2" readOnly={true} type={"checkbox"} checked={store._y[1]}/>
                </div>
                <div>
                    <label  htmlFor="3">y2</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[2]}/>
                </div>
                <div>
                    <label  htmlFor="3">y3</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[3]}/>
                </div>
                <div>
                    <label  htmlFor="3">y4</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[4]}/>
                </div>
                <div>
                    <label  htmlFor="3">y5</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[5]}/>
                </div>
                <div>
                    <label  htmlFor="3">y6</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[6]}/>
                </div>
            </div>
            <div className={s.y}>

                <div>
                    <label  htmlFor="2">y7</label>
                    <input id="2" readOnly={true} type={"checkbox"} checked={store._y[7]}/>
                </div>
                <div>
                    <label  htmlFor="3">y8</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[8]}/>
                </div>
                <div>
                    <label  htmlFor="3">y9</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[9]}/>
                </div>
                <div>
                    <label  htmlFor="3">y10</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[10]}/>
                </div>
                <div>
                    <label  htmlFor="3">y11</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[11]}/>
                </div>
                <div>
                    <label  htmlFor="3">y12</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[12]}/>
                </div>
                <div>
                    <label  htmlFor="3">y13</label>
                    <input id="3" readOnly={true} type={"checkbox"} checked={store._y[13]}/>
                </div>
            </div>
            <div className={s.xS}>
                <div>
                    <label  htmlFor="0">x2</label>
                    <input id="0"  readOnly={true} type={"checkbox"} checked={store._xPLU[2]}/>
                </div>
                <div>
                    <label  htmlFor="0">x3</label>
                    <input id="0"  readOnly={true} type={"checkbox"} checked={store._xPLU[3]}/>
                </div>
            </div>
            {/*<ProgramControls/>*/}
        </div>

    )
}))

export default UA_OA;