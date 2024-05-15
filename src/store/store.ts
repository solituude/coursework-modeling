import { makeAutoObservable } from "mobx";
import {xMBC} from "./types";

class Store{
    _B: number = 0;
    _A: number = 0;
    _C: number = 0;
    _CH: number = 0;
    _PP: boolean = false;
    _Q: number[] = new Array(4);
    _D: number[] = new Array(4);
    _x: number[] = new Array(6);
    _y: number[] = new Array(12);
    _aCondition: number = 0;
    _codeACondition: boolean[] = new Array(4);
    _codeD: boolean[] = new Array(4);

    binA: number[] = new Array(16).fill(0);
    binB: number[] = new Array(17).fill(0);
    binC: number[] = new Array(17).fill(0);
    binCH: number[] = new Array(4);

    UI_A: number = 0; // от 0 до 1
    UI_B: number = 0; // от 0 до 1
    UI_C: number = 0; // от 0 до 1

    binBInProcess: number[] = new Array(17).fill(0);
    binAInProcess: number[] = new Array(16).fill(0);
    binCInProcess: number[] = new Array(17).fill(0);

    autoModeling: boolean = false;
    run: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }



    // перевод чисел из десятичной системы в двоичную
    decimalToBinaryUI(): void {
        let fraction = this._A;
        for (let i = 1; i < this.binAInProcess.length; i++) {
            let bit = fraction % 2;
            this.binAInProcess[this.binAInProcess.length - i] = bit >= 0 ? bit : 0;
            fraction = Math.floor(fraction / 2);
        }
        if (this._A < 0) {
            this.binAInProcess[0] = 1;
        }

        fraction = this._B;
        for (let i = 1; i < this.binBInProcess.length; i++) {
            let bit = fraction % 2;
            this.binBInProcess[this.binBInProcess.length - i] = bit >= 0 ? bit : 0;
            fraction = Math.floor(fraction / 2);
        }
        if (this._B < 0) {
            this.binBInProcess[0] = 1;
        }

        fraction = this._C;
        for (let i = 1; i <= this.binCInProcess.length; i++) {
            let bit = (fraction % 2);
            this.binCInProcess[this.binCInProcess.length - i] = bit;
            fraction = Math.floor(fraction / 2);
        }

    }


    binaryToDecimal(nameDecimal: string, arr: number[]): void {
        let result = 0;
        let power = 1;
        for (let i = arr.length - 1; i >= 1; i--) {
            result += arr[i] * power;
            power *= 2;
        }
        if (arr[0] === 1) {
            result *= -1;
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

    // перепод из двоичной в десятичную
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
        // console.log(arr);
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
        this.run = true;
        switch (this._aCondition){
            case 0:
                if (this.run) {
                    this.y1(); this.y2();
                    this._aCondition = 1;
                }
                break;

            case 1:
                let rslX1: boolean = this.x1();
                let rslX2: boolean = this.x2();
                console.log('fklf')
                if (!rslX1 && rslX2) {
                    this._aCondition = 0;
                    this.run = false;
                    console.log('ээээ')
                }
                else if (rslX1) {
                    this.y13();
                    this._aCondition = 0;
                    this.run = false;
                    console.log('ээээ!!!')
                }
                else if (!rslX1 && !rslX2) {
                    this.y3();
                    this._aCondition = 2;
                    console.log('норм')
                }
                break;

            case 2:
                if (this.x3()) {
                    this.y7();
                    this._aCondition = 3;
                } else {
                    this.y13();
                    this._aCondition = 0;
                    this.run = false;
                }
                break;

            case 3:
                this.y4();
                this.y5();
                this.y6();
                this._aCondition = 4;
                break;

            case 4:
                if (this.x3()) {
                    console.log('норм')
                    this.y7();
                } else {
                    this.y3();
                }
                this._aCondition = 5;
                break;
            case 5:
                this.y8();
                this.y4();
                this.y9();
                this._aCondition = 6;
                break;
            case 6:
                if (this.x4()) {
                    this.y10();
                    this._aCondition = 7;
                } else {
                    this._aCondition = 4;
                }
                break;

            case 7:
                if (this.x5()) this.y11();
                this._aCondition = 8;
                break;
            case 8:
                if (this.x6()) this.y12();
                this._aCondition = 0;
                console.log(this._C);
                this.run = false;
                break;
        }
    }

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



    y1(): void {
        this._C = this._A & 0x7fff;
        console.log(this._C.toString(2));
    }

    y2(): void {
        this._A &= ~0x7FFF;
        this._A = this._B & 0x7fff;
    }

    y3(): void {
        let temp: number = this._A & 0x7fff;
        temp = ~temp;

        temp = temp | 0x18000;
        temp++;
        this._C += temp;
        this._C &= 0x1ffff;
        console.log("Y3", this._C.toString(2));
    }

    y4(): void {
        this._C <<= 1;
        this._C &= 0x1ffff;
        console.log(this._C.toString(2));
    }

    y5(): void {
        this._CH = 0;
    }

    y6(): void {
        this._B = this._B & ~0xFFFF;
    }

    y7(): void {
        let temp: number = this._A & 0x7fff;
        this._C += temp;
        this._C &= 0x1ffff;
        console.log("Y7", this._C.toString(2));
    }

    y8(): void{
        console.log("начало у8 ------- ")
        console.log(this._B.toString(2));
        let elderBitB = this._B & ~0xffff;

        let temp: number = (this._C >> 16) % 2;
        temp = (temp & 0x1) ^ 0x1;
        this._B = ((this._B << 1)  | temp) & 0xffff;
        this._B += elderBitB;
        console.log(this._B.toString(2));
        console.log("------------- ")
    }

    y9(): void {
        this._CH--;
    }

    y10(): void {
        this._C = (this._B & 0xffff) << 1;
    }

    y11(): void {
        this._C++;
    }

    y12(): void {
        this._C += 0x10000;
    }

    y13(): void {
        this._PP = true;
    }

    x1(): boolean {
        let temp = this._A;
        return (temp & 0x7fff) === 1;
    }

    x2(): boolean {
        return this._C === 0;
    }

    x3(): boolean {
        let temp = this._C;
        return (temp >> 16) % 2 === 1;
    }

    x4(): boolean {
        console.log(this._CH);
        return this._CH % 16 === 0;
    }

    x5(): boolean {
        return this._B % 2 === 1;
    }

    x6(): boolean{
        return ((this._A & 0x8000) >> 15) % 2 !== ((this._B & 0x10000) >> 16) % 2;
    }


    /////////////////////////////// взаимодействие с UI ////////////////////////////////
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
}

export default new Store;