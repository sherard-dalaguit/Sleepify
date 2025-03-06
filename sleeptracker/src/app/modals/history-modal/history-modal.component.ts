import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SleepService} from "../../services/sleep.service";
import {SleepData} from "../../data/sleep-data";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss'],
  imports: [IonicModule, FormsModule, NgForOf],
  standalone: true
})
export class HistoryModalComponent  implements OnInit {
  selectedHistory: string = 'overnight';

  constructor(private sleepService: SleepService) {}

  ngOnInit() {
    const overnight = this.sleepService.getOvernightData();
    const sleepiness = this.sleepService.getSleepinessData();

    console.log(overnight)
    console.log(sleepiness)
  }

  getRecords(): SleepData[] {
  if (this.selectedHistory === 'overnight') {
    return this.sleepService.getOvernightData();
  } else {
    return this.sleepService.getSleepinessData();
  }
}

  clearHistory() {
    this.sleepService.clearHistory().then(() => {
      console.log('History cleared');
    }).catch(err => {
      console.error('Failed to clear history:', err);
    })
  }
}
