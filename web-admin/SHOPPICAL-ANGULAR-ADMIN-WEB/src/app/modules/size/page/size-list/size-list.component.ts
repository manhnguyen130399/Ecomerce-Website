import { SizeService } from './../../services/size.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-size-list',
  templateUrl: './size-list.component.html',
  styleUrls: ['./size-list.component.css']
})
export class SizeListComponent implements OnInit {

  isShowModal = false;
  constructor(private readonly sizeService: SizeService) { }

  ngOnInit(): void {
    this.sizeService.getSizes(1, 1).subscribe(
      console.log
    );
  }

  showModal() {
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = false;
  }
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

}
