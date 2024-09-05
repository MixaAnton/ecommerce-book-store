import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  faSearch = faSearch;

  router= inject(Router);

  doSearch(input:string){
      this.router.navigateByUrl(`/search/${input}`);
  }
}
