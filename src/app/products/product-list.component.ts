import { sharedStylesheetJitUrl } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component({
    selector:  'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']    //encapsulated so won't get leaked out
})
export class ProductListComponent implements OnInit,OnDestroy{
    pageTitle:string= 'Product List';
    imageWidth: number= 50;
    imageMargin: number=2;
    showImage: boolean=false;
    sub!: Subscription;
    // getter and setter definition
    errorMessage : string = '';
    private _listFilter: string ='';
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value: string){
      this._listFilter=value;
      console.log('In Setter:', value);
      this.filteredProducts= this.performFilter(value);
    }
    //listFilter: string=;
    filteredProducts: IProduct[]=[];
    products: IProduct[]= [];
    constructor(private productService: ProductService){
    }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
    performFilter(filterBy: string): IProduct[]{
      filterBy= filterBy.toLocaleLowerCase();

      return this.products.filter((product :IProduct)=> 
      product.productName.toLocaleLowerCase().includes(filterBy));
      
    }

    toggleImage(): void{
      this.showImage=!this.showImage;
    }
    ngOnInit(): void {
     // console.log('In Oninit');  // we can set default value here;
     // we have to subscribe to our method;

      this.sub=this.productService.getProducts().subscribe({
        next: products => {
          this.products= products;
          this.filteredProducts= this.products;
        },
        error: err=> this.errorMessage=err
      });
       

    }
    
    onRatingClicked(message : string) : void{
      this.pageTitle= 'Product List: ' + message;
    }
    
}