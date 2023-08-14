import ProductManager from "../dao/mongo/ProductManager.js";
import ProductService from "./product.js"

// import MessageManager from "../dao/mongo/MessageManager.js";
// import MessageService from "./message.js"

import CartManager from "../dao/mongo/CartManager.js";
import CartService from "./cart.js"

import UserManager from "../dao/mongo/UserManager.js";
import UserService from "./user.js"

import TicketManager from "../dao/mongo/TicketManager.js";
import TicketService from "./ticket.js";

export const productService = new ProductService(new ProductManager())
export const cartService = new CartService(new CartManager())
export const userService = new UserService(new UserManager())
export const ticketService = new TicketService(new TicketManager()) 



