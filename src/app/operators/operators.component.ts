import { Component, OnInit } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mapClick() {
    from([1, 2, 3, 4, 5, 6, 7]).pipe(
      map(i => i*2),
      map(i => i*10),
      delay(2000)
    ).subscribe(i => console.log(i));

    fromEvent(document, 'click').pipe(
      map((e: MouseEvent) => ({x: e.screenX, y: e.screenY}))
    ).subscribe((pos) => console.log(pos));
  }
}
