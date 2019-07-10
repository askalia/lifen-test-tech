import { WorkerStatusRate } from './worker-status-rate.enum';

type WorkerStatus = keyof typeof WorkerStatusRate;

export class Worker {

    constructor(
        public id = 0,
        public first_name = '',
        public status: WorkerStatus
    ){
    }
    
    static from({ id, first_name, status}: Worker): Worker{
        return new Worker(id, first_name, status);        
    }
}