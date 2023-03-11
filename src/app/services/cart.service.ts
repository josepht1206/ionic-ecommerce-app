import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Product[] = [];
  quantity: any;
  totalAmount: number = 0;

  constructor(private storage: Storage) {
    this.loadCart();
  }

  loadCart(): void {
    this.storage.get('cart').then((cart) => {
      if (cart) {
        this.cartItems = cart;
        this.getTotalAmount();
        console.log('Cart items loaded:', this.getCart());
      }
    });
  }
  saveCart(): void {
    this.storage.set('cart', this.cartItems);
    console.log('Product saved', this.getCart());
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  async getCart() {
    if (!this.cartItems) {
      const items = await this.storage.get('cartItems');
      if (items) {
        this.cartItems = JSON.parse(items);
      } else {
        this.cartItems = [];
      }
    }
    return this.cartItems;
  }

  getTotal() {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  getTotalAmount(): number {
    let totalAmount = 0;
    for (let item of this.cartItems) {
      totalAmount += item.quantity * item.price;
    }
    return totalAmount;
  }

  removeItem(item: Product): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.getTotalAmount();
      this.saveCart();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }
}
