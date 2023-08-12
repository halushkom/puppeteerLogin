import MainApplication from "./main_application";
import { Controller } from "./controller/controller";
import LoginController from "./controller/puppeteer_controller";

const controllers: Controller[] = [new LoginController()];

const application = new MainApplication(controllers);
application.listen();
