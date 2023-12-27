import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let timeIteration = new Array();

    await runningIteration(1, 1);
    await timeIteration.push(await runningIteration(4, 0));
    await timeIteration.push(await runningIteration(64, 0));
    await timeIteration.push(await runningIteration(1024, 0));
    await timeIteration.push(await runningIteration(163884, 0));
    await timeIteration.push(await runningIteration(2622144, 0));
    await timeIteration.push(await runningIteration(41954304, 0));

    return Response.json({ data: timeIteration });
  } catch (error) {
    throw new Error();
  }
}

async function runningIteration(total: number, target: any) {
  const arr = [];
  for (let index = 0; index < total; index++) {
    arr.push(index);
  }

  const start = performance.now();
  const result = await binarySearch(arr, target);
  const end = performance.now();

  return { time: end - start, totalData: total };
}

async function binarySearch(arr: any[], target: any) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // elemen ditemukan, kembalikan indeksnya
    } else if (arr[mid] < target) {
      left = mid + 1; // cari di sebelah kanan
    } else {
      right = mid - 1; // cari di sebelah kiri
    }
  }

  return -1; // elemen tidak ditemukan
}
