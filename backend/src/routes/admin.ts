import { Router } from 'express';
const router = Router();
import { registerAdmin } from '../controllers/admin';
// Interfaces
import { IRequest, IResponse } from 'src/interfaces/vendor';
// Validators
import { validateAdminRegistration } from '../validators/admin';


// route    :: POST /api/admin/register
// access   :: Temporary
// desc     :: Admin registration
router.post(
    '/register',
    validateAdminRegistration,
    (req: IRequest, res: IResponse) => {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        registerAdmin(data)
            .then(admin => res.json({ msg: `Admin registered`, data: admin }))
            .catch((err) => res.status(err.status).json({ msg: err.msg, err: err.err }));
    }
);


export default router;