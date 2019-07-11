import { WorkerInterim } from './index';

export type WorkerStatus = 'medic' | 'intern' | 'interim';

export interface IBusinessFees {
    getFeesRate(): number    
}

export class Worker implements IBusinessFees{

    protected static FEES_RATE: number = 80; // €

    constructor(
        public id = 0,
        public first_name = '',
        public status: WorkerStatus
    ){
    }
    
    static from({ id, first_name, status}: any): Worker{
        if (status === 'interim'){
            return new WorkerInterim(id, first_name, status);  
        }
        return new Worker(id, first_name, status);        
    }

    public getFeesRate(): number{
        return Worker.FEES_RATE;
    }
}