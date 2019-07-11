
export class Shift {

    constructor(
        public id: number = 0,
        public planning_id: number = 0,
        public user_id: number = 0,
        public start_date: string = '',
    ){        
    }

    public static from({ id, planning_id, user_id, start_date}: Shift): Shift{
        const shift = new Shift();
        shift.id = id;
        shift.planning_id = planning_id;
        shift.user_id = user_id;
        shift.start_date = start_date;
        return shift;
    }

    public isOnWeekendDay(){
        const SATURDAY = 6;
        const SUNDAY = 0;        
        return [SATURDAY, SUNDAY].includes(new Date(this.start_date).getDay());
    }
}