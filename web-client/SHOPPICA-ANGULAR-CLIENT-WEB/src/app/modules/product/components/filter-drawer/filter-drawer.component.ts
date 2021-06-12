import { Price } from './../../../../core/model/product/price';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorService } from './../../../../core/services/color/color.service';
import { Brand } from '../../../../core/model/brand/brand';
import { Size } from '@core/model/size/size';
import { Color } from '../../../../core/model/color/color';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandService } from '@core/services/brand/brand.service';
import { SizeService } from '@core/services/size/size.service';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.css']
})
export class FilterDrawerComponent implements OnInit {

  @Input() isShowFilter = false;
  @Output() closeFilterEvent = new EventEmitter<boolean>();

  listColor: Color[] = [];

  listSize: Size[] = [];

  listBrand: Brand[] = [];

  listPrice: Price[] = [
    {
      priceName: '$7 - $50',
      priceUrl: '7-50',
    },
    {
      priceName: '$51 - $100',
      priceUrl: '51-100',
    },
    {
      priceName: '$100 - $500',
      priceUrl: '100-500',
    },
    {
      priceName: '$501 - $1000',
      priceUrl: '501-1000',
    },
    {
      priceName: '$1001 - $3000',
      priceUrl: '1001-3000',
    },
  ];

  selectedColor: string;
  selectedSize: string;
  selectedBrand: string;
  selectedPrice: string;
  currentCategory: string;

  constructor(
    private readonly brandService: BrandService,
    private readonly colorService: ColorService,
    private readonly sizeService: SizeService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadAllBrand();
    this.loadAllColor();
    this.loadAllSize();

    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedColor = params.color;
      this.selectedSize = params.size;
      this.selectedBrand = params.brand;
      this.selectedPrice = params.price;
    });

    this.activatedRoute.params.subscribe((data) => {
      this.currentCategory = data.category;
    });
  }

  closeMenu() {
    this.closeFilterEvent.emit();
  }

  loadAllBrand() {
    this.brandService.getAllBrand().subscribe((res) => {
      if (res.code == 'OK') {
        this.listBrand = res.data;
      }
    });
  }


  loadAllSize() {
    this.sizeService.getAllSize().subscribe((res) => {
      if (res.code == 'OK') {
        this.listSize = res.data;
      }
    });
  }


  loadAllColor() {
    this.colorService.getAllColor().subscribe((res) => {
      if (res.code == 'OK') {
        this.listColor = res.data;
      }
    });
  }

  selectColor(color: Color) {
    this.closeMenu();
    this.router.navigate(['/product/collection', this.currentCategory],
      {
        queryParams: {
          color: color.colorName.toLowerCase()
        },
        queryParamsHandling: 'merge'
      });
  }

  selectSize(size: Size) {
    this.closeMenu();
    this.router.navigate(['/product/collection', this.currentCategory],
      {
        queryParams: {
          size: size.sizeName.toLowerCase()
        },
        queryParamsHandling: 'merge'
      });
  }

  selectBrand(brand: Brand) {
    this.closeMenu();
    this.router.navigate(['/product/collection', this.currentCategory],
      {
        queryParams: {
          brand: brand.brandName.toLowerCase()
        },
        queryParamsHandling: 'merge'
      });
  }

  selectPrice(price: Price) {
    this.closeMenu();
    this.router.navigate(['/product/collection', this.currentCategory],
      {
        queryParams: {
          price: price.priceUrl
        }, queryParamsHandling: 'merge'
      });
  }
}
