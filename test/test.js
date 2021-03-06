import { bubblesort }     from './bubble';
import { selectionsort }  from './selection';
import { insertionsort }  from './insertion';
import { mergesort }      from './merge';
import { quicksort }      from './quick';

var people = [
  {name: 'Sindre', age: 30, place: 2},
  {name: 'Passy', age: 25, place: 1},
  {name: 'Stephen', age: 40, place: 4},
  {name: 'Matt', age: 35, place: 3}
];

function _makeRandomArray(options = {precision: 0, multiplier: 100, size: 100}) {
  var {precision, multiplier, size} = options;
  var result = [];

  for (let i = size; i > 0; i -= 1) {
    result.push(parseFloat((Math.random() * multiplier).toFixed(precision)));
  }

  return result;
}

function desc(a, b) {
  return b - a;
}

function objComparator(a, b) {
  return a.age - b.age;
}

function test(sortType) {

  it('should work with an empty array', () => {
    sortType([]).should.eql([]);
  });

  it('should work with (ascending) sorted arrays', () => {
    sortType([3, 1, 4, 1, 5, 9, 2, 6, 5, 4]).should.eql([1, 1, 2, 3, 4, 4, 5, 5, 6, 9]);
    sortType([9, 2, 8, 6, 1, 3]).should.eql([1, 2, 3, 6, 8, 9]);
    sortType([5, 2, 2, 6, 1, 3]).should.eql([1, 2, 2, 3, 5, 6]);
    sortType([5, 2, 4, 6, 1, 3]).should.eql([1, 2, 3, 4, 5, 6]);
    sortType([0, 0, 0, 0, 0, -1]).should.eql([-1, 0, 0, 0, 0, 0]);
  });

  it('should work with (descending) sorted arrays', () => {
    sortType([4, 2, 2, 6, 1, 3], desc).should.eql([6, 4, 3, 2, 2, 1]);
    sortType([0, 0, 0, 0, 0, 1], desc).should.eql([1, 0, 0, 0, 0, 0]);
    sortType([0, 0, 0, 0, 0, -1], desc).should.eql([0, 0, 0, 0, 0, -1]);
  });

  it('should work with (ascending) arrays of objects', () => {
    sortType(people, objComparator).should.eql([
        {"name": 'Passy', "age": 25, "place": 1},
        {"name": 'Sindre', "age": 30, "place": 2},
        {"name": 'Matt', "age": 35, "place": 3},
        {"name": 'Stephen', "age": 40, "place": 4}
      ]);
  });

  it('should work with random non-sorted arrays', () => {
    let array = _makeRandomArray();
    let sortedArr = sortType(array);

    for (let i = 0; i < sortedArr.length - 1; i += 1) {
      (sortedArr[i] <= sortedArr[i + 1]).should.equal(true);
    }
  });

}

describe('bubblesort module', () => test(bubblesort));
describe('selection sort module', () => test(selectionsort));
describe('insertion sort module', () => test(insertionsort));
describe('merge sort module', () => test(mergesort));
describe('quick sort module', () => test(quicksort));
