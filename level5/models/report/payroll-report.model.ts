import { WorkerRow } from './index';
import { BusinessMetrics } from './business-metrics.model';

export class PayrollReport {
    
    public workers: WorkerRow[];
    public commission: BusinessMetrics;

    constructor(){
        this.workers = [];
        this.commission = new BusinessMetrics();
    }
}