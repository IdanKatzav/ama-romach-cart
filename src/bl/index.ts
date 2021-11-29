import { Cart } from "./cart";
import { Product } from "./models/product";

import products from "../resources/db/products.json";

const cart = new Cart(<Product[]>products);

products.forEach((product) => {
    cart.addProduct(product.name, 1);
});
console.log(cart.getTotalPrice());
cart.removeProduct(products[0].name);
console.log(cart.getTotalPrice());
cart.updateProductsAmount(products[1].name, 2);
console.log(cart.getTotalPrice());
cart.checkout();
console.log(cart.getTotalPrice());