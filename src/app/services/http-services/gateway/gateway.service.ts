import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
// TODO @Danny remove
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GatewayService<T> {
    private _http = inject(HttpClient);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get<T>(path: string, params?: HttpParams, httpResponse?: 'response', type?: any): Observable<any> {
        return httpResponse
            ? this._http.get(path, {
                  observe: httpResponse,
                  params,
                  responseType: type,
              })
            : this._http.get<T>(path, { params });
    }

    post<T>(path: string, payload: T | null, options?: object): Observable<T> {
        return this._http.post<T>(path, payload, options);
    }

    put<T>(path: string, payload: T): Observable<T> {
        return this._http.put<T>(path, payload);
    }

    patch<T>(path: string, payload: object): Observable<T> {
        return this._http.patch<T>(path, payload);
    }

    delete<T>(path: string, params?: HttpParams): Observable<T> {
        if (params) {
            return this._http.delete<T>(path, { params });
        } else {
            return this._http.delete<T>(path);
        }
    }
}
