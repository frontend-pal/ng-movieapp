import { Component } from '@angular/core';
import { MoviedbService } from 'src/app/core/services/moviedb.service';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  search: string = '';

  constructor(private moviedbService: MoviedbService) { }

  emitSearch(event: Event): void {
    const target = event?.target as HTMLInputElement;
    const value = target.value;

    if (value && value !== '') {
      this.sendSearch(value);
    } else if (value === '') {
      this.sendSearch(value);
    }
  }

  sendSearch(searchValue: string) {
    this.moviedbService.setSearch(searchValue);
  }

  modelChanged(value: string) {
    if (value === '') {
      this.sendSearch(value);
    }
  }
}
