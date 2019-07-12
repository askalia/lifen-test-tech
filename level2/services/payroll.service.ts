import { Worker, getWorkerStatusRate } from "../models";

let _instance: PayrollService;

export class PayrollService {

    private constructor(){
    }

    public static getInstance(): PayrollService{
        return _instance || (_instance = new PayrollService());
    }

    public getRevenueForWorker(worker: Worker, nbShifts: number): number{
        return nbShifts * this._getApplicableRate(worker);
    }

    private _getApplicableRate(worker: Worker): number{
        return getWorkerStatusRate(worker.status);
    }

}