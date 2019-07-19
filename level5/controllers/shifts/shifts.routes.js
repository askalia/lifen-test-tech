import * as shifts from './shifts.ctrl';


//const router = require('express').Router();



export const shiftsRoutes = (router) => {
    router.route('/shifts')
    .get(shifts.getAll)
    .post(shifts.createOne);
    
    router.route('/shifts/:id')
        .get(shifts.getOne)
        .put(shifts.updateOne)
        .delete(shifts.deleteOne);

    router.route('/shifts/:id/worker')
        .put(shifts.assignWorker)
    
        return router
}