import { Shift, Worker } from "../models";
import { ShiftService, WorkerService } from "./index";

let _instance: PayrollService;

export class PayrollService {

    private _shiftService: ShiftService;
    private _workerService: WorkerService

    private constructor(){
        this._shiftService = ShiftService.getInstance();
        this._workerService = WorkerService.getInstance();
    }

    public static getInstance(): PayrollService{
        return _instance || (_instance = new PayrollService());
    }
 
    public getRevenueForWorker(worker: Worker, shifts: Shift[]): number{
        
        const rawRevenue = shifts.reduce((revenue: number, shift: Shift) => {
            revenue += this._shiftService.getApplicableShift(shift) * this._workerService.getApplicableRate(worker);            
            return revenue;
        }, 0);

        return rawRevenue;
    }

}