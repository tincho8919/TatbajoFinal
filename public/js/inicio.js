
document.querySelectorAll('.mostrar-detalles').forEach((boton) => {
    boton.addEventListener('click', (event) => {
      const detalles = event.currentTarget.nextElementSibling;
      detalles.classList.toggle('detalles-hidden');
    });
  });

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    const translateValue = -currentSlide * 100;
    slider.style.transform = `translateX(${translateValue}%)`;
}

prevButton.addEventListener('click', () => {
    changeSlide(-1);
});

nextButton.addEventListener('click', () => {
    changeSlide(1);
});

//Auto-avance opcional
setInterval(() => {
    changeSlide(1);
}, 3000);