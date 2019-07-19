import { WorkerStatus } from './index';

export const getWorkerStatusRate = (status: WorkerStatus): number => {
    return Number( {
        [WorkerStatus.MEDIC] : 270,
        [WorkerStatus.INTERNE] : 126,
        [WorkerStatus.INTERIM] : 480
    }[status] || 0);
    
}
