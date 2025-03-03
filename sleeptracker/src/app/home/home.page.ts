import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { DatePipe } from '@angular/common';
import {IonicModule, ModalController} from '@ionic/angular';
import { SleepModalComponent } from '../modals/sleep-modal/sleep-modal.component';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import {SleepinessModalComponent} from "../modals/sleepiness-modal/sleepiness-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe],
  imports: [IonicModule],
  standalone: true
})
export class HomePage {
  currentTime: string = '';

  constructor(public sleepService:SleepService, private datePipe: DatePipe, private modalController: ModalController) {

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

  async logSleep() {
    const modal = await this.modalController.create({
      component: SleepModalComponent,
      cssClass: ['auto-height', 'bottom']
    });
    await modal.present();
  }

  async logSleepiness() {
    const modal = await this.modalController.create({
      component: SleepinessModalComponent,
      cssClass: ['auto-height', 'bottom']
    });
    await modal.present();
  }

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}
}
