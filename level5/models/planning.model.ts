import { Worker, Shift } from "./index";

export class Planning {
    
    public workers: Worker[];
    public shifts: Shift[];

    constructor({ workers, shifts }: { workers: Worker[], shifts: Shift[] }){
        this.workers = workers.map((worker: any) => Worker.from(worker)),
        this.shifts = shifts
                        .filter((rawShift: any) => rawShift.user_id != null)
                        .map((rawShift: any) => Shift.from(rawShift))        
    }
}