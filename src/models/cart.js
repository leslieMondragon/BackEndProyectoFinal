import { Schema, model } from "mongoose";
const cartCollection = "carts";

const CartSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
  },
  products: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          index: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
});

const CartModel = model(cartCollection, CartSchema);

export default CartModel;
