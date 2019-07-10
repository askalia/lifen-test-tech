import { Worker, WorkerStatus, WorkerStatusRate } from "../models";

let _instance: PayrollService;

export class PayrollService {

    private constructor(){
    }

    public static getInstance(): PayrollService{
        return _instance || (_instance = new PayrollService());
    }

    public getRevenueForWorker(worker: Worker, nbShifts: number): number{
        return nbShifts * this._getApplicableRate(worker.status);
    }

    private _getApplicableRate(workerStatus: WorkerStatus): number{
        return parseFloat(WorkerStatusRate[workerStatus.toUpperCase()] || 0);
    }

}