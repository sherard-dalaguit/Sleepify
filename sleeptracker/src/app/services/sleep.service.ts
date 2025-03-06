import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {SleepData} from '../data/sleep-data';
import {OvernightSleepData} from '../data/overnight-sleep-data';
import {StanfordSleepinessData} from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

  private _storage: Storage | null = null;

	constructor(private storage: Storage) {
    this.init();
	}

  private async init() {
    this._storage = await this.storage['create']();
    await this.loadData();

    if (SleepService.LoadDefaultData && SleepService.AllSleepData.length === 0) {
      this.addDefaultData();
      SleepService.LoadDefaultData = false;
    }
  }

  private async loadData() {
    if (!this._storage) return;
    const allDataString = await this._storage['get']('AllSleepData');
    if (!allDataString) return;

    try {
      const parsed: any[] = JSON.parse(allDataString);

      SleepService.AllSleepData = [];
      SleepService.AllOvernightData = [];
      SleepService.AllSleepinessData = [];

      for (const item of parsed) {
        if (item.sleepStart && item.sleepEnd) {
          const overnight = new OvernightSleepData(
            new Date(item.sleepStart),
            new Date(item.sleepEnd)
          );
          SleepService.AllSleepData.push(overnight);
          SleepService.AllOvernightData.push(overnight);
        } else if (item.loggedValue !== undefined) {
          const sleepiness = new StanfordSleepinessData(
            item.loggedValue,
            new Date(item.loggedAt)
          );
          SleepService.AllSleepData.push(sleepiness);
          SleepService.AllSleepinessData.push(sleepiness);
        }
      }
    } catch (err) {
      console.error('Failed to parse sleep data:', err);
    }
  }

  private async saveData() {
    if (!this._storage) return;

    const allDataObjects = SleepService.AllSleepData.map((d) => {
      if (d instanceof OvernightSleepData) {
        return {
          sleepStart: (d as OvernightSleepData)['sleepStart'],
          sleepEnd: (d as OvernightSleepData)['sleepEnd'],
          loggedAt: d.loggedAt
        };
      }
      else if (d instanceof StanfordSleepinessData) {
        return {
          loggedValue: (d as StanfordSleepinessData)['loggedValue'],
          loggedAt: d.loggedAt
        };
      }
      return {
        loggedAt: d.loggedAt
      };
    });

    await this._storage['set']('AllSleepData', JSON.stringify(allDataObjects));
  }

  public async clearHistory(): Promise<void> {
    SleepService.AllSleepData = [];
    SleepService.AllOvernightData = [];
    SleepService.AllSleepinessData = [];
    if (this._storage) {
      await this._storage.remove('AllSleepData');
      // Optionally, if you store a flag for defaults, you could remove it as well.
      await this._storage.remove('hasLoadedDefaults');
    }
  }

	private addDefaultData() {
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
    this.saveData();
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
    this.saveData();
	}

  public getOvernightData():OvernightSleepData[] {
    return SleepService.AllOvernightData;
  }

  public getSleepinessData():StanfordSleepinessData[] {
    return SleepService.AllSleepinessData;
  }
}
