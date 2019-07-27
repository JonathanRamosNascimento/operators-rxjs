import { Component, OnInit } from '@angular/core';
import { interval, Subscription, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  private subscriptionsAreActive = false;
  private subscripitons: Subscription[] = [];
  private unsubscribeAll$: Subject<any> = new Subject();
  private intervalSubscription: Subscription = null;

  constructor() { }

  ngOnInit() {
    this.checkSubscriptions();
  }

  checkSubscriptions() {
    this.intervalSubscription = interval(100).subscribe(() => {
      let active = false;
      this.subscripitons.forEach((s) => {
        if (!s.closed)
          active = true;
      })
      this.subscriptionsAreActive = active;
    })
  }

  subscribe() {
    const subscripiton1 = interval(100)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((i) => {
        console.log(i);
      })
    const subscripiton2 = fromEvent(document, 'mousemove')
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((e) => console.log(e));
    this.subscripitons.push(subscripiton1);
    this.subscripitons.push(subscripiton2);
  }

  unsubscribe() {
    this.unsubscribeAll$.next();
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription != null) {
      this.intervalSubscription.unsubscribe();
    }
    console.log('Destroy');
    this.unsubscribeAll$.next();
  }

}
