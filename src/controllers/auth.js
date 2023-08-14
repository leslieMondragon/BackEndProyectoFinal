import { request } from "express";
import { createHash } from "../utils/bycriptPass.js";
import { userService } from "../services/index.js";
import CustomError from "../services/errors/CustomError.js";
import { generateUserErrorInfo } from "../services/errors/info.js";
import { EErrors } from "../services/errors/enums.js";
import { sendEmail } from "../utils/mailer.js";
import { generateTokenMail } from "../utils/jsonwebtoken.js";

class AuthController {
  githubCallback = async (req = request, res) => {
    req.session.user = req.user;
    res.redirect("/api/products/view");
  };
   

  logout = async (req = request, res) => {
    if (req.session.user){
      const user = await userService.getUserByEmail(req.session.user.email);
      await userService.updateConnection(user._id.toString())
    }
    req.session.destroy((err) => {
      if (!err) res.status(200).redirect("/auth/login");
      else res.send({ status: "Logout error", message: err });
    });
  };

  login = async (req = request, res) => {
    if (req.user === undefined) {
      CustomError.createError({
        name: "Failed Login",
        cause: generateUserErrorInfo({
          first_name: req.user.first_name,
          last_name: req.user.first_name,
          email: req.user.email,
          role: req.user.role,
        }),
        message: "Error in login and creating a session",
        code: EErrors.SESSION_ERROR,
      });
    } else {
      const user = await userService.getUserByEmail(req.user.email);
      req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: user.email,
        role: user.role,
      };
      await userService.updateConnection(user._id.toString())
    }
    res.status(200).redirect("/api/products/view");
  };

  register = async (req = request, res) => {
    res.status(200).redirect("login");
  };

  restorePass = async (req = request, res) => {
    const { email, newPassword } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user)
      return res
        .status(401)
        .send({ status: "error", message: "El usuario no existe" });
    let password = createHash(newPassword);
    let pass = {password: password}
    await userService.updateUser(user._id, pass);
    res.status(200).redirect("login");
  };

  restorePassMail = async (req = request, res) => {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user)
      return res
        .status(401)
        .send({ status: "error", message: "El usuario no existe" });
    const configSendMail = {
      userMail: user.email,
      subject: "Restore Password",
      html: `<div>
          <h2>You can restore your password clicking on the this link: </h2>
          <a href="http://localhost:8080/auth/restorepass">Restore password</a>
        </div>`,
    };
    sendEmail(configSendMail);
    const token = generateTokenMail(user);
    res
      .cookie("coderCookieToken", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .send({ message: "you can restore your password for 1hs" });
  };
}

export default AuthController;
