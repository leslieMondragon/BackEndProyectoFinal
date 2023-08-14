import { request } from "express";
import { cartService, productService, ticketService, userService } from "../services/index.js"
import {transport} from "../utils/mailer.js";

class CartController {

  getView = async (req = request, res) => {
    if (req.session.user !== undefined) {
      const user = await userService.getUserByEmail(req.session.user.email)
      if (user.cartId !== undefined) {
        this.cartId == user.cartId
        let info = await cartService.getCart(user.cartId);
        let products = info.products;
        products = products.map((item) => item.toObject());
        let cart = {
          _id: info._id,
          products,
        };
        res.render("carts", {
          cart,
        });
      }
      else {
        let newCart = await cartService.create()
        await userService.updateUser(user._id, {cartId: newCart._id})
        this.cartId == newCart._id
        res.render("carts", {
          newCart,
        });
      }
    }
    else {
      res.redirect("../../auth/login");
    }
  };

  addProductQuantity = async (req = request, res) => {
    const { pid } = req.params;
    const { quantity } = req.body;
    const user = await userService.getUserByEmail(req.session.user.email)
    let cart = await cartService.addProductQuantity(user.cartId, pid, quantity);
    res.status(201).send({
      "new cart": cart,
      message: "Product added",
    });
  };

  addProduct = async (req = request, res) => {
    const { pid } = req.params;
    if (req.session.user === undefined) {
      CustomError.createError({
        name: "Session has finished",
        cause: sessionErrorInfo(),
        message: "Error in setting a user from session",
        code: EErrors.SESSION_ERROR,
      });
    }
    let productOwner = productService.getProduct(pid);
    if (productOwner.owner === req.session.user.email){
      res.status(400).send({
        message: "You cant add your own product to your cart"
      });
    }
    const user = await userService.getUserByEmail(req.session.user.email)
    let cart = await cartService.addProduct(user.cartId, pid);
    res.status(201).send({
      "new cart": cart,
      message: "Product added",
    });
  };

  addProducts = async (req = request, res) => {
    let array = req.body;
    const user = await userService.getUserByEmail(req.session.user.email)
    let cart = await cartService.addProducts(user.cartId, array);
    res.status(201).send({
      "new cart": cart,
      message: "Products added",
    });
  };

  deleteProduct = async (req = request, res) => {
    const { pid } = req.params;
    if (req.session.user) {
      const user = await userService.getUserByEmail(req.session.user.email)
      let cart = await cartService.deleteProduct(user.cartId.toString(), pid.toString());
      console.log(cart);
      res.status(201).send({
        "new cart": cart,
        message: "Product deleted",
      });
    }
  };

  deleteCart = async (req = request, res) => {
    const user = await userService.getUserByEmail(req.session.user.email)
    let cart = await cartService.deleteCart(user.cartId);
    res.status(201).send({
      "new cart": cart,
      message: "Cart deleted",
    });
  };

  finishProcess = async (req = request, res) => {
    const user = await userService.getUserByEmail(req.session.user.email)
    let cart = await cartService.getCart(user.cartId)
    let confirmation = await cartService.finishProcess(cart)
    if (confirmation.products.length > 0) {
      let user = await userService.getUserByEmail(req.session.user.email)
      let ticket = await ticketService.createTicket(confirmation, user._id)
      let result = await transport.sendMail({
        from: "Coder Tests <lesliex2398@gmail.com>",
        to: "lesliex2398@gmail.com",
        subject:"New Ticket",
        html: `<div>
        <h1>Purchase confirmed!</h1>
        <h2>Dates of purchase: </h2>
        <div>
          <p>Ticket ID: ${ticket._id.toString()}</p>
          <p>Purchaser ID: ${ticket.purchaser.toString()}</p>
          <p>Purchase time: ${ticket.purchase_datetime}</p>
          <p>Amount: ${ticket.amount}</p>
          <p>Cart: </p>
          <ul>
            ${ticket.cart.products.map((element)=>{
                return (`<li>${element.productId.title}</li>`)
            })}
          </ul>
        </div>
        </div>`
      })
      res.status(201).send({
        "new ticket": ticket,
        "new cart": confirmation,
        message: "Cart Processed",
      });
      // res.render("carts", {
      //   cart,
      // });
    }
    else {
      res.status(400).send({
        message: "We couldn't finish the purchase, please add products with stock",
      });
    }
  }
}

export default CartController;
