import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPostsModel } from '../models/job-posts.model';
import { JobTagsModel } from '../models/job-tags.model';

@Injectable()
export class JobsService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<JobPostsModel[]> {
    return this._httpClient.get<JobPostsModel[]>('https://my-json-server.typicode.com/azosa/dbJobs/posts');
  }

  getJobTags(): Observable<JobTagsModel[]> {
    return this._httpClient.get<JobTagsModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags');
  }

  delete(id: string): Observable<JobPostsModel> {
    return this._httpClient.delete<JobPostsModel> ('https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts/'+id);
  }
}
