import { BehaviorSubject, Observable, from, reduce } from 'rxjs';
import { Product } from './models/product';

import { ProductInCart } from './models/product-in-cart';

export class Cart {
	private itemsInList: BehaviorSubject<ProductInCart>;
	private productsInStore: Observable<Product>;

	constructor(products: Product[]) {
		this.itemsInList = new BehaviorSubject<ProductInCart>({});
		this.productsInStore = from<Product[]>((products));
	}

	addProduct(productName: string, amount: number) {
		let items = this.itemsInList.getValue();
		items[productName] = amount;
		this.itemsInList.next(items);
	}

	removeProduct(productName: string): void {
		let items = this.itemsInList.getValue();
		delete items[productName];
		this.itemsInList.next(items);
	}

	updateProductsAmount(productName: string, newAmount: number) {
		let items = this.itemsInList.getValue();
		items[productName] = newAmount;
		this.itemsInList.next(items);
	}

	getTotalPrice(): number {
		let totalPrice: number = 0;
		this.productsInStore.pipe(
			reduce((accumulatedPrice, currentProduct) => {
				accumulatedPrice += currentProduct.price *
					(this.itemsInList.getValue()[currentProduct.name] || 0);
				return accumulatedPrice;
			}, 0)).subscribe({
				next(price) { totalPrice = price; },
				error(error) { console.log(error) }
			});
		return totalPrice;
	}

	checkout(): void {
		this.itemsInList.next({});
	}
}