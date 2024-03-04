const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// Configuração do carrossel
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = `translateX(${-size * counter}px)`;

// Função para alternar para o próximo slide
function nextSlide() {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
}

// Configuração da animação automática
setInterval(nextSlide,60000); // Troca de slide a cada 60 segundos


document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('show');
    });
});
