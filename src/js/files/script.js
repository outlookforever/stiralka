// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";
import axios from "axios";
import AOS from "AOS"
import '../../../node_modules/aos/dist/aos.css';



// preloader
const preloader = document.getElementById('preloader');
window.addEventListener("load", function() {
    setTimeout(function() {
        preloader.classList.add('hide-preloader');
    }, 0);
})

// header scroll
const headerElement = document.querySelector('.header');

const callback = function(entries, observer) {
    if (entries[0].isIntersecting) {
        headerElement.classList.remove('_scroll')
    } else {
        headerElement.classList.add('_scroll');
    }
}

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);

// Отбираем класс menu-open при клике на нав ссылку
/*=============== REMOVE MENU MOBILE ===============*/
const menuLink = document.querySelectorAll('.menu__link')

function linkAction() {
    const menuOpen = document.documentElement

    // When we click on each nav_link , we remove the show - menu class
    menuOpen.classList.remove('menu-open')
}
menuLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
/*
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.menu__body a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.menu__body a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)
*/
// _______________________________________________________________________________
// callback
// validation
const reg = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const popup = document.getElementById('callback');
const formInput = document.getElementById('formphone');
const formSpan = document.querySelector('.form-popup__error');
const formBtn = document.querySelector('.btn-success');
let popupMess = `   <div class="popup popup_show">`
popupMess += `<div class="popup__wrapper">`
popupMess += `<div class="popup__content popup__content_send">`
popupMess += `<button data-close type="button" class="popup__close">Закрыть</button>`
popupMess += `<h3 class="form-popup__title">Ваша заявка принята</h3><br>`
popupMess += `<p class="form-popup__text">Наш специялист свяжется с Вами в течении 30 минут</p>
                    </div></div></div>`

function validate(regex, inp) {
    return regex.test(inp);
}

function noValid(inp, el, mess) {
    inp.classList.add('input_error');
    el.innerHTML = mess
}

function valid(inp, el, mess) {
    inp.classList.remove('input_error');
    el.innerHTML = mess;
}



const TOKEN = "5529784972:AAF__X2ILRc_dhiOilVPXVJKJh3B16q8BgU";
const CHAT_ID = "-1001704470205";
const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;


document.getElementById('tg').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validate(reg, formInput.value)) {
        noValid(formInput, formSpan, ` Введите номер телефона в формате<br>
        89780000000 <br>
+79780000000<br>
8-978-000-00-00<br>
+7-978-000-00-00<br>
8(978)0000000<br>
8(978)000 00 00
        `)
        document.querySelector('.form-popup__descript').classList.add('hide')
    } else {
        let message = `<b>Заявка www.Stiralka.su</b>\n`;
        message += `Отправитель: ${this.name.value}\n`;
        message += `Номер телефона: ${this.tel.value}`;



        axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })

        valid(formInput, formSpan, `<div style="color: green">Ваша заявка оправлена </div>`);
    }
})



//----------------------------------------------------------------

// AOS
window.addEventListener("load", function() {
    AOS.init({
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 0, // offset (in px) from the original trigger point
        // delay: 100, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
});