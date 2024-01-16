import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

type GenreType = 'movie' | 'tv';
@Injectable()
export class MoviedbService {

  constructor(
    private http: HttpClient
  ) {
  }

  getMovies(lang = 'es-MX'): Observable<Response> {
    let params = new HttpParams().set('language', lang);

    return this.http.get<Response>(environment.apiUrl + 'trending/movie/day', { params });
  }

  getSeries(genre = '', lang = 'es-MX'): Observable<Response> {
    let params = new HttpParams().set('language', lang);

    params = params.append('sort_by', 'popularity.desc');

    if (!!genre) {
      params = params.append('with_genres', genre);
    }

    return this.http.get<Response>(environment.apiUrl + 'discover/tv', { params });
  }

  getGenres(type: GenreType = 'tv', lang = 'es-MX'): Observable<Response> {
    let params = new HttpParams().set('language', lang);

    return this.http.get<Response>(environment.apiUrl + 'genre/' + type + '/list', { params });
  }
}
