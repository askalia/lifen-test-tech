import { Worker } from "../models";

let _instance: PayrollService;

export class PayrollService {

    private constructor(){
    }

    public getRevenueForWorker(worker: Worker, nbShifts: number): number{
        return nbShifts * worker.price_per_shift;
    }

    public static getInstance(): PayrollService{
        return _instance || (_instance = new PayrollService());
    }
}