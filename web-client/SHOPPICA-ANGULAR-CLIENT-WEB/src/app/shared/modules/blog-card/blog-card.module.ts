import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card.component';



@NgModule({
  declarations: [BlogCardComponent],
  imports: [
    CommonModule
  ],
  exports:[
    BlogCardComponent
  ]
})
export class BlogCardModule { }
