import { Controller } from "./controller";
import { Request, Response } from "express";
import Puppeteer_dto from "../dtos/puppeteer_dto";
import { PuppeteerLogin } from "../services/puppeteerLogin";

class LoginController extends Controller {
  constructor() {
    super();
    this.mailLogin();
  }

  public async mailLogin() {
    this.router.post(
      "/peppeteer/login",
      /*validationMiddleware(Puppeteer_dto),*/
      async (req: Request, res: Response) => {
        try {
          const list = await PuppeteerLogin(req.body);
          res.send(list);
        } catch (e) {
          res.send(e.message);
        }
      },
    );
  }
}

export default LoginController;
