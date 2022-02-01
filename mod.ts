const memoize = (fn: Function) => {
  const cache: { [key: string]: any } = {};
  return (...args: any[]): any => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

const bubbleSort = memoize((array: number[]) => {
  array = array.slice(); // creates a copy of the array
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const swap = array[j];
        array[j] = array[j + 1];
        array[j + 1] = swap;
      }
    }
  }
  return array;
});

const data = Array.from({ length: 10000 }).map((_) =>
  Math.floor(Math.random() * 10000)
);

const copy: typeof data = structuredClone(data);

console.time("normal");
console.log(bubbleSort(data).length);
console.timeEnd("normal");

console.time("memoized");
console.log(bubbleSort(copy).length);
console.timeEnd("memoized");
