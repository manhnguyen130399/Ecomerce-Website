import { StepsService } from './../../services/steps.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-order-steps',
  templateUrl: './order-steps.component.html',
  styleUrls: ['./order-steps.component.css']
})
export class OrderStepsComponent implements OnInit {
  index = 0;
  constructor(private readonly stepService: StepsService) { }

  ngOnInit(): void {

    this.stepService.changeStepEmitted$.subscribe(step => {
      this.index = step - 1;
    })
  }


  onIndexChange(event: number): void {
    this.index = event;
  }
}
