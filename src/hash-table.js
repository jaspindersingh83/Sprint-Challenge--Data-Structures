/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class Linkedlist {
  constructor(options) {
    this.head = null;
    this.tail = null;
  }

  addtotail(value) {
    const newnode = {
      value,
      next: null,
    };
    if (!this.head) {
      this.head = newnode; 
      this.tail = newnode;
    } else {
      this.tail.next = newnode;
      this.tail = newnode;
    }
  }
  removehead() {
    if (!this.head) {
      return null;
    }
    const removed = this.head.value;
    this.head = this.head.next;
    return removed;
  }

}

const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index) || new Linkedlist();
    console.log(bucket.head);
    let newbucket = new Linkedlist();
    newbucket.addtotail(key,value);
    console.log(newbucket)
    console.log(bucket.removehead() )
  //     while(!(bucket.head === null)) {
  //       let removed = bucket.removehead();
  //      ///Add the removedhead (key,value) pair as tuple to newbucket 
  //   }
  
  //   bucket = bucket.filter(item => item[0] !== key);
  this.storage.set(index, newbucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);

    if (bucket) {
      bucket = bucket.filter(item => item[0] !== key);
      this.storage.set(index, bucket);
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    let retrieved;
    if (bucket) {
      retrieved = bucket.filter(item => item[0] === key)[0];
    }
    return retrieved ? retrieved[1] : undefined;
  }
}

module.exports = HashTable;

