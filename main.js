// CAROUSEL
const carouselSlide = document.querySelector(
    '.carouselContainer__carouselSlide'
);

const carouselImages = document.querySelectorAll(
    '.carouselContainer__carouselSlide img'
);

const carouselBottomWrapper = document.querySelector('.carouselSlider');

//Buttons
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';

//Button Listeners

nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = 'transform 0.7s ease-in-out';
    counter++;
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';

    Array.from(carouselBottomWrapper.children).forEach((element, index) => {
        if (index + 1 !== counter) {
            element.classList.remove('carouselSlider__btn--active');
        } else {
            Array.from(carouselBottomWrapper.children)[
                counter - 1
            ].classList.add('carouselSlider__btn--active');
        }
    });
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = 'transform 0.7s ease-in-out';
    counter--;
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';

    Array.from(carouselBottomWrapper.children).forEach((element, index) => {
        if (index + 1 !== counter) {
            element.classList.remove('carouselSlider__btn--active');
        } else {
            Array.from(carouselBottomWrapper.children)[
                counter - 1
            ].classList.add('carouselSlider__btn--active');
        }
    });
});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].className === 'carouselSlide__lastClone') {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
        Array.from(carouselBottomWrapper.children)[5].classList.add(
            'carouselSlider__btn--active'
        );
    }
    if (carouselImages[counter].className === 'carouselSlide__firstClone') {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
        Array.from(carouselBottomWrapper.children)[0].classList.add(
            'carouselSlider__btn--active'
        );
    }
});

// Bottom Slider

carouselBottomWrapper.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) return;
    Array.from(carouselBottomWrapper.children).forEach((element) => {
        if (element !== event.target) {
            element.classList.remove('carouselSlider__btn--active');
        } else {
            carouselSlide.style.transition = 'transform 0.7s ease-in-out';
            counter =
                Array.from(carouselBottomWrapper.children).indexOf(element) + 1;
            carouselSlide.style.transform =
                'translateX(' + -size * counter + 'px)';
        }
    });
    event.target.classList.add('carouselSlider__btn--active');
});

setInterval(() => {
    carouselSlide.style.transition = 'transform 0.7s ease-in-out';
    counter++;
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
    Array.from(carouselBottomWrapper.children).forEach((element, index) => {
        if (index + 1 !== counter) {
            element.classList.remove('carouselSlider__btn--active');
        } else {
            Array.from(carouselBottomWrapper.children)[
                counter - 1
            ].classList.add('carouselSlider__btn--active');
        }
    });
}, 3000);

// LOGIN
const login = () => {
    window.location.replace('components/home/index.html');
};
