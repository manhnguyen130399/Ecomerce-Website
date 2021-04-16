import { Step, SecondStep, FirstStep, ThirdStep, FourthStep } from './../../models/step';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() stepIndex: number;

  prevStep: Step;
  nextStep: Step;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stepIndex !== undefined) {
      console.log(changes.stepIndex)
      switch (changes.stepIndex.currentValue) {
        case 2: {
          this.nextStep = ThirdStep;
          this.prevStep = FirstStep;
          break;
        }
        case 3: {
          this.nextStep = FourthStep;
          this.prevStep = SecondStep;
          break;
        }
        case 4: {
          this.prevStep = ThirdStep;
          break;
        }
      }
    }
  }

}
