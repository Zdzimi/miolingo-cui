import { SigningUser } from './../model/signingUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubmittedUser } from '../model/submittedUser';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  signUp(signingUser: SigningUser): Observable<SubmittedUser> {
    return this.httpClient.post<SigningUser>(`${this.url}/miolingo/sign-up`, signingUser);
  }

  signIn(): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/miolingo/sign-in`);
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/logout`, {});
  }

}
