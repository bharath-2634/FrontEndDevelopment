AOS.init();

const btnScrollTo = document.querySelector('.btn--scroll-to');
const aboutUs = document.querySelector('.section__AboutUs');

btnScrollTo.addEventListener('click',function() {
    aboutUs.scrollIntoView({behavior : 'smooth'});
});

const btn = document.querySelector('.newsLetterBtn');
const modal_box = document.querySelector('.modal');
const overlay_box = document.querySelector('.overlay');
const cross = document.querySelector('.close-modal');


cross.addEventListener('click',function() {
    if(modal_box.classList.contains('hidden')) {
        modal_box.classList.remove('hidden');
    }else {
        modal_box.classList.add('hidden');
        overlay_box.classList.add('hidden');
    }
});

btn.addEventListener('click',function() {
    if(modal_box.classList.contains('hidden')) {
        modal_box.classList.remove('hidden');
        overlay_box.classList.remove('hidden');
    }else {
        modal_box.classList.add('hidden');
        overlay_box.classList.add('hidden');
    }
});

window.addEventListener('keydown',function(e) {
    if(e.key==='Escape') {
        modal_box.classList.add('hidden');
        overlay_box.classList.add('hidden');
    }
});

// FAQ
const faqs = document.querySelectorAll('.faq');
// const icon = document.querySelector('')
faqs.forEach((faq)=>{
    faq.addEventListener('click',function() {
        faq.classList.toggle('active');
    });
});

var Name = document.cookie; 
// const check = location.reload() ? 1:0;
if(performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    let popUp = document.getElementById("popUp");
    popUp.classList.add("openPopUp");
}
        
function closePopUp() {
    let popUp = document.getElementById("popUp");
    popUp.classList.remove("openPopUp");
}

// Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const toogleBtn = document.querySelector(".toggle-btn");
const toogleBtnIcon = document.querySelector(".toggle-btn i");
const dropDownMenu = document.querySelector(".dropDownMenu");


toogleBtn.addEventListener('click',function() {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open')

    toogleBtnIcon.classList = isOpen
        ? 'fa fa-solid fa-bars'
        : 'fa fa-solid fa-bars';
    // console.log("Clicked");
});
