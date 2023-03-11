import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: Product[] = [];
  cartItems$!: Observable<Product[]>;
  totalAmount: number = 0;

  constructor(
    public cartService: CartService,
    private alertController: AlertController,
    private toast: ToastController,
    private router: Router,
    private navCtrl: NavController
  ) {}

  async ionViewWillEnter() {
    this.cartItems$ = of(await this.cartService.getCart());
    console.log('Cart items loaded:', this.cartItems$);
  }
  ngOnInit() {
    this.cartService.getCart().then((items) => {
      this.cartItems = items;
      this.totalAmount = this.cartService.getTotalAmount();
    });
  }

  incrementQuantity(cartItems: Product): void {
    cartItems.quantity++;
    this.cartService.getTotalAmount();
    this.cartService.saveCart();
  }

  decrementQuantity(cartItems: Product): void {
    if (cartItems.quantity > 1) {
      cartItems.quantity--;
      this.cartService.getTotalAmount();
    }
    this.cartService.saveCart();
  }

  async removeItem(cartItems: Product) {
    const alert = await this.alertController.create({
      header: 'Confirm Removal',
      message: `Do you want to remove ${cartItems.title} from the cart?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Remove',
          handler: () => {
            this.cartService.removeItem(cartItems);
            this.toast
              .create({
                message: 'Product removed from cart!',
                duration: 2000,
              })
              .then((toast) => {
                toast.present();
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Confirm Checkout',
      message: `Are you sure to checkout and clear your cart?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Checkout',
          handler: async () => {
            this.cartService.clearCart();
            const newCartItems = await this.cartService.getCart();
            this.cartItems$ = of(newCartItems);
            this.toast
              .create({
                message: 'Successfully Checked Out and the Cart is cleared!',
                duration: 2000,
              })
              .then((toast) => {
                toast.present();
              });
            this.navCtrl.navigateForward('/cart');
          },
        },
      ],
    });

    await alert.present();
  }
}
