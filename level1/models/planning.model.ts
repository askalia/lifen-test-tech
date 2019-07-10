import { Worker, Shift } from "./index";

export class Planning {
    
    public workers: Worker[];
    public shifts: Shift[];

    constructor({ workers, shifts }: { workers: Worker[], shifts: Shift[] }){
        this.workers = workers.map((w: any) => Worker.from(w)),
        this.shifts = shifts.map((s: any) => Shift.from(s))        
    }
}