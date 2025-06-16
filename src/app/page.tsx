'use client';

import { useState } from 'react';
import styles from './page.module.css';

const BOARD_SIZE = 9;
const MINE_COUNTE = 10;

function make2DArray<T>(rows: number, cols: number, val: T): T[][] {
  return Array.from({ length: rows }, () => Array<T>(cols).fill(val));
}

const placeMines = (board: number[][]): number[][] => {
  const result = board.map((row) => [...row]);
  let placed = 0;
  while (placed < MINE_COUNTE) {
    const r = Math.floor(Math.random() * BOARD_SIZE);
    const c = Math.floor(Math.random() * BOARD_SIZE);
    if (result[r][c] !== -1) {
      result[r][c] = -1;
      placed++;
    }
  }
  return result;
};

// const calcTotalPoint = (arr: number[], counter: number) => {
//   let result = 0;
//   for (const item of arr) {
//     result += item;
//   }
//   return result + counter;
// };
// // const down = (n: number) => {
// //   if (n < 0) {
// //     return down;
// //   } else {
// //     console.log(n);
// //     down(n - 1);
// //   }
// // };
// // down(10);
// // const sum1 = (n: number): number => {
// //   if (n === 0) return 0;
// //   return n + sum1(n - 1);
// // ; }/*今nに10が入っていて、もしnが0だったらreturn(終了)nが0じゃないから次の行に進んで、
// 10+9が実行されて、関数内に同じ関数名が出現しているから再起関数でまた最初に戻る。if文は1行の時{}は省略できる、
// elseは使っても使わなくてもいい。22行～23行目までが合計を出すのに最短ルート*/
// console.log(sum1(10));

// const sum2 = (a: number, b: number): number => {
//   return a === b + 1 ? 0 : a + sum2(a + 1, b); //三項演算子
// };
// console.log(sum2(4, 10));

// const sum3 = (c: number, d: number): number => {
//   return ((d - c + 1) / 2) * (c + d); //等比数列の和→こっちの方がメモリを消費せず計算が早い
// };
// console.log(sum3(4, 10));
export default function Home() {
  // ③ BOARD_SIZE×BOARD_SIZE の二次元配列 state
  const [board, setBoard] = useState<number[][]>(() => {
    const emptyBoard = make2DArray(BOARD_SIZE, BOARD_SIZE, 0);
    const boardWithMines = placeMines(emptyBoard);
    return boardWithMines;
  });

  // ④ セルクリック時にそのマスの値を +1 する例
  const onClickCell = (r: number, c: number) => {
    setBoard((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] += 1;
      return next;
    });
  };
  return (
    <div className={styles.container}>
      {/* ⑤ CSS Grid で BOARD_SIZE 列に並べる */}
      <div
        className={styles.board}
        // style={{
        //   gridTemplateColumns: `repeat(${BOARD_SIZE}, 30px)`,
        // }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div key={`${r}-${c}`} onClick={() => onClickCell(r, c)} className={styles.cell} />
          )),
        )}
      </div>
    </div>
  );
}
