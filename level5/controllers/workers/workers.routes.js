import * as workers from './workers.ctrl';

//const router = require('express').Router();




export const workersRoutes = (router) => {
    router.route('/workers')
        .get(workers.getAll)
        .post(workers.createOne);
    
    router.route('/workers/:id')
        .get(workers.getOne)
        .put(workers.updateOne)
        .delete(workers.deleteOne);
    
    return router;
}