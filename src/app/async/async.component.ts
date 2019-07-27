import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, toArray, delay } from 'rxjs/operators';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  private options$: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.options$ = Observable.create(
      (observer) => {
        for(let i = 0; i < 10; i++){
          observer.next(`This is my ${i}th option`);
        }
        observer.complete();
      }
    )
    .pipe(
      map(s=>s+'!'),
      toArray(),
      delay(2000)
    );

    this.options$.subscribe(s=>console.log(s));
  }

}
