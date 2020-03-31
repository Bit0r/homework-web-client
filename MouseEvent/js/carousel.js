"use strict";
class CarouselInit {
    constructor(carousel) {
        var _a;
        this.carousel = carousel;
        this.count = Number((_a = carousel.dataset.count) !== null && _a !== void 0 ? _a : 0);
        this.total = Number(carousel.dataset.total);
        this.gallery = carousel.getElementsByTagName('ul')[0];
        this.imgWidth = this.gallery.getElementsByTagName('img')[0].offsetWidth;
        this.appendDots();
    }
    setImg(newCount) {
        this.dots.children[this.count].style.backgroundColor = '';
        if (newCount >= 0) {
            this.count = newCount % this.total;
        }
        else {
            this.count = this.total + newCount % this.total;
        }
        this.dots.children[this.count].style.backgroundColor = 'green';
        this.gallery.style.transform = `translateX(${-this.count * this.imgWidth}px)`;
    }
    appendDots() {
        this.dots = document.createElement('ol');
        this.carousel.append(this.dots);
        for (let i = 1; i <= this.total; i++) {
            const li = document.createElement('li');
            li.value = i;
            this.dots.append(li);
        }
        this.setImg(this.count);
    }
}
class Carousel extends CarouselInit {
    constructor(carousel) {
        super(carousel);
        carousel.addEventListener('click', event => this.clickHandler(event));
        carousel.addEventListener('mouseover', event => this.overHandler(event));
        carousel.addEventListener('mouseout', event => this.outHandler(event));
        this.handleID = setInterval(() => this.setImg(this.count + 1), 2000);
    }
    clickHandler(event) {
        let but = event.target.closest('button');
        if (but) {
            if (but.classList.contains('carousel-prev')) {
                this.setImg(this.count - 1);
            }
            else {
                this.setImg(this.count + 1);
            }
        }
    }
    outHandler(event) {
        let li = event.target.closest('li');
        if (li && isNaN(this.handleID)) {
            this.handleID = setInterval(() => this.setImg(this.count + 1), 2000);
        }
    }
    overHandler(event) {
        let li = event.target.closest('li');
        if (li) {
            if (!isNaN(this.handleID)) {
                clearInterval(this.handleID);
                this.handleID = NaN;
            }
            if (li.closest('ol')) {
                this.setImg(li.value - 1);
            }
        }
    }
}
Array.from(document.getElementsByClassName('carousel'))
    .forEach(carouse => new Carousel(carouse));
//# sourceMappingURL=carousel.js.map