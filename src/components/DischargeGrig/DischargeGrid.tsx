import React, {useEffect} from "react";
import {observer} from "mobx-react";
import store from "../../store/store";

const DischargeGrid: React.FC = (observer(() => {
    // useEffect(() => {
    //     store.decimalToBinaryUI(store.UI_A, store.binA);
    //     store.decimalToBinaryUI(store.UI_B, store.binB);
    // }, []);


    return (
        <div>
            <div>
                Исходные данные

                <div>
                    Делимое
                    <div>
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

                <div>
                    Делитель
                    <div>
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
                                    store.binB.map((bit, index) => (
                                        <td onClick={() => {
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


            <div>
                Ход вычисления
                <div>
                    Регистр делимого
                    <div>
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
                <div>
                    Регистр делителя
                    <div>
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

                <div>
                    Регистр частного
                    <div>
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
            </div>
        </div>

    )
}))

export default DischargeGrid;