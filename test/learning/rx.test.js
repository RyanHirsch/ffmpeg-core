import Rx from 'rxjs';
import expect from 'expect';

describe('learning rxjs', function() {
  it('simple from array', done => {
    const arr = [ 'a', 'b', 'c', 'd' ];
    const something$ = Rx.Observable.from(arr);
    something$
      .subscribe({
        next: val => expect(arr).toContain(val),
        complete: done,
      });
  });

  it('can create a custom observable', done => {
    const observable = Rx.Observable.create(function (observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 0);
    });

    observable.subscribe({
      next: x => expect(x).toBeLessThan(5),
      error: err => console.error(`something wrong occurred: ${err}`),
      complete: done,
    });
  });
});
