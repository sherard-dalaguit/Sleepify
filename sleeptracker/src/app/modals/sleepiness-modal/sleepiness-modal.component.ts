import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SleepService} from "../../services/sleep.service";
import {FormsModule} from "@angular/forms";
import {StanfordSleepinessData} from "../../data/stanford-sleepiness-data";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-sleepiness-modal',
  templateUrl: './sleepiness-modal.component.html',
  styleUrls: ['./sleepiness-modal.component.scss'],
  providers: [DatePipe],
  imports: [IonicModule, FormsModule],
  standalone: true
})
export class SleepinessModalComponent  implements OnInit {
  currentTime: string = '';
  sleepinessLevel: number = 1;

  constructor(private sleepService: SleepService, private datePipe: DatePipe) { }

  ngOnInit() {}

  get scaleDescription(): string {
    return StanfordSleepinessData.ScaleValues[this.sleepinessLevel] || '';
  }

  recordSleepiness() {
    const now = new Date();
    this.currentTime = this.datePipe.transform(now, 'shortTime') || '';
    const sleepinessData = new StanfordSleepinessData(this.sleepinessLevel, now);
    this.sleepService.logSleepinessData(sleepinessData);
    console.log('Recorded sleepiness:', sleepinessData.summaryString());
  }

}
