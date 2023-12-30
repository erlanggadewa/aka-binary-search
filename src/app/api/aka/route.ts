import { NextRequest } from "next/server";

const arr = Array.from({ length: 300000 }, (_, index) => index);

export async function GET(request: NextRequest) {
  try {
    const iterationPromises = [
      runningIteration(1024, 0),
      runningIteration(2048, 0),
      runningIteration(4096, 0),
      runningIteration(8192, 0),
      runningIteration(13384, 0),
      // runningIteration(65536, 0),
      // runningIteration(131072, 0),
      // runningIteration(277000, 0),
    ];
    const recursivePromises = [
      runningRecursive(1024, 0),
      runningRecursive(2048, 0),
      runningRecursive(4096, 0),
      runningRecursive(8192, 0),
      runningRecursive(13384, 0),
      // runningRecursive(65536, 0),
      // runningRecursive(131072, 0),
      // runningRecursive(277000, 0),
    ];
    const iterationResult = await Promise.all(iterationPromises);
    const recursiveResult = await Promise.all(recursivePromises);
    // iterationResult.reverse();
    // recursiveResult.reverse();
    return Response.json({
      data: {
        iteration: [...iterationResult],
        recursive: [...recursiveResult],
      },
    });
  } catch (error) {
    throw new Error();
  }
}

async function runningIteration(total: any, target: any) {
  const times = [];
  const numberOfRuns = 50; // Number of times to run the search for better average time measurement

  for (let i = 0; i < numberOfRuns; i++) {
    const start = performance.now();
    await binarySearchIteration(arr.slice(0, total), target);
    const end = performance.now();
    times.push(end - start);
  }

  const averageTime = times.reduce((acc, time) => acc + time, 0) / numberOfRuns;

  return { time: averageTime, totalData: total };
}

async function binarySearchIteration(arr: any[], target: any) {
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

function binarySearchRecursive(
  arr: any[],
  target: any,
  start = 0,
  end = arr.length - 1
) {
  if (start > end) {
    return -1; // elemen tidak ditemukan
  }

  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    return mid; // elemen ditemukan di indeks mid
  } else if (arr[mid] > target) {
    // cari di setengah kiri
    return binarySearchRecursive(arr, target, start, mid - 1);
  } else {
    // cari di setengah kanan
    return binarySearchRecursive(arr, target, mid + 1, end);
  }
}

async function runningRecursive(total: any, target: any) {
  const times = [];
  const numberOfRuns = 50; // Number of times to run the search for better average time measurement

  for (let i = 0; i < numberOfRuns; i++) {
    const start = performance.now();
    await binarySearchRecursive(arr.slice(0, total), target);
    const end = performance.now();
    times.push(end - start);
  }

  const averageTime = times.reduce((acc, time) => acc + time, 0) / numberOfRuns;

  return { time: averageTime, totalData: total };
}
