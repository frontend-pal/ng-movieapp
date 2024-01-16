import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/core/services/moviedb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private moviedbService: MoviedbService
  ) { }

  ngOnInit(): void {
    this.getSeries();
    this.getGenres();
  }

  getSeries() {
    this.moviedbService.getSeries().subscribe(res => {
      console.log(res);
    })
  }

  getGenres() {
    this.moviedbService.getGenres().subscribe(res => {
      console.log(res);
    })
  }
}
