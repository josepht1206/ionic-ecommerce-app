import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    private toast: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.presentLoading();
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe((response) => {
      this.product = response;
      this.loadingController.dismiss();
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'dots',
      translucent: true,
    });
    await loading.present();
  }

  async addToCart(product: Product) {
    const alert = await this.alertController.create({
      header: 'Add Product',
      message: `Do you want to add ${product.title} to the cart?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Add to Cart',
          handler: () => {
            this.cartService.addToCart(product);
            console.log('Product added to cart', product);
            this.toast
              .create({
                message: 'Product added to cart!',
                duration: 2000,
              })
              .then((toast) => {
                toast.present();
              });
            this.router.navigateByUrl('/cart');
          },
        },
      ],
    });

    await alert.present();
  }
}
