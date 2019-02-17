class Stopwatch {
    constructor(element) {
        this.element = element;
        this.running = false;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = [0, 0, 0];
    }

    start() {
        if (!this.time) {
            this.time = performance.now();
        }

        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    stop() {
        this.running = false;
        this.time = null;
    }

    step(timestamp) {
        if (!this.running) return;

        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }

    calculate(timestamp) {
        let diff = timestamp - this.time;
        // Hundredths of a second
        this.times[2] += diff / 10;
        // Seconds
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }

    print() {
        this.element.innerText = this.format(this.times);
    }

    pad0(value, count) {
        let result = value.toString();

        while (result.length < count) {
            result = '0' + result;
            count--;
        }

        return result;
    }

    format(times) {
        return `${this.pad0(times[0], 2)} : ${this.pad0(times[1], 2)} : ${this.pad0(Math.floor(times[2]), 2)}`;
    }
}

export default Stopwatch;