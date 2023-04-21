import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(), //pode ou não ser requerido, optional da essa condição
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          //valor tenque ser igual ao password, when: se password tiver preenchido essa opção passa a ser requerida
          is: Joi.exist(),
          then: Joi.required()
        })
    }
  }),
  profileController.update
);

export default profileRouter;
