import { Worker, WorkerStatus, WorkerStatusRate } from "../models";

let _instance: WorkerService;

export class WorkerService {
    
    private constructor(){

    }
    public static getInstance(): WorkerService{
        return _instance || (_instance = new WorkerService());
    }

    public getApplicableRate(worker: Worker): number{
        return +WorkerStatusRate[worker.status.toUpperCase()];
    }
}