import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Blog } from '../../models/Blog';
import { BlogService } from '../../services/blog.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent
  extends BaseListComponent<Blog>
  implements OnInit {
  isShowView: boolean = false;
  constructor(private readonly blogService: BlogService) {
    super(blogService);
  }

  ngOnInit(): void {}

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: 'title', value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  };

  searchByTitle() {
    this.baseParams.filters = [{ key: 'title', value: this.searchValue }];
    super.search();
    this.searchValue = '';
  }

  viewBlog(data): void {
    this.isShowView = true;
    this.selectedData = data;
  }

  cancelViewBlog(data): void {
    this.isShowView = false;
  }
}
