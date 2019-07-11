import { Shift } from "../models";

let _instance: ShiftService;

export class ShiftService {
    
    private constructor(){

    }
    public static getInstance(): ShiftService{
        return _instance || (_instance = new ShiftService());
    }

    public getApplicableShift(shift: Shift){
        return this._applyWeekendRules(shift);
    }

    private _applyWeekendRules(shift: Shift){
        let nbShifts: number = 1;
        if (shift.isOnWeekendDay()){            
            nbShifts *= 2;
        }
        return nbShifts;
    }
}