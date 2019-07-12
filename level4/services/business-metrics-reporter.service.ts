import { BusinessMetrics, Worker, Shift } from "../models";
import { WorkerStatus } from '../models/worker-status.enum';

export class BusinessMetricsReporter {
    
    private _metrics: BusinessMetrics;

    constructor(){
        this._metrics = new BusinessMetrics();
    }

    public updateMetrics(revenue: number, worker: Worker, shifts: Shift[]): void{

        const servicesFees = (_revenue: number): number => {
            const FEES = 5; // %
            return (_revenue * FEES /100) ;
        };
        const interimFees = (_revenue: number, _worker: Worker): number => {
            return _worker.getFeesRate() * countInterimShifts(worker, shifts.length);
        };

        const countInterimShifts = (_worker: Worker, _nbShiftsWorked: number): number => {
            if (_worker.status === WorkerStatus.INTERIM){
                return shifts.length;
            }
            return 0;
        }
        
        this._metrics.pdg_fee += servicesFees(revenue);
        this._metrics.pdg_fee += interimFees(revenue, worker);
        this._metrics.interim_shifts += countInterimShifts(worker, shifts.length);
    }

    public getMetrics(): BusinessMetrics{
        return this._metrics;
    }
}