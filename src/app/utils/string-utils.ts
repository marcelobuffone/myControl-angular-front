import { DateAdapterOptions } from 'chart.js';

export class StringUtils {
    
    public static isNullOrEmpty(val: string) : boolean {
        if (val === undefined || val === null || val.trim() === '') {
            return true;
        }
        return false;
    };
    public static roundNumber(number: number) : number {
        return Number(number.toFixed(2));
    }

    public static onlyNumbers(number) : string {
        return number.replace(/[^0-9]/g,'');
    }
    
}