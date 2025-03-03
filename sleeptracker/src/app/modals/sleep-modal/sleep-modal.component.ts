import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SleepService} from "../../services/sleep.service";
import {OvernightSleepData} from "../../data/overnight-sleep-data";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sleep-modal',
  templateUrl: './sleep-modal.component.html',
  styleUrls: ['./sleep-modal.component.scss'],
  imports: [IonicModule, FormsModule],
  standalone: true
})
export class SleepModalComponent  implements OnInit {

  fellAsleepDate: string = new Date().toISOString();
  fellAsleepTime: string = new Date().toISOString();
  wokeUpDate: string = new Date().toISOString();
  wokeUpTime: string = new Date().toISOString();

  constructor(private sleepService: SleepService) { }

  ngOnInit() {}

  recordSleep() {
    const sleepStart = this.combineDateAndTime(this.fellAsleepDate, this.fellAsleepTime);
    const sleepEnd = this.combineDateAndTime(this.wokeUpDate, this.wokeUpTime);

    const overnightData = new OvernightSleepData(sleepStart, sleepEnd);

    this.sleepService.logOvernightData(overnightData);

    console.log('Overnight sleep recorded: ', overnightData.summaryString());
  }

  private combineDateAndTime(date: string, time: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes);
  }
}
