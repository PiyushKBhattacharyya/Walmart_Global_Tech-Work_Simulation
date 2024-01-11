const readline = require('readline');

class PowerOfTwoMaxHeap {
    constructor(x) {
        if (x < 0) {
            throw new Error("Number of children (x) must be non-negative.");
        }
        this.numberOfChildren = Math.pow(2, x);
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this._heapifyUp();
    }

    popMax() {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty.");
        }

        const max = this.heap[0];
        const lastElement = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = lastElement;
            this._heapifyDown();
        }

        return max;
    }

    _heapifyUp() {
        let currentIndex = this.heap.length - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / this.numberOfChildren);

            if (this.heap[currentIndex] > this.heap[parentIndex]) {
                this._swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    _heapifyDown() {
        let currentIndex = 0;

        while (true) {
            const maxChildIndex = this._findMaxChildIndex(currentIndex);

            if (maxChildIndex !== -1 && this.heap[currentIndex] < this.heap[maxChildIndex]) {
                this._swap(currentIndex, maxChildIndex);
                currentIndex = maxChildIndex;
            } else {
                break;
            }
        }
    }

    _findMaxChildIndex(currentIndex) {
        const startChildIndex = currentIndex * this.numberOfChildren + 1;
        const endChildIndex = Math.min(startChildIndex + this.numberOfChildren, this.heap.length);

        if (startChildIndex >= this.heap.length) {
            return -1;
        }

        let maxChildIndex = startChildIndex;
        for (let i = startChildIndex + 1; i < endChildIndex; i++) {
            if (this.heap[i] > this.heap[maxChildIndex]) {
                maxChildIndex = i;
            }
        }

        return maxChildIndex;
    }

    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

// Function to take user input
function getUserInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(prompt, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

// Main function
async function main() {
    const x = parseInt(await getUserInput("Enter the value of x for the Power of Two Max Heap: "), 10);
    const heap = new PowerOfTwoMaxHeap(x);

    while (true) {
        const choice = await getUserInput("Enter 1 to insert, 2 to pop max, or 3 to exit: ");
        
        switch (choice) {
            case '1':
                const value = parseInt(await getUserInput("Enter the value to insert: "), 10);
                heap.insert(value);
                break;
            case '2':
                try {
                    const max = heap.popMax();
                    console.log(`Popped max value: ${max}`);
                } catch (error) {
                    console.error(error.message);
                }
                break;
            case '3':
                console.log("Exiting...");
                process.exit(0);
            default:
                console.log("Invalid choice. Please enter a valid option.");
        }
    }
}

main();
