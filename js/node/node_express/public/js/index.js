const mask = document.querySelector('.mask');
const menuBtn = document.querySelector('#side-menu-toggle');
const sideDrawen = document.querySelector('.mobile-nav');

mask.addEventListener('click', maskClickHandler);
menuBtn.addEventListener('click', menuToggleClickHandler);

function maskClickHandler() {
    mask.style.display = 'none';
    sideDrawen.classList.remove('open');
}

function menuToggleClickHandler() {
    console.log(1);
    mask.style.display = 'block';
    sideDrawen.classList.add('open');
}