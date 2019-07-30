import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person.model';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {

  searchInput: string = '';
  people$: Observable<Person[]>;

  constructor() { }

  ngOnInit() {
  }

}
