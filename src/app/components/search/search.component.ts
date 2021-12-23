import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { } // Inject the Router

  doSearch(keyword: string) {
    console.log(`keyword=${keyword}`);
    this.router.navigateByUrl(`/search/${encodeURIComponent(keyword)}`);
  }

  ngOnInit(): void { }

}
