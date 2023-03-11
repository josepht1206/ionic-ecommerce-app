import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: any;
  categories: string[] = [];
  selectedCategory: string = '';
  totalResults: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loadingController: LoadingController
  ) {}

  ionViewDidEnter() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
      this.totalResults = this.products.length;
      console.log('Found ', this.totalResults, ' results');
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSelectCategory() {
    this.presentLoading();
    this.productService
      .getProductsByCategory(this.selectedCategory)
      .subscribe((products) => {
        this.products = products;
        this.totalResults = this.products.length;
        console.log(this.totalResults);

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
}
