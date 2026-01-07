import { Hono } from 'hono'
import userRouter from './user'
import blogRouter from './blog'


const allRouter = new Hono()



allRouter.route('/user', userRouter);
allRouter.route('/blog', blogRouter);


export default allRouter;