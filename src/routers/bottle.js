const Router = require('koa-express-router');
const bottleCtrl = require('../controllers/bottle');
const { exportRtr, isPositiveInt } = require('../utils');

const router = new Router({ prefix: '/bottles' });

exports = module.exports = () => exportRtr(router);

router.post('/', bottleCtrl.create);
router.get('/nearby', bottleCtrl.retrieveNearby);
router.get('/created', bottleCtrl.retrieveSelfCreated);
router.get('/opened', bottleCtrl.retrieveSelfOpened);

router.param('bottle_id',
  bottleCtrl.parseOneBottle,
);

router.use(`/:bottle_id${isPositiveInt}`, oneBottle());

function oneBottle() {
  const idRtr = new Router({ mergeParams: true });

  idRtr.post('/open', bottleCtrl.openOneBottle);
  idRtr.get('/openers', bottleCtrl.retrieveOpenersOfOneBottle);

  return exportRtr(idRtr);
}
