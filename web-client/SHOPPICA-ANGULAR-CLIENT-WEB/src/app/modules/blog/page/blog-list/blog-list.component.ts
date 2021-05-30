import { LoaderService } from '@shared/modules/loader/loader.service';
import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '@core/services/blog/blog.service';
import { Blog } from '@core/model/blog/blog';
import { finalize, switchMap, delay } from 'rxjs/operators';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {

  @ViewChild('target') targetScrollTo: ElementRef;
  listBlog: Blog[];
  pageIndex = 1;
  pageSize = 6;
  total = 1;
  currentCategory = null;
  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly loaderService: LoaderService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      switchMap(queryParams => {
        this.pageIndex = 1;
        this.total = 0;
        this.currentCategory = queryParams.category;
        this.loaderService.showLoader('filter-blog')
        return this.blogService.getAllBlog(this.pageIndex, this.pageSize, queryParams.category)
      }),
      delay(2000)
    ).subscribe(res => {
      if (res.code == "OK") {
        this.listBlog = res.data.content;
        this.total = res.data.totalElements;
      }
      this.loaderService.hideLoader('filter-blog');
    });

  }

  onQueryPageIndexChange(pageNumber: number) {
    this.pageIndex = pageNumber;
    this.targetScrollTo.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    this.loaderService.showLoader('filter-blog')
    this.blogService.getAllBlog(pageNumber, this.pageSize, this.currentCategory).pipe(
      finalize(() => {
        this.loaderService.hideLoader('filter-blog');
      })
    ).subscribe((res) => {
      if (res.code == "OK") {
        this.listBlog = res.data.content;
        this.total = res.data.totalElements;
      }
    });
  }

  viewDetail(id: number) {
    this.router.navigate(['/blog/detail/', id]);
  }
}
