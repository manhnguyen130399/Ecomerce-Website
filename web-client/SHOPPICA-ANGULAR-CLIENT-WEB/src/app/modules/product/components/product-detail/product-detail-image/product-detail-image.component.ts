import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, Input, OnInit } from '@angular/core';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-product-detail-image',
  templateUrl: './product-detail-image.component.html',
  styleUrls: ['./product-detail-image.component.css']
})
export class ProductDetailImageComponent implements OnInit {

  @Input() listImage: string[] = [];
  listImageZoom: NzImage[] = [];
  constructor(private nzImageService: NzImageService) { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    dots: true,
    dotsData: true,
    responsive: {
      100: {
        items: 1
      },
      400: {
        items: 1
      },
    },
    nav: true,
    navText: ['<', '>']
  }

  enLargeImage() {
    this.listImage.forEach(x => {
      this.listImageZoom.push({
        src: x,
        height: '700px',
      })
    });
    this.nzImageService.preview(this.listImageZoom, { nzZoom: 1, nzRotate: 0 });
  }
}
