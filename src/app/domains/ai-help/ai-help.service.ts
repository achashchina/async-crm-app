import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AIHelpService {
  constructor(private http: HttpClient) {}

  getListOfFilesFragment(params: {
    query: string;
    logic: string;
  }): Observable<any> {
    const { query, logic } = params;
    return this.http.get<any>(
      `${environment.apiUrl}/search/?q=${encodeURIComponent(query)}&logic=${logic}`
    );
  }
}
