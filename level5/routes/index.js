const router = require('express').Router();

import { workersRoutes } from '../controllers/workers/workers.routes';
import { shiftsRoutes} from '../controllers/shifts/shifts.routes';

workersRoutes(router);
shiftsRoutes(router);

module.exports = router;