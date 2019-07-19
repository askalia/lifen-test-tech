import { Worker } from "./index";

export class WorkerInterim extends Worker {

    protected static FEES_RATE = 80; // €
    getFeesRate(): number{
        return WorkerInterim.FEES_RATE;
    }
}