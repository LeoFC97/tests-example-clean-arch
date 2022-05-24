import express from 'express';
import container from '../../container';
import { adapt } from '../../drivers/http/express-router-adapter';
import CreateListController from './controllers/list/create-list';
// import GetListController from './controllers/list/get-list';
import HealthController from './controllers/health/health';

const router = express.Router();

router.post('/list', adapt(container.resolve(CreateListController)));
// router.get('/list', adapt(container.resolve(GetListController)));
router.get('/health', adapt(container.resolve(HealthController)));

export default router;
