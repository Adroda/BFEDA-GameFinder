const carouselSlide = document.querySelector(
    '.carouselContainer__carouselSlide'
);

const carouselImages = document.querySelectorAll(
    '.carouselContainer__carouselSlide img'
);

//Buttons
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';

const login = () => {
    window.location.replace('components/home/index.html');
};

//Button Listeners

nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = 'transform 0.7s ease-in-out';
    counter++;
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = 'transform 0.7s ease-in-out';
    counter--;
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].className === 'carouselSlide__lastClone') {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
    }
    if (carouselImages[counter].className === 'carouselSlide__firstClone') {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
    }
});
