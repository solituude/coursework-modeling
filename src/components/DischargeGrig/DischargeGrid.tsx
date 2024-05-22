import React from "react";
import {observer} from "mobx-react";
import store from "../../store/store";
import s from './dischargegrid.module.scss';

const DischargeGrid: React.FC = (observer(() => {
    return (
        <div className={s.content}>
            <div className={s.initial}>
                <span><b>Исходные данные</b></span>

                <div className={s.d1}>
                    Делимое A
                    <div className={s.container}>
                        <span style={{fontSize: "22px"}}><b style={{fontSize: "24px"}}>. </b></span>
                        <table>
                            <thead>
                            <tr>
                                <th>15</th>
                                <th>14</th>
                                <th>13</th>
                                <th>12</th>
                                <th>11</th>
                                <th>10</th>
                                <th>9</th>
                                <th>8</th>
                                <th>7</th>
                                <th>6</th>
                                <th>5</th>
                                <th>4</th>
                                <th>3</th>
                                <th>2</th>
                                <th>1</th>
                                <th>0</th>
                            </tr>
                            </thead>
                            <tr>
                                {
                                    store.binA.map((bit, index) => (
                                        <td onClick={() => {
                                            if (!store.run)
                                                store.reverseBit("A", index)
                                            // console.log(index)
                                        }
                                        }>{bit}</td>
                                    ))
                                }
                            </tr>
                        </table>
                    </div>
                    <div>A<sub>10</sub> = <input value={store.UI_A}/></div>
                </div>

                <div className={s.d2}>
                    Делитель B
                    <div className={s.container}>
                        <span style={{fontSize: "22px"}}><b style={{fontSize: "24px"}}>. </b></span>
                        <table>
                            <thead>
                            <tr>
                                <th>15</th>
                                <th>14</th>
                                <th>13</th>
                                <th>12</th>
                                <th>11</th>
                                <th>10</th>
                                <th>9</th>
                                <th>8</th>
                                <th>7</th>
                                <th>6</th>
                                <th>5</th>
                                <th>4</th>
                                <th>3</th>
                                <th>2</th>
                                <th>1</th>
                                <th>0</th>
                            </tr>
                            </thead>
                            <tr>
                                {
                                    store.binB.map((bit, index) => (
                                        <td onClick={() => {
                                            if (!store.run)
                                                store.reverseBit("B", index)
                                            // console.log(index)
                                        }
                                        }>{bit}</td>
                                    ))
                                }
                            </tr>
                        </table>
                    </div>
                    <div>B<sub>10</sub> = <input value={store.UI_B}/></div>
                </div>
            </div>


            <div className={s.box}>
                <b>Ход вычисления</b>
                <div className={s.d1}>
                    Регистр делимого A
                    <div className={s.container}>
                        <span style={{fontSize: "22px"}}><b style={{fontSize: "24px"}}>. </b></span>
                        <table>
                            <thead>
                            <tr>
                                <th>15</th>
                                <th>14</th>
                                <th>13</th>
                                <th>12</th>
                                <th>11</th>
                                <th>10</th>
                                <th>9</th>
                                <th>8</th>
                                <th>7</th>
                                <th>6</th>
                                <th>5</th>
                                <th>4</th>
                                <th>3</th>
                                <th>2</th>
                                <th>1</th>
                                <th>0</th>
                            </tr>
                            </thead>
                            <tr>
                                {
                                    store.binAInProcess.map((bit) => (
                                        <td>{bit}</td>
                                    ))
                                }
                            </tr>
                        </table>
                    </div>
                </div>
                <div className={s.d2}>
                    Регистр делителя B
                    <div className={s.container}>
                        <span style={{fontSize: "22px"}}><b style={{fontSize: "24px"}}>. </b></span>
                        <table>
                            <thead>
                            <tr>
                                <th>16</th>
                                <th>15</th>
                                <th>14</th>
                                <th>13</th>
                                <th>12</th>
                                <th>11</th>
                                <th>10</th>
                                <th>9</th>
                                <th>8</th>
                                <th>7</th>
                                <th>6</th>
                                <th>5</th>
                                <th>4</th>
                                <th>3</th>
                                <th>2</th>
                                <th>1</th>
                                <th>0</th>
                            </tr>
                            </thead>
                            <tr>
                                {
                                    store.binBInProcess.map((bit) => (
                                        <td>{bit}</td>
                                    ))
                                }
                            </tr>
                        </table>
                    </div>
                </div>

                <div className={s.d3}>
                    Регистр частного C
                    <div className={s.container}>
                        <span style={{fontSize: "22px"}}><b style={{fontSize: "24px"}}>. </b></span>
                        <table>
                            <thead>
                            <tr>
                                <th>16</th>
                                <th>15</th>
                                <th>14</th>
                                <th>13</th>
                                <th>12</th>
                                <th>11</th>
                                <th>10</th>
                                <th>9</th>
                                <th>8</th>
                                <th>7</th>
                                <th>6</th>
                                <th>5</th>
                                <th>4</th>
                                <th>3</th>
                                <th>2</th>
                                <th>1</th>
                                <th>0</th>
                            </tr>
                            </thead>
                            <tr>
                                {
                                    store.binCInProcess.map((bit) => (
                                        <td>{bit}</td>
                                    ))
                                }
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    C <sub>10</sub> = <input value={store._PP ? "Переполнение" : store.UI_C}/>
                </div>

                {/*<div className={s.d1}>*/}
                {/*    <span>Счетчик:</span>*/}
                {/*    <div className={s.container} style={{marginLeft: 8}}>*/}
                {/*        <table>*/}
                {/*            <thead>*/}
                {/*            <tr><th>3</th> <th>2</th> <th>1</th> <th>0</th></tr>*/}
                {/*            </thead>*/}
                {/*            <tbody>*/}
                {/*            <tr>*/}
                {/*                {*/}
                {/*                    store.binCH.map((item) => (*/}
                {/*                        <td>{item}</td>*/}
                {/*                    ))*/}
                {/*                }*/}
                {/*            </tr>*/}
                {/*            </tbody>*/}
                {/*        </table>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>

    )
}))

export default DischargeGrid;