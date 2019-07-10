import { Shift, Worker, WorkerStatus, WorkerStatusRate } from "../models";

let _instance: PayrollService;

export class PayrollService {

    private constructor(){
    }

    public static getInstance(): PayrollService{
        return _instance || (_instance = new PayrollService());
    }
 
    public getRevenueForWorker(worker: Worker, shifts: Shift[]): number{
        
        return shifts.reduce((revenue: number, shift: Shift) => {
            revenue += this._getApplicableShift(shift) * this._getApplicableRate(worker.status);            
            return revenue;
        }, 0);
    }

    private _getApplicableShift(shift: Shift): number{
        let nbShifts: number = 1;
        if (shift.isOnWeekendDay()){            
            nbShifts = 2;
        }   
        return nbShifts;    
    }

    private _getApplicableRate(workerStatus: WorkerStatus): number{
        return parseFloat(WorkerStatusRate[workerStatus.toUpperCase()] || 0);
    }

}