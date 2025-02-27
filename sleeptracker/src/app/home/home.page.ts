import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { DatePipe } from '@angular/common';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  standalone: true
})
export class HomePage {
  currentTime: string = '';

  constructor(public sleepService:SleepService, private datePipe: DatePipe) {

	}

	ngOnInit() {
		console.log(this.allSleepData);
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
	}

  updateTime() {
    const now = new Date();
    this.currentTime = this.datePipe.transform(now, 'shortTime') || '';
  }

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Night';
    }
  }

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}
}
