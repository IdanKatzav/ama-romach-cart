import { Product } from "./Product";

class Cart {
  addProduct(newProduct: Product): void {}

  removeProduct(productName: string): void {}

  updateProductsAmount(productName: string): void {}
  checkout(): void {}
  totalPrice(): number {
    return 0;
  }
}
