import { makeAutoObservable } from "mobx";
import {xMBC} from "./types";

class Store{
    _B: number = 0;
    _A: number = 0;
    _C: number = 0;
    _CH: number = 0;
    _PP: boolean = false;
    _Q: boolean[] = new Array(4).fill(false);
    _D: boolean[] = new Array(4);
    _x: boolean[] = new Array(7).fill(false);
    _y: boolean[] = new Array(14);
    _aTransition: number = 0;

    binA: number[] = new Array(16).fill(0); // представление исходного числа А в двоичной форме
    binB: number[] = new Array(16).fill(0); // представление исходного числа В в двоичной форме

    binCH: number[] = new Array(4); // представление счетчика в двоичной форме

    UI_A: number = 0; // от 0 до 1
    UI_B: number = 0; // от 0 до 1
    UI_C: number = 0; // от 0 до 1

    binBInProcess: number[] = new Array(17).fill(0);
    binAInProcess: number[] = new Array(16).fill(0);
    binCInProcess: number[] = new Array(17).fill(0);

    autoModeling: boolean = false;
    run: boolean = false;
    success: boolean = false;

    isMP: boolean = true;

    _buffA: number = 0;
    _buffB: number = 0;
    _buffC: number = 0;
    _xPLU: boolean[] = new Array(7).fill(false);

    constructor() {
        makeAutoObservable(this);
    }


    // перевод чисел из десятичной системы в двоичную
    decimalToBinaryUI(): void {
        let fraction = this._A;
        for (let i = 1; i < this.binAInProcess.length; i++) {
            let bit = fraction % 2;
            this.binAInProcess[this.binAInProcess.length - i] = bit;
            fraction = fraction >> 1;
        }
        this.binAInProcess[0] = this.binA[0];


        fraction = this._B;
        for (let i = 1; i < this.binBInProcess.length; i++) {
            let bit = fraction % 2;
            this.binBInProcess[this.binBInProcess.length - i] = bit;
            fraction = fraction >> 1;
        }
        this.binBInProcess[0] = this.binB[0];

        fraction = this._C;
        for (let i = 1; i <= this.binCInProcess.length; i++) {
            let bit = (fraction % 2);
            this.binCInProcess[this.binCInProcess.length - i] = bit;
            fraction = fraction >> 1;
        }

    }


    binaryToDecimal(nameDecimal: string, arr: number[]): void {
        let result = 0;
        let power = 1;
        for (let i = arr.length - 1; i >= 1; i--) {
            result += arr[i] * power;
            power <<= 1;
        }
        switch (nameDecimal) {
            case "A":
                this._A = result;
                break;
            case "B":
                this._B = result;
                break;
        }
        console.log(result);
    }

    // перевод из двоичной в десятичную
    binaryToDecimalUI(nameDecimal: string, arr: number[]): void {
        let decimal = 0;
        for (let i = 1; i < arr.length; i++) {

            let powerOfTwo = 1;
            for (let p = 0; p < i; p++) {
                powerOfTwo *= 0.5;
            }
            decimal += arr[i] * powerOfTwo;
        }
        if (arr[0] === 1) decimal *= -1;
        switch (nameDecimal) {
            case "A":
                this.UI_A = decimal;
                break;
            case "B":
                this.UI_B = decimal;
                break;
            case "C":
                this.UI_C = decimal;
                break;
        }
    }


    programStep(): void {
        if (this.success) return;

        this.run = true;
        switch (this._aTransition){
            case 0:
                if (this.run) {
                    this._C = this.y1();
                    this._A = this.y2();

                    this._aTransition = 1;
                }
                break;

            case 1:
                let rslX1: boolean = this.x1();
                let rslX2: boolean = this.x2();
                if (!rslX1 && rslX2) {
                    this._aTransition = 0;
                    this.run = false;
                }
                else if (rslX1) {
                    this.y13();
                    this._aTransition = 0;
                    this.success = true;
                    this.run = false;
                }
                else if (!rslX1 && !rslX2) {
                    this._C = this.y3();
                    this._aTransition = 2;
                }
                break;

            case 2:
                if (this.x3()) {
                    this._C = this.y7();
                    this._aTransition = 3;
                } else {
                    this.y13();
                    this._aTransition = 0;
                    this.success = true;
                    this.run = false;
                }
                console.log(this._aTransition)
                break;

            case 3:
                this._C = this.y4();
                this.y5();
                this._B = this.y6();
                this._aTransition = 4;
                break;

            case 4:
                if (this.x3()) {
                    this._C = this.y7();
                } else {
                    this._C = this.y3();
                }
                this._aTransition = 5;
                break;
            case 5:
                this._B = this.y8();
                this._C = this.y4();
                this.y9();
                this._aTransition = 6;
                break;
            case 6:
                if (this.x4()) {
                    this._C = this.y10();
                    this._aTransition = 7;
                } else {
                    this._aTransition = 4;
                }
                break;

            case 7:
                if (this.x5())
                    this._C = this.y11();
                this._aTransition = 8;
                break;
            case 8:
                if (this.x6())
                    this._C = this.y12();
                this._aTransition = 0;
                this.success = true;
                this.run = false;
                break;
        }
    }

    autoModelingMode(): void {
        while(!this.success) {
            this.programStep();
        }
    }

    // ПЛУ
    PLU(): void {
        this._x[0] = this.run;
        this._xPLU[2] = this._x[2]; // сохраняю х2
        this._xPLU[3] = this._x[3]; // сохраняю х3
    }

    // КС Y
    csY(): void {
        let a: boolean[] = new Array(9).fill(false);

        a[this._aTransition] = true;
        this._y[1] = a[0] && this._x[0];
        this._y[2] = a[0] && this._x[0];
        this._y[3] = (a[1] && !this._x[1] && !this._xPLU[2]) || (a[4] && !this._xPLU[3]);
        this._y[4] = a[3] || a[5];
        this._y[5] = a[3];
        this._y[6] = a[3];
        this._y[7] = (a[2] && this._xPLU[3]) || (a[4] && this._xPLU[3]);
        this._y[8] = a[5];
        this._y[9] = a[5];
        this._y[10] = a[6] && this._x[4];
        this._y[11] = a[7] && this._x[5];
        this._y[12] = a[8] && this._x[6];
        this._y[13] = (a[1] && this._x[1]) || (a[2] && !this._xPLU[3]);
    }

    // Операционный автомат
    OA(): void {
        if (this._y[1]) this._buffC = this.y1();
        if (this._y[2]) this._buffA = this.y2();
        if (this._y[3]) this._buffC = this.y3();
        if (this._y[4]) this._buffC = this.y4();
        if (this._y[5]) this.y5();
        if (this._y[6]) this._buffB = this.y6();
        if (this._y[7]) this._buffC = this.y7();
        if (this._y[8]) this._buffB = this.y8();
        if (this._y[9]) this.y9();
        if (this._y[10]) this._buffC = this.y10();
        if (this._y[11]) this._buffC = this.y11();
        if (this._y[12]) this._buffC = this.y12();
        if (this._y[13]) this.y13();

        this._A = this._buffA;
        this._B = this._buffB;
        this._C = this._buffC;

        this.checkX();
    }


    checkX(): void {
        this._x[0] = this.x0();
        this._x[1] = this.x1();
        this._x[2] = this.x2();
        this._x[3] = this.x3();
        this._x[4] = this.x4();
        this._x[5] = this.x5();
        this._x[6] = this.x6();
    }

    // Дешифратор
    DC(): void {
        if      (!this._Q[3] && !this._Q[2] && !this._Q[1] && !this._Q[0]) this._aTransition = 0;
        else if ( this._Q[3] && !this._Q[2] && !this._Q[1] &&  this._Q[0]) this._aTransition = 1;
        else if (!this._Q[3] &&  this._Q[2] &&  this._Q[1] && !this._Q[0]) this._aTransition = 2;
        else if (!this._Q[3] && !this._Q[2] &&  this._Q[1] &&  this._Q[0]) this._aTransition = 3;
        else if (!this._Q[3] && !this._Q[2] && !this._Q[1] &&  this._Q[0]) this._aTransition = 4;
        else if (!this._Q[3] && !this._Q[2] &&  this._Q[1] && !this._Q[0]) this._aTransition = 5;
        else if ( this._Q[3] && !this._Q[2] && !this._Q[1] && !this._Q[0]) this._aTransition = 6;
        else if ( this._Q[3] &&  this._Q[2] && !this._Q[1] && !this._Q[0]) this._aTransition = 7;
        else if (!this._Q[3] &&  this._Q[2] && !this._Q[1] && !this._Q[0]) this._aTransition = 8;
    }

    // КС D
    csD(): void {
        let a: boolean[] = new Array(9).fill(false);
        a[this._aTransition] = true;
        this._D[0] = (a[0] && this.run) || (a[2] && this._xPLU[3]) || a[3] || (a[6] && !this._x[4]);
        this._D[1] = (a[1] && !this._x[1] && !this._xPLU[2]) || (a[2] && this._xPLU[3]) || a[4];
        this._D[2] = (a[1] && !this._x[1] && !this._xPLU[2]) || (a[6] && this._x[4]) || a[7];
        this._D[3] = (a[0] && this.run) || a[5] || (a[6] && this._x[4]);
    }

