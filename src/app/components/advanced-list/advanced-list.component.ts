import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, Observable, Subject, combineLatest, of, every} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JobPostsModel } from '../../models/job-posts.model';
import { JobsService } from '../../services/jobs.service';
import { JobTagsModel } from '../../models/job-tags.model';


@Component({
  selector: 'app-advanced-list',
  styleUrls: ['./advanced-list.component.scss'],
  templateUrl: './advanced-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedListComponent {
  private _orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('asc');
  public order$: Observable<string> = this._orderSubject.asObservable();
  private _tagSubject: Subject<string[]> = new Subject<string[]>();
  public tag$: Observable<string[]> = this._tagSubject.asObservable();

  readonly jobPosts$: Observable<JobPostsModel[]> = combineLatest([
    this._jobsService.getAll(),
    this.order$,
    this.tag$
  ]).pipe(
    map(([jobPosts, order,tag]: [JobPostsModel[], string,string[]]) => {
      return jobPosts.filter(
      (jobPosts:JobPostsModel)=>jobPosts.jobTagIds.some(i=>tag.includes(i))
      ).sort((a, b) => {
        if (a.title < b.title) { return order === 'asc' ? 1 : -1; }
        if (a.title > b.title) { return order === 'asc' ? -1 : 1; }
        return 0;
      })


    })
  )



  public orders: Observable<string[]> = of(['asc', 'desc']);

  private _refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
  public refresh$: Observable<void> = this._refreshSubject.asObservable();
  readonly refreshedList$: Observable<JobPostsModel[]> = this.refresh$.pipe(switchMap(data => this.jobPosts$));



  sort(order: string): void {
    this._orderSubject.next(order);
  }
  constructor(private _jobsService: JobsService) {
  }

  readonly jobTags$: Observable<JobTagsModel[]> = this._jobsService.getJobTags();

  remove(id: string): void {
    this._jobsService.delete(id).subscribe();
  }
selectedOptions:any;
  public tags : string[] = [];

  change($event:string[]){
  this.tags=$event;
  this._tagSubject.next(this.tags);
  console.log(this.tags)
}

}
