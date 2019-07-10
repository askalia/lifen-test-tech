
export class Worker {

    constructor(
        public id = 0,
        public first_name = '',
        public price_per_shift = 0
    ){
    }
    
    static from({ id, first_name, price_per_shift}: Worker): Worker{
        const worker = new Worker();
        worker.id = id;
        worker.first_name = first_name;
        worker.price_per_shift = price_per_shift;
        return worker;
    }
}