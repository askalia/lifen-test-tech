import { PlanningService, PayrollService } from '../services';
import { writeToFile } from '../helpers/file.helper';
import { Worker, PayrollReport, WorkerRow } from '../models';

export class Level2 {

    private _planningService: PlanningService
    private _payrollService: PayrollService;

    constructor(dataPath: string){        
        this._planningService = PlanningService.getInstance(dataPath);
        this._payrollService = PayrollService.getInstance();
    }

    savePayrollReportTo(filePath: string): void{
        const payrollAsJson = JSON.stringify( this.getPayrollReport(), null, 4);
        try {
            writeToFile(filePath, payrollAsJson);
            console.log(`File written to ${filePath}`)
        }
        catch(e){
            throw e;
        }
    }

    getPayrollReport(): PayrollReport{
  
        return this._planningService.workers
            .reduce((payrollReport: PayrollReport, worker: Worker) => {
                const countShifts: number = this._planningService.countShiftsOfWorker(worker.id);
                const price: number = this._payrollService.getRevenueForWorker(worker, countShifts);
    
                const workerRow: WorkerRow | undefined = payrollReport.workers.find(row => row.id === worker.id);
                
                if (workerRow === undefined){
                    payrollReport.workers = [
                        ...payrollReport.workers,
                        <WorkerRow> { id: worker.id, price }
                    ];
                }
                else {
                    workerRow.price = price;
                }
                return payrollReport;
            }, 
            new PayrollReport());
    }

}
