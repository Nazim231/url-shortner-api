class StaticController {

    home(req, res) {
        res.render("home");
    }

    login(req, res) {
        res.render("login");
    }

    signup(req, res) {
        res.render("signup");
    }

    dashboard(req, res) {
        res.render("dashboard");
    }
}

export const staticContoller = new StaticController();