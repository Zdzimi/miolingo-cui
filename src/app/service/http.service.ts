import { SigningUser } from './../model/signingUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubmittedUser } from '../model/submittedUser';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  signUp(signingUser: SigningUser): Observable<SubmittedUser> {
    return this.httpClient.post<SigningUser>(`${this.url}/miolingo/sign-up`, signingUser);
  }

  signIn(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/miolingo/main`)
  }

}
