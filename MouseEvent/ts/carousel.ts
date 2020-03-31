class CarouselInit {
    protected count: number;
    protected dots: HTMLOListElement;
    total: number;
    protected gallery: HTMLUListElement;
    protected imgWidth: number;
    constructor(public carousel: HTMLDivElement) {
        this.count = Number(carousel.dataset.count ?? 0);
        this.total = Number(carousel.dataset.total);
        this.gallery = carousel.getElementsByTagName('ul')[0];
        this.imgWidth = this.gallery.getElementsByTagName('img')[0].offsetWidth;

        this.appendDots();
    }
    protected setImg(newCount: number) {
        (<HTMLLIElement>this.dots.children[this.count]).style.backgroundColor = '';
        if (newCount >= 0) {
            this.count = newCount % this.total;
        } else {
            this.count = this.total + newCount % this.total;
        }
        (<HTMLLIElement>this.dots.children[this.count]).style.backgroundColor = 'green';
        this.gallery.style.transform = `translateX(${-this.count * this.imgWidth}px)`;
    }
    private appendDots() {
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
    handleID: number;
    constructor(carousel: HTMLDivElement) {
        super(carousel);
        carousel.addEventListener('click', event => this.clickHandler(event));
        carousel.addEventListener('mouseover', event => this.overHandler(event));
        carousel.addEventListener('mouseout', event => this.outHandler(event));
        this.handleID = setInterval(() => this.setImg(this.count + 1), 2000);
    }
    protected clickHandler(event: MouseEvent) {
        let but = (<HTMLElement>event.target).closest('button');
        if (but) {
            if (but.classList.contains('carousel-prev')) {
                this.setImg(this.count - 1);
            } else {
                this.setImg(this.count + 1);
            }
        }
    }
    private outHandler(event: MouseEvent) {
        let li = (<HTMLElement | null>event.target).closest('li');
        if (li && isNaN(this.handleID)) {
            this.handleID = setInterval(() => this.setImg(this.count + 1), 2000);
        }
    }
    private overHandler(event: MouseEvent) {
        let li = (<HTMLElement | null>event.target).closest('li');
        if (li) {
            if (!isNaN(this.handleID)) {
                clearInterval(this.handleID)
                this.handleID = NaN;
            }
            if (li.closest('ol')) {
                this.setImg(li.value - 1);
            }
        }
    }
}

(<HTMLDivElement[]>Array.from(document.getElementsByClassName('carousel')))
    .forEach(carouse => new Carousel(carouse));