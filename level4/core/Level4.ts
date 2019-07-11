import { PlanningService, PayrollService } from '../services';
import { writeToFile } from '../helpers/file.helper';
import { Worker, PayrollReport, WorkerRow, Shift } from '../models';
import { BusinessMetricsReporter } from '../services/business-metrics-reporter.service';

export class Level4 {

    private _planningService: PlanningService
    private _payrollService: PayrollService;
    private _bizMetricsReporter: BusinessMetricsReporter;

    constructor(dataPath: string){        
        this._planningService = PlanningService.getInstance(dataPath);
        this._payrollService = PayrollService.getInstance();
        this._bizMetricsReporter = new BusinessMetricsReporter();
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

        return {
            workers: this.getWorkersRows(),
            commission: this._bizMetricsReporter.getMetrics()
        } as PayrollReport;
    }

    private getWorkersRows(): WorkerRow[] {
        const workerRows: WorkerRow[] = [];

        return this._planningService.workers
            .reduce((workersRows: WorkerRow[], worker: Worker) => {
                const workerShifts: Shift[] = this._planningService.getShiftsOfWorker(worker.id);
                const price: number = this._payrollService.getRevenueForWorker(worker, workerShifts);
    
                this._bizMetricsReporter.updateMetrics(price, worker, workerShifts);
                
                const workerRow: WorkerRow | undefined = workersRows.find(row => row.id === worker.id);
                
                if (workerRow === undefined){
                    workersRows = [
                        ...workersRows,
                        <WorkerRow> { id: worker.id, price }
                    ];
                }
                else {
                    workerRow.price += price;
                }
                return workersRows;
            }, 
            workerRows);
    }

}
