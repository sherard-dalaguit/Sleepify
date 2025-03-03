import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SleepService} from "../../services/sleep.service";
import {OvernightSleepData} from "../../data/overnight-sleep-data";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sleep-modal',
  templateUrl: './sleep-modal.component.html',
  styleUrls: ['./sleep-modal.component.scss'],
  imports: [IonicModule, FormsModule, NgIf],
  standalone: true
})
export class SleepModalComponent  implements OnInit {

  fellAsleepDate: string = new Date().toISOString();
  fellAsleepTime: string = new Date().toISOString();
  wokeUpDate: string = new Date().toISOString();
  wokeUpTime: string = new Date().toISOString();
  errorMessage: string = '';

  constructor(private sleepService: SleepService) { }

  ngOnInit() {}

  recordSleep() {
    const sleepStart = this.combineDateAndTime(this.fellAsleepDate, this.fellAsleepTime);
    const sleepEnd = this.combineDateAndTime(this.wokeUpDate, this.wokeUpTime);

    if (sleepEnd < sleepStart) {
      this.errorMessage = "You can't wake up before you go to sleep!";
      return;
    } else {
      // clears the error message if validation passes.
      this.errorMessage = '';
    }

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
