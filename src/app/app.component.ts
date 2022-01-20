import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  combineLatest,
  from,
  interval,
  Observable,
  of,
  Subject,
  Subscriber,
} from 'rxjs';
import {
  publish,
  publishReplay,
  refCount,
  share,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private httpClient: HttpClient) {
    /* const ofSub$ = of(1);
    const one = 1;
    const testFrom = new Observable((subscriber: Subscriber<number>) => {
      const array = [1, 2, 3];
      for (let i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });

    testFrom.subscribe(
      () => console.log('of emit'),
      () => {},
      () => console.log('of complete')
    );

    testFrom.subscribe(
      () => console.log('of emit'),
      () => {},
      () => console.log('of complete')
    );

    const serverRequest$ = httpClient.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    serverRequest$.subscribe(
      () => console.log('emit'),
      () => console.log('error'),
      () => console.log('complete')
    );
    serverRequest$.subscribe(
      () => console.log('emit'),
      () => console.log('error'),
      () => console.log('complete')
    );
    serverRequest$.subscribe(
      () => console.log('emit'),
      () => console.log('error'),
      () => console.log('complete')
    );

    const mySubject = interval(1000).pipe(take(2));
    mySubject.subscribe(
      () => console.log('my subj'),
      () => console.log('my subj error'),
      () => console.log('my subj complete')
    );

    setTimeout(() => {
      mySubject.subscribe(
        () => console.log('my subj'),
        () => console.log('my subj error'),
        () => console.log('my subj complete')
      );
    }, 5000);*/
    /*  this.data$ = of(1).pipe(
      switchMap(() =>
        httpClient.get('https://jsonplaceholder.typicode.com/users')
      ) /*= this.filter$.pipe(
      switchMap(() =>
        httpClient.get('https://jsonplaceholder.typicode.com/users')
      ),*/
    //share()
    //если был complete будет подписан заново при помощи нового Subject
    //актуально для Observable которые при подписке заново эмитят события
    //publish(),
    //refCount()
    //если был complete будет вызван только complete
    //принцип работы после срабатывания refCount() (все отписались)
    //shareReplay({ refCount: true, bufferSize: 2 })
    //shareReplay({ refCount: true, bufferSize: 2 })
    //если был завершен - выдаст complete, без воспроизведения истории
    //если не был завершен - подпишется заново, без воспроизведения истории
    //shareReplay({ refCount: false, bufferSize: 1 })
    //shareReplay({ refCount: false, bufferSize: 1 }) == shareReplay(1)
    //если был завершен - выдаст историю + complete
    //если не был завершен - выдаст историю (будет продолжать получать результат, с учетом времени пока не было подписок)
    //publishReplay(1),
    //refCount()
    //publishReplay(1),refCount()
    //если был завершен - выдаст историю + complete
    //если не был завершен - выдаст историю (будет получать результаты заново)
    /*  );

    let sub1 = this.data$.subscribe((x) => console.log('sub1'));
    let sub2 = this.data$.subscribe((x) => console.log('sub2'));
    this.filter$.next();

    setTimeout(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
      console.log('all unsubscribe');
      this.filter$.complete();
    }, 1000);
  }
  filter$ = new Subject<void>();
  data$?: Observable<object>;

  upd(): void {
    let sub1 = this.data$!.subscribe(
      (x) => console.log('[2] sub1'),
      () => {},
      () => console.log('[2] sub1 complete')
    );
    let sub2 = this.data$!.subscribe(
      (x) => console.log('[2] sub2'),
      () => {},
      () => console.log('[2] sub2 complete')
    );
    this.filter$.next();*/

    this.data$
      .pipe(
        switchMap((x) =>
          combineLatest([
            this.httpClient.get('https://jsonplaceholder.typicode.com/users'),
            /*this.httpClient
              .get('https://jsonplaceholder.typicode.com/todos/1')
              .pipe(startWith([undefined])),*/
            this.innerCombineLatest$,
          ])
        )
      )
      .subscribe((x) => console.log(x));
  }

  data$ = new Subject<void>();
  innerCombineLatest$ = new Subject<void>();

  invokeCombineLatest(): void {
    this.data$.next();
  }

  innerCombineEmit(): void {
    this.innerCombineLatest$.next();
  }
}
export function fromArrayLike<T>(array: ArrayLike<T>) {
  return new Observable((subscriber: Subscriber<T>) => {
    for (let i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
