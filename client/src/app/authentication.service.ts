import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'

export interface UserDetails {
    _id: string
    first_name: string
    last_name: string
    email: string
    password: string
    exp: number
    iat: number
}

interface TokenResponse {
    token: string
}

export interface TokenPayload {
    _id: string
    first_name: string
    last_name: string
    email: string
    password: string
}

@Injectable()
export class AuthenticationService{
    private token: string

    constructor(private http: HttpClient, private router: Router) {}

    private saveToken(token: string): void {
        sessionStorage.setItem('usertoken', token)
        this.token = token
    }

    private getToken(): string{
        if(!this.token){
            this.token = sessionStorage.getItem('usertoken')
        }
        return this.token
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken()
        let payload 
        if(token) {
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        }else{
            return null
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails()
        if(user) {
            return user.exp > Date.now() / 1000
        }else{
            return false
        }
    }

    public register(user: TokenPayload): Observable<any> {
        const base = this.http.post('/users/register', user)
        const request = base.pipe(
            map((data: TokenResponse) => {
                if(data.token){
                    this.saveToken(data.token)
                    alert("You have successfully registed on Discoverus.");
                }
                return data
            })
        )
        return request
    }

    public login(user: TokenPayload): Observable<any> {
        const base = this.http.post('/users/login', user)
       
        const request = base.pipe(
            map((data: TokenResponse) => {
                if(data.token){
                    this.saveToken(data.token)
                    alert("You have successfully logged in.");
                }
                return data
            })
        )
        return request
    }

    public profile(): Observable<any> {
        return this.http.get(`/users/profile`, {
          headers: { Authorization: ` ${this.getToken()}` }
        })
      }

    public home(): Observable<any> {
    return this.http.get(`/users/profile`, {
        headers: { Authorization: ` ${this.getToken()}` }
    })
    }
    
    public logout(): void {
    this.token = ''
    window.sessionStorage.removeItem('usertoken')
    alert("You have successfully logged out.");
    this.router.navigateByUrl('/')
    }
}
