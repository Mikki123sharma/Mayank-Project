import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    baseUrl = 'https://ap.greatfuturetechno.com';

    constructor(private http: HttpClient) { }

    // Login
    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/login/`, { username, password });
    }

    // Logout
    logout(token: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            })
        };
        return this.http.post<any>(`${this.baseUrl}/logout/`, {}, httpOptions);
    }

    // Get Party by ID
    getPartyById(id: number, token: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            })
        };
        return this.http.get<any>(`${this.baseUrl}/party/?id=${id}`, httpOptions);
    }

    // Get All Parties
    getAllParties(token: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            })
        };
        return this.http.get<any>(`${this.baseUrl}/party/`, httpOptions);
    }

    // Post Party
    postParty(data: any, token: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            })
        };
        return this.http.post<any>(`${this.baseUrl}/party/`, data, httpOptions);
    }

    // Update Party
    updateParty(id: number, data: any, token: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            })
        };
        return this.http.put<any>(`${this.baseUrl}/party/?id=${id}`, data, httpOptions);
    }

    // Delete Party
    deleteParty(id: number, token: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            })
        };
        return this.http.delete<any>(`${this.baseUrl}/party/?id=${id}`, httpOptions);
    }
}
