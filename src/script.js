import Rx from 'rxjs/Rx';
import "babel-polyfill";


const target = document.getElementById('target').textContent;

switch (target) {
  case 'combineAll'://ストリームを結合
  {
    const stremaA = Rx.Observable.of('a').delay(1000);
    const streamB = stremaA.map(v =>{
      console.log(1, v);
      return Rx.Observable.of('b').delay(1000)
    });
    const streamC =streamB.combineAll(val => val);
    streamC.subscribe(v => console.log(2, v));
  }
    break;

  case 'combineLatest'://値を結合(ForkJointと違い数が揃ったら流れ始める)
  {
    const stremaA = Rx.Observable.from([1,2,3]).delay(800);
    const stremaB = Rx.Observable.of('b').delay(500);
    const stremaC = Rx.Observable.of('c').delay(600);
    const stremaD = Rx.Observable.of('d').delay(100);

    const combined = Rx.Observable.combineLatest(
      stremaA,
      stremaB,
      stremaC,
      stremaD
    );
    combined.subscribe(v => console.log(v));
  }
  break;

  case 'concat'://ストリームを直列で流す
  {
    const stremaA = Rx.Observable.of('a').delay(800);
    const stremaB = Rx.Observable.of('b').delay(500);

    const combined = stremaA.concat(stremaB);
    combined.subscribe(v => console.log(v));
  }
  break;

  case 'concatAll'://ストリームを直列で流す?
  {
    const stremaA = Rx.Observable.of('a').delay(800);
    const combined = stremaA.map(v => console.log('!')||Rx.Observable.of(v+'b').delay(500)).concatAll();
    combined.subscribe(v => console.log(v));
  }
  break;
  
  case 'forkJoin'://値を結合(combineLatestと違い最後のストリームで流れる)
  {
    Rx.Observable.forkJoin(
      Rx.Observable.from([1,2,3]).delay(800),
      Rx.Observable.of('b').delay(500),
      Rx.Observable.of('c').delay(600)
    ).subscribe(v => console.log(v));
  }
  break;

  case 'merge'://ストリームをまとめて購読
  {
    Rx.Observable.merge(
      Rx.Observable.from([1,2,3]).delay(800),
      Rx.Observable.of('b').delay(500),
      Rx.Observable.of('c').delay(600)
    ).subscribe(v => console.log(v));
  }
  break;

  case 'mergeAll'://ストリームをまとめて購読
  {
    Rx.Observable.from([1,2,3])
      .map(val => Rx.Observable.of('a'+val))
      .mergeAll()
      .subscribe(v => console.log(v));
  }
  break;

  case 'pairwise'://前の値と今の値を配列で送る
  {
    Rx.Observable.from([1,2,3])
      .pairwise()
      .subscribe(v => console.log(v));
  }
  break;
  
  case 'race'://１番早いやつを表示
  {
    Rx.Observable.race(
      Rx.Observable.of('b').delay(800),
      Rx.Observable.of('b').delay(500),
      Rx.Observable.of('c').delay(600)
    ).subscribe(v => console.log(v));
  }
  break;
  
  case 'startWith'://ストリームの最初に追加
  {
    Rx.Observable.of(1,2,3).startWith(0)
        .subscribe(v => console.log(v));
  }
  break;

  case 'withLatestFrom'://ストリームの最後を追加
  {
    Rx.Observable.of(1,2,3)
        .withLatestFrom(Rx.Observable.of('a','b','c'))
        .subscribe(v => console.log(v));
  }
  break;
  
  case 'zip'://ストリームをまとめて配列で返す
  {
    Rx.Observable.zip(
      Rx.Observable.of('a').delay(800),
      Rx.Observable.of('b').delay(500),
      Rx.Observable.of('c').delay(600)
    ).subscribe(v => console.log(v));
  }
  break;

  case 'defaultIfEmpty': // まだ値が流れいていない場合に流す値を指定できる
  {
    Rx.Observable.of()
      .defaultIfEmpty(1)
      .subscribe(val => console.log(val));

    Rx.Observable.empty()
      .defaultIfEmpty('a')
      .subscribe(val => console.log(val));
  }
  break;

  case 'every':
  {
    Rx.Observable.of(1,2,3,4,5)
      .every(val => val < 6)
      .subscribe(v => console.log(v)); //true
    Rx.Observable.of(1,2,3,4,5)
      .every(val => val > 6)
      .subscribe(v => console.log(v)); //false
    }
  break;

  case 'subscribe':
    Rx.Observable
      .of(1)
      .subscribe( v => console.log(v));
      break;
  
  case 'of':
    Rx.Observable
      .of(1)
      .subscribe( v => console.log(1,v));
    Rx.Observable
      .of(1,2,3)
      .subscribe( v => console.log(2,v));
      break;

  case 'from':
    Rx.Observable
      .from([2,3,4])
      .subscribe( v => console.log(1,v));
    Rx.Observable
      .from('abcd')
      .subscribe( v => console.log(2,v));
      break;

  case 'fromEvent':
    const button = document.querySelector('button');
    Rx.Observable
      .fromEvent(button, 'click')
      .subscribe( () => console.log('clicked!!'));
      break;
    
  default:
    break;
}
/* sample1 */

// const store = new Rx.BehaviorSubject(1); 

// store.subscribe(data => {
//   console.log(1,data);
// });

// store.subscribe(data => {
//   console.log(2,data);
// });

// document.body.addEventListener('click', () => {
//   store.next(store.value + 1);
// });

// const store = new Rx.BehaviorSubject({
  // name:"西畑",
  // age:38
// }); 

/* sample2 */

// store.subscribe(data => {
  // document.querySelector('#name').innerHTML = data.name;
// });

// store.subscribe(data => {
  // document.querySelector('#age').innerHTML = data.age;
// });

// document.querySelector('#name_filed').addEventListener('keyup', e => {
  // store.next(Object.assign(store.value,{
    // name:e.currentTarget.value
  // }));
// });
// document.querySelector('#age_filed').addEventListener('keyup', e => {
  // store.next(Object.assign(store.value, {
    // age:e.currentTarget.value
  // }));
// });

/* sample3 */

// const streamA = Rx.Observable.of('西畑').delay(1000);
// const streamB = Rx.Observable.of('28').delay(500);

// Rx.Observable.forkJoin(
//   streamA,
//   streamB
// ).subscribe(
//   data => console.log(`${data[0]}の年齢は${data[1]}`)
// );

/* sample4 */

// const data = {}

// function *myFunc(){
//   yield;
//   console.log(`${data.name}の年齢は${data.age}`)
// }
// const myFuncG = myFunc()

// Rx.Observable.of('西畑').delay(500).subscribe(res => {
//   data.name = res;
//   myFuncG.next();
// });

// Rx.Observable.of('28').delay(1000).subscribe(res => {
//   data.age = res;
//   myFuncG.next();
// });

/* sample5 */

// const myFunc = async () => {
//   const A = await Rx.Observable.of('西畑').delay(1000).toPromise()
//   const B = await Rx.Observable.of('28').delay(500).toPromise()
//   console.log(`${A}の年齢は${B}`)
// }
// myFunc();


/* sample6 */
// 購読管理

// const subscription = new Rx.Subscription();
// const s1 = Rx.Observable.interval(1000).subscribe(x => console.log(1,x));
// subscription.add(s1);
// const s2 = Rx.Observable.interval(300).subscribe(x => console.log(2,x));
// subscription.add(s2);
// document.body.addEventListener('click', () => {
//   subscription.unsubscribe();
// });