    // ПС
    toPS(): void {
        this._Q = [...this._D];
    }

    UAOAStep(): void {
        if (!this.end()){
            this.success = true;
            return;
        }
        this.PLU();
        this.toPS();
        this.DC();
        this.csY();
        this.OA();
        this.csD();

    }

    autoUAMode(): void {
        while(!this.success) {
            this.UAOAStep();
        }
    }


    // Микрооперации
    y1(): number {
        // С:=А(14:0)
        return this._A & 0x7fff;
    }

    y2(): number {
        //A(14:0):=B(14:0)
        return (this._A & 0x8000) | (this._B & 0x7fff);

    }

    y3(): number {
        //C:=C+11.-A(14:0)+1
        let temp = ((this._A & 0x7fff)^0x7fff)
        temp = this._C + (temp | 0x18000) + 1;
        return temp & 0x1ffff;
    }

    y4(): number {
        // С:=L1(C.0)
        return (this._C << 1) & 0x1ffff;
    }

    y5(): void {
        // Сч:=0
        this._CH = 0;
    }

    y6(): number {
        //B(15:0) = 0
        return this._B & 0xffff0000;

    }

    y7(): number {
        // C:=C+A(14:0)
        return (this._C + (this._A & 0x7fff)) & 0x1ffff;
    }

    y8(): number{
        //B(15:0)=L1(B(15:0).-C(16))
        let temp: number = (this._C >> 16) % 2;
        let elderBitsB = this._B & 0x0000ffff;
        elderBitsB <<= 1;
        temp = (temp & 0x1) ^ 0x1;
        elderBitsB = (this._B & 0xffff0000) | elderBitsB;
        return elderBitsB | temp;
    }

    y9(): void {
        // Сч:=Сч-1
        this._CH === 0 ? this._CH = 15 : this._CH--;
    }

    y10(): number {
        //C = B(15:1)
        return (this._B & 0x0000fffe);

    }

    y11(): number {
        // С:=С+1
        return this._C + 1;
    }

    y12(): number {
        // C(16):=1
        return (this._C & 0xffff) + 0x10000;
    }

    y13(): void {
        // ПП:=1
        this._PP = true;
    }


    // Логические условия
    x0(): boolean {
        // Пуск
        return this.run;
    }

    x1(): boolean {
        // A(14:0)=0
        return (this._B & 0x7FFF) === 0;
    }

    x2(): boolean {
        //C=0
        return this._C === 0;
    }

    x3(): boolean {
        //C(16)=1
        return (this._C >> 16) % 2 === 1;
    }

    x4(): boolean {
        // Сч=0
        return this._CH === 0;
    }

    x5(): boolean {
        // B(0)=1
        return this._B % 2 === 1;
    }

    x6(): boolean{
        // A(15)+B(16)=1
        return (this.binAInProcess[0]) !== (this.binBInProcess[0]);
        // return ((this._A >> 15) % 2) !== ((this._B >> 16) % 2);
    }

    end(): boolean {
      return !(!this._D[0] && !this._D[1] && !this._D[2] && !this._D[3] && (this._Q[0] || this._Q[1] || this._Q[2] || this._Q[3]))
    }


    /////////////////////////////// взаимодействие с UI ////////////////////////////////

    reverseBit(nameDecimal: string, index: number) {
        switch (nameDecimal) {
            case "A":
                this.binA[index] = this.binA[index] === 1 ? 0 : 1;
                this.binaryToDecimalUI("A", this.binA);
                this.binaryToDecimal("A", this.binA);

                break;
            case "B":
                this.binB[index] = this.binB[index] === 1 ? 0 : 1;
                this.binaryToDecimalUI("B", this.binB);
                this.binaryToDecimal("B", this.binB);
                break;
        }
    }

    changeExecutionMode(mode: string) {
        switch (mode){
            case "auto":
                this.autoModeling = true;
                break;
            case "step":
                this.autoModeling = false;
                break;
        }
    }

    changeStageModeling(mode: string): void {
        switch (mode){
            case "MP":
                this.isMP = true;
                break;
            case "UA_OA":
                this.isMP = false;
                break;
        }
    }

    chg(): void {
        this._buffA = this._A;
        this._buffB = this._B;
        console.log(this._buffA.toString(2));
    }

    runStep() {
        this.run = true;
    }

}

export default new Store;