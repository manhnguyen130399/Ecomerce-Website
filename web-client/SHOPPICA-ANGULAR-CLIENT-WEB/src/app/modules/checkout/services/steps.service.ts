import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  private changeStepSubject = new Subject<number>();

  changeStepEmitted$ = this.changeStepSubject.asObservable();

  changeStep(step: number) {
    this.changeStepSubject.next(step);
  }
  constructor() { }
}
