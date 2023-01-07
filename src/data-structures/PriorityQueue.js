/*
custom implemented Priority Queue :-

with Binary Min-Heap, i.e. The key with minimum required
value (distance, in this algorithmic implementation) will have 
highest priority hence will be present in the top of the Priority Queue,
to be processed or removed first. 

We will use it in Dijkstra's Algorithm.
*/

const maxSize = 80000;

class PriorityQueue {
    constructor() {
        this.heap = new Array(maxSize);
        this.size = 0;
    }
    // left-child Node of Node at index i
    left(i) {
        return i * 2 + 1;
    }
    // right-child Node of Node at index i
    right(i) {
        return i * 2 + 2;
    }
    // parent Node of Node at index i
    parent(i) {
        return Math.floor((i - 1) / 2);
    }
    // check whether PriorityQueue is empty or not
    empty() {
        return this.size === 0;
    }
    // check whether PriorityQueue is full or not
    full() {
        return this.size === maxSize;
    }
    // insert an item into PriorityQueue
    insert(key) {
        if (this.size === maxSize) return;
        this.size += 1;
        this.heap[this.size - 1] = key;
        let i = this.size - 1;
        while (i !== 0 && this.heap[i][1] < this.heap[this.parent(i)][1]) {
            let tmp = this.heap[i];
            this.heap[i] = this.heap[this.parent(i)];
            this.heap[this.parent(i)] = tmp;
            i = this.parent(i);
        }
    }
    // heapify the priority queue
    heapify(i) {
        if (i >= this.size) return;
        let smaller = i;
        let l = this.left(i);
        let r = this.right(i);
        if (l < this.size && this.heap[l][1] < this.heap[smaller][1]) {
            smaller = l;
        }
        if (r < this.size && this.heap[r][1] < this.heap[smaller][1]) {
            smaller = r;
        }
        if (smaller !== i) {
            let tmp = this.heap[smaller];
            this.heap[smaller] = this.heap[i];
            this.heap[i] = tmp;
            this.heapify(smaller);
        }
    }
    // extract minimum from priority queue
    extractMin() {
        if (this.size === 0) return Infinity;
        var tmp = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.size -= 1;
        this.heapify(0);
        return tmp;
    }
    // decrease key value
    decreaseKey(i, value) {
        if (i >= this.size) return;
        this.heap[i][1] = value;
        while (i !== 0 && this.heap[i][1] < this.heap[this.parent(i)][1]) {
            var tmp = this.heap[this.parent(i)];
            this.heap[this.parent(i)] = this.heap[i];
            this.heap[i] = tmp;
            i = this.parent(i);
        }
    }
    // delete key from priority queue
    deleteKey(thisX, thisY) {
        for (let i = 0; i < this.size; i++) {
            if (this.heap[i][0].x === thisX && this.heap[i][0].y === thisY) {
                this.decreaseKey(i, -Infinity);
                this.extractMin();
                break;
            }
        }
    }
}

export default PriorityQueue;
