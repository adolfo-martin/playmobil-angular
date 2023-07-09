import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StatusManagementService } from '../status-management.service';

type TSeries = [any];

@Injectable({
  providedIn: 'root'
})
export class PlaymobilService {

  constructor(private http: HttpClient) { }

  public retrieveSeries$(): Observable<TSeries> {
    const url = 'http://127.0.0.1:8082/api/series';
    
    return this.http.get<{series: TSeries}>(url).pipe(
      map<{series: TSeries}, TSeries>(data => data.series)
    );
  }
}