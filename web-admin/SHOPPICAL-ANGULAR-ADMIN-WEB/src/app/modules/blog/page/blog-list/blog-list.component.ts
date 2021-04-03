import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Blog } from '../../models/Blog';
import { BlogService } from '../../services/blog.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent
  extends BaseListComponent<Blog>
  implements OnInit {
  constructor(private readonly blogService: BlogService) {
    super(blogService);
  }

  ngOnInit(): void {}

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: 'brandName', value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  };

  searchByTitle() {
    this.baseParams.filters = [{ key: 'title', value: this.searchValue }];
    super.search();
    this.searchValue = '';
  }
}
