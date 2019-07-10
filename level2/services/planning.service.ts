import { Worker, Planning, Shift } from "../models";
import { readFileAsJson } from '../helpers/file.helper';


let _instance: PlanningService;

export class PlanningService {
    
    private _planning: Planning;

    constructor(dataPath: string){            
        this._planning = new Planning(readFileAsJson(dataPath));
    }

    public static getInstance(dataPath: string): PlanningService{
        return _instance || (_instance = new PlanningService(dataPath));
    }

    public get shifts(): Shift[] {
        return this._planning.shifts;
    }
    public get workers() : Worker[]{
        return this._planning.workers;
    }

    public getWorkerById(id: number){
        return this._planning.workers.find((worker: Worker) => worker.id === id);
    }

    public getShiftById(id: number): Shift {
        return this._planning.shifts.find((shift: Shift) => shift.id === id);
    }

    public getShiftsOfWorker(workerId: number): Shift[] {
        return this._planning.shifts.filter((shift: Shift) => shift.user_id === workerId) || [];
    }

    public countShiftsOfWorker(workerId: number): number {
        return (this._planning.shifts.filter((shift: Shift) => shift.user_id === workerId) || []).length;
    }
}