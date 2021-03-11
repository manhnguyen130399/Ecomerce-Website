import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-size-modal',
  templateUrl: './size-modal.component.html',
  styleUrls: ['./size-modal.component.css']
})
export class SizeModalComponent implements OnInit {
  @Input() isVisible = false;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  handleOk(): void {
    this.okModalEvent.emit();
    console.log('Button ok clicked!');
  }

  handleCancel(): void {
    this.cancelModalEvent.emit();
    console.log('Button cancel clicked!');
  }

}
