import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-comment',
  templateUrl: './leave-comment.component.html',
  styleUrls: ['./leave-comment.component.css']
})
export class LeaveCommentComponent implements OnInit {

  writeBlogCommentForm: FormGroup;
  isLoading = false;
  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.writeBlogCommentForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      comment: [null, Validators.required],
    })
  }

  submitForm() {

  }
}
