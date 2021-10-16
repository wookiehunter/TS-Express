import { NextFunction, Request, Response } from 'express';
import {post, get, controller, bodyValidator} from './decorators'

@controller('/auth')
class LoginController {
	@get('/login')
	getLogin(req: Request, res: Response): void {
		res.send(`
            <form method='POST'>
                <div>
                    <label>Name</label>
                    <input name="email"/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password"/>
                </div>
                <button>Submit</button>
            </form>
        `);
	}

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;
        if (
            email &&
            password &&
            email === 'Bob.Jones@tit.com' &&
            password === 'password'
        ) {
            // mark as logged
            req.session = { loggedIn: true };
            // push to correct route
            res.redirect('/');
        } else {
            res.send('Provide correct email and password');
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined
        res.redirect('/login')
    }
}
