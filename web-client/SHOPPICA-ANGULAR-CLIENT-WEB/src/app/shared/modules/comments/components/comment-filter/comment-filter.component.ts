import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Comment } from '@core/model/comment/comment';

@Component({
  selector: 'app-comment-filter',
  templateUrl: './comment-filter.component.html',
  styleUrls: ['./comment-filter.component.css']
})
export class CommentFilterComponent implements OnInit {
  @Input() comments: Comment[];
  @Output() filterRatingEvent = new EventEmitter<string[]>();
  ratingAverage = 0;
  filterRatings: string[] = ['desc'];
  commentsByRating: {
    [key: number]: [Comment[]]
  };
  constructor() { }

  ngOnInit(): void {
    this.commentsByRating = this.comments.reduce((result, item) => ({
      ...result,
      [item['rating']]: [
        ...(result[item['rating']] || []),
        item,
      ],
    }), {});

    this.ratingAverage = this.comments.length == 0 ? 0 :
      this.comments.map(c => c.rating).reduce((prev, cur) => prev + cur) / this.comments.length;
  }


  filterByRating(rating: string) {
    this.filterRatings.indexOf(rating) === -1 ? this.filterRatings.push(rating) :
      this.filterRatings = this.filterRatings.filter(x => x !== rating);

    this.filterRatingEvent.emit(this.filterRatings);
  }

}
