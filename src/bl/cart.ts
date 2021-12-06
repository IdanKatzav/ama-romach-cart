import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from './models/product';

import { ProductInCart } from './models/product-in-cart';

export class Cart {
	private itemsInList: BehaviorSubject<ProductInCart>;
	private productsInStore: Observable<Product[]>;

	constructor(products: Product[]) {
		this.itemsInList = new BehaviorSubject<ProductInCart>({});
		this.productsInStore = of(products);
	}

	addProduct(productName: string, amount: number) {
		let items = this.itemsInList.getValue();
		items[productName] = amount;
		this.itemsInList.next(items);
	}

	removeProduct(productName: string) {
		let items = this.itemsInList.getValue();
		delete items[productName];
		this.itemsInList.next(items);
	}

	updateProductsAmount(productName: string, newAmount: number) {
		let items = this.itemsInList.getValue();
		items[productName] = newAmount;
		this.itemsInList.next(items);
	}

	//TODO: try do this with combine latest
	getTotalPrice(): number {
		let totalPrice: number = 0;
		let items: BehaviorSubject<ProductInCart> = this.itemsInList;
		this.productsInStore.subscribe({
			next(products) {
				totalPrice = products.reduce((accumulatedPrice, currentProduct) => {
					accumulatedPrice += currentProduct.price *
						(items.getValue()[currentProduct.name] || 0);
					return accumulatedPrice;
				}, 0);
			},
			error(error) { console.log(error) }
		});
		return totalPrice;
	}

	checkout() {
		this.itemsInList.next({});
	}
}