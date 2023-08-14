import { request } from "express";
import { userService } from "../services/index.js";

class UserController {
  async getView(req = request, res) {
    res.render(
      "users"
    );
  }

  async getUsers(req = request, res) {
    try {
      let users = await userService.getUsers();
      users === undefined
        ? res.status(400).send("no users")
        : res.status(200).send(users);
    } catch (error) {
      req.logger.error(error);
    }
  }
  async getUser(req = request, res) {
    try {
      const { uid } = req.params;
      const user = await userService.getUser(uid);
      user === undefined
        ? res.status(400).send("no user")
        : res.status(200).send(user);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async searchUser(req = request, res) {
    try {
      const { email } = req.body;
      let user = await userService.getUserByEmail(email);
      user = user.toObject();
      user === undefined
        ? res.status(400).send("no user")
        : 
        res.render("users", {
            user
          });
    } catch (error) {
      req.logger.error(error);
    }
  }

  async createUser(req = request, res) {
    try {
      const { body } = req;
      const resp = await userService.createUser(body);
      resp === undefined
        ? res.status(400).send("no created")
        : res.status(200).send(resp);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async deleteUser(req = request, res) {
    try {
      const { uid } = req.params;
      const deleted = await userService.deleteUser(uid);
      deleted === undefined
        ? res.status(400).send("no deleted")
        : res.status(200).send(deleted);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async changeRoleUser(req = request, res) {
    try {
      const { uid } = req.params;
      console.log(uid);
      const user = await userService.getUser(uid);
      if (user === undefined) res.status(400).send("no user");
      if (user.role === "premium") {
        await userService.changeRole(uid, "user");
        res.status(201).send({
          message: `updated to user`,
        });
      } else {
        await userService.changeRole(uid, "premium");
        res.status(201).send({
          message: `updated to premium`,
        });
      }
    } catch (error) {
      req.logger.error(error);
    }
  }

  async deleteUsers(req = request, res) {
    try {
      const deleted = await userService.deleteUsers();
      deleted === undefined
        ? res.status(400).send("no deleted")
        : res.status(200).send(deleted);
    } catch (error) {
      req.logger.error(error);
    }
  }
}

export default UserController;
