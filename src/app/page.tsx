'use client';

import { useState } from 'react';
import styles from './page.module.css';
const calcTotalPoint = (arr: number[], counter: number) => {
  let result = 0;
  for (const item of arr) {
    result += item;
  }
  return result + counter;
};
const down = (n: number) => {
  if (n < 0) {
    return down;
  } else {
    console.log(n);
    down(n - 1);
  }
};
down(10);
const sum1 = (n: number): number => {
  if (n === 0) return 0;
  return n + sum1(n - 1);
}; /*今nに10が入っていて、もしnが0だったらreturn(終了)nが0じゃないから次の行に進んで、
10+9が実行されて、関数内に同じ関数名が出現しているから再起関数でまた最初に戻る。if文は1行の時{}は省略できる、
elseは使っても使わなくてもいい。22行～23行目までが合計を出すのに最短ルート*/
console.log(sum1(10));

const sum2 = (a: number, b: number): number => {
  return a === b + 1 ? 0 : a + sum2(a + 1, b); //三項演算子
};
console.log(sum2(4, 10));

const sum3 = (c: number, d: number): number => {
  return ((d - c + 1) / 2) * (c + d);
};
console.log(sum3(4, 10));
export default function Home() {
  const [samplePoints, setsamplePoints] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  console.log(samplePoints);
  const [sampleCounter, setsampleCounter] = useState(0);
  console.log(sampleCounter);
  const clickHandler = () => {
    const newSamplePoints = structuredClone(samplePoints);
    newSamplePoints[sampleCounter] += 1;
    setsamplePoints(newSamplePoints);
    setsampleCounter((sampleCounter + 1) % 14);
    //samplecounterは定数、setsamplecounterになると数値を更新して値が変わる
  };
  const totalPoint = calcTotalPoint(samplePoints, sampleCounter);
  console.log(totalPoint);
  return (
    <div className={styles.container}>
      <div
        className={styles.samplecell}
        style={{ backgroundPosition: `${sampleCounter * -30}px` }}
      />
      <button onClick={clickHandler}>クリック</button>
    </div>
  );
}
