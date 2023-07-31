"use strict";

// МЕНЮ БУРГЕР
let menu = document.querySelector('.icon-menu');
let menuBody = document.querySelector('.menu__body');
let menuBox = document.querySelector('.menu__box');
menu.addEventListener('click', function () {
   document.body.classList.toggle('lock');
   menuBox.classList.toggle('active');
   menu.classList.toggle('active');
   menuBody.classList.toggle('active');
});

// ПРОВЕРКА НА ТАЧСКРИН
const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows
      );
   }
};
// Добавления классов по нажатию на тачскринах
function init() { 
   document.addEventListener('click', documentActions);

   function documentActions(e) {
      const targetElement = e.target;
      if (window.innerWidth > 600 && isMobile.any()) {
         if (targetElement.classList.contains('lang__preveu') || targetElement.classList.contains('lang__title')) {
            targetElement.closest('.lang').classList.toggle('_hover');
         }
         if (!targetElement.closest('.lang') && document.querySelectorAll('.lang._hover').length > 0) {
            document.querySelectorAll('.lang._hover').forEach((elem) => elem.classList.remove('_hover'));
         }
      }
      if (window.innerWidth < 768 && isMobile.any()) {
         if (targetElement.classList.contains('form-tabs__title')) {
            targetElement.closest('.form-tabs__box').classList.toggle('_hover');
         }
         if (!targetElement.closest('.form-tabs__box') && document.querySelectorAll('.form-tabs__box._hover').length > 0) {
            document.querySelectorAll('.form-tabs__box._hover').forEach((elem) => elem.classList.remove('_hover'));
         }
         if (targetElement.classList.contains('countries-popap-form__choice')) {
            targetElement.closest('.countries-popap-form').classList.toggle('_hover');
         }
         if (!targetElement.closest('.countries-popap-form') && document.querySelectorAll('.countries-popap-form._hover').length > 0) {
            document.querySelectorAll('.countries-popap-form._hover').forEach((elem) => elem.classList.remove('_hover'));
         }
      }
   }
}
window.onload = init;

// РЕАЛИЗАЦИЯ СМЕНЫ ЯЗЫКА
let desktopLang = document.querySelector('.lang');
let desktopLangItems = desktopLang.querySelectorAll('li span');
let desktopLangTitle = desktopLang.querySelector('.lang__title span'); 

let menuLang = document.querySelector('.lang-menu');
let menuLangItems = menuLang.querySelectorAll('li span');

desktopLangItems.forEach(function (item) {
   item.parentElement.addEventListener('click', function () {
      let itemActive = desktopLang.querySelector('.active');
      itemActive.classList.remove('active');

      item.parentElement.classList.add('active');
      desktopLangTitle.textContent = item.textContent;
      desktopLangTitle.id = item.id;
   });
   item.parentElement.addEventListener('click', changeURLLanguage);
});

menuLangItems.forEach(function (item) {
   item.parentElement.addEventListener('click', function () {
      let itemActive = menuLang.querySelector('.active');
      itemActive.classList.remove('active');

      item.parentElement.classList.add('active');
   });
   item.parentElement.addEventListener('click', changeURLLanguage);
});

let allLang = ['ru', 'en']; // Все языки сайта

// Добавляем префикс языка к ссылке
function changeURLLanguage(event) { 
   let lang = this.lastElementChild.id;
   location.href = window.location.pathname + '#' + lang;
   location.reload();
}
// уставнавливаем активный язык сайта и переводим текста
function changeDesktopLanguage(e) {
   let hash = changeHash(window.location.hash);

   desktopLangTitle.id = hash;

   if (desktopLangTitle.id == 'en') {
      desktopLangTitle.textContent = 'English';
   }

   let activeLang = desktopLang.querySelector('.active');
   activeLang.classList.remove('active');

   for (let elem of desktopLangItems) {
      if (elem.id == hash) {
         elem.parentElement.classList.add('active');
      } 
   }

   changeText(hash, langArr);
}
// уставнавливаем активный язык сайта и переводим текста в меню
function changeMenuLanguage(e) {
   let hash = changeHash(window.location.hash);

   let activeLang = menuLang.querySelector('.active');
   activeLang.classList.remove('active');

   for (let elem of menuLangItems) {
      if (elem.id == hash) {
         elem.parentElement.classList.add('active');
      } 
   }

   changeText(hash, langArr);
}
// делаем язык по умолчанию
function changeHash(hs, e) {
   hs = hs.substring(1);
   if (!allLang.includes(hs)) {
      location.href = window.location.pathname + '#ru';
      location.reload();
   }
   return hs;
}
// проверяем и переводим текст
function changeText(hs,obj) {
   for (let key in obj) {
      let elem = document.querySelector('.lng-' + key);
      if (elem && hs !== undefined) {
         elem.innerHTML = obj[key][hs];
      }
   }
}
changeDesktopLanguage();
changeMenuLanguage();

// ТАБЫ
let tabs = document.querySelectorAll('.tabs');
if (tabs.length > 0) { 
   initTabs(tabs);
}
function initTabs(tabs) { 
   for (let i = 0; i < tabs.length; i++) { 
      initTab(tabs[i]);
   }

   function initTab(tab){
      let tabTitles = tab.querySelectorAll('.tabs__title');
      let tabBodys = tab.querySelectorAll('.tabs__body');

      for (let i = 0; i < tabTitles.length; i++){
         tabTitles[i].addEventListener('click', function () {
            let tabActive = tab.querySelector('.tabs__navigation ._tab-active');
            tabActive.classList.remove('_tab-active');
      
            let tabBodyActive = tab.querySelector('.tabs__content ._tab-active');
            tabBodyActive.classList.remove('_tab-active');
      
            tabBodys[i].classList.add('_tab-active');
            this.classList.add('_tab-active');
         });
      }
   }
}

// Реализация псевдо селектора в форме главного блока
let formBox = document.querySelector('.form-tabs__box');
let formBoxTitle = formBox.querySelector('.form-tabs__title');
let formBoxItems = formBox.querySelectorAll('.form-tabs__item');
for (let i = 0; i < formBoxItems.length; i++) { 
   formBoxItems[i].addEventListener('click', function () {
      let itemActive = formBox.querySelector('._active');
      itemActive.classList.remove('_active');

      let valute = formBox.querySelector('.valute');
      valute.value = formBoxTitle.dataset.value;
      let value = this.dataset.value;

      formBoxTitle.setAttribute('class', 'form-tabs__title', '.form-tabs__item' + value);

      formBoxTitle.textContent = this.textContent;
      formBoxTitle.classList.add('form-tabs__item-' + value);
      formBoxTitle.dataset.value = value;
      this.classList.add('_active');
   });
}

// Маска на инпут в форме с вводом дененг 
let formValueMoney = document.querySelector('.body-tabs__value');
formValueMoney.addEventListener('blur', function () { 
   if (this.value.length > 0) {
      if (!this.value.startsWith('$')) {
         this.value = '$' + this.value;
      }
      if (this.value.endsWith('.') ) {
         this.value = this.value + '00';
      }
      if (this.value.endsWith('.0') ) {
         this.value = this.value + '0';
      }
      if (!this.value.endsWith('.00') ) {
         this.value = this.value + '.00';
      }
   }
});

// ВАЛИДАЦИЯ ФОРМЫ
let forms = document.querySelectorAll('form');
if (forms.length > 0) { 
   intitForms(forms);
}
function intitForms(forms) {
   for (let i = 0; i < forms.length; i++){
      initForm(forms[i]);
   }

   function initForm(form) { 
      form.addEventListener('submit', formSend);

      let resultMessage = document.createElement('div');
      form.appendChild(resultMessage);
      
      async function formSend(e) {
         let btn = form.querySelector("button");

         e.preventDefault();

         let error = formValidate(form);

         if (error === 0) {
            if (btn.classList.contains('form-popap__btn')) {
               document.querySelectorAll('.popap').forEach(elem => {
                  elem.classList.remove('open');
               });
               document.querySelector('.popap-js-2').classList.add('open');
               form.reset();
               document.querySelector('.countries-popap-form__choice').setAttribute('class', 'countries-popap-form__choice');
               document.querySelector('.countries-popap-form__choice').dataset.countryPopap = '';
               document.querySelector('.countries-popap-form__choice').textContent = 'Выберите страну';
               resultMessage.classList.remove('_errorMessage');
               resultMessage.textContent = '';
            } else {
               form.reset();
               resultMessage.classList.add('_goodMessage');
               resultMessage.textContent = 'Отправленно';
            }
         } else {
            resultMessage.classList.add('_errorMessage');
            resultMessage.textContent = 'Ошибка';
         }
      }

      function formValidate(form) { 
         let error = 0;
         let formReq = form.querySelectorAll('._req');

         for (let i = 0; i < formReq.length; i++){
            const input = formReq[i];

            formRemoveError(input);
            // проверяем input на email
            if (input.classList.contains('_email')) {
               if (emailTest(input)) {
                  formAddError(input);
                  error++;
               }
            // проверяем input на checkbox
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
               formAddError(input);
               error++;
            } else {
               // проверяем input на пустые поля
               if (input.value === '' || input.dataset.countryPopap === '') {
                  formAddError(input);
                  error++;
               }
            }
         }
         return error;
      }
      // Функция для добавления класса error
      function formAddError(input) { 
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
      }
      // Функция для удаления класса error
      function formRemoveError(input) { 
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }
      // Функия теста email
      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
   }
}

// ЯКОРЬ (ПЛАВНАЯ ПРОКРУТКА ДО НУЖНОГО БЛОКА)
let menuLinks = document.querySelectorAll('[data-goto]');
if (menuLinks.length > 0) {
   for (let menuLink of menuLinks) {
      menuLink.addEventListener('click', onMenuLinkClick);
   }

   function onMenuLinkClick(e) {
      let menuLink = e.target;

      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         let gotoBlock = document.querySelector(menuLink.dataset.goto);
         let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         if (menu.classList.contains('active')) {
            document.body.classList.remove('lock');
            menu.classList.remove('active');
            menuBody.classList.remove('active');
            menuBox.classList.remove('active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         });
         e.preventDefault();
      }
   }
}

// Реализация переключения стран на карте
let countryList = document.querySelector('.wherework__list'); 
let countryItems = countryList.querySelectorAll('.wherework__item');
let map = document.querySelector('.wherework__map');
let mapAvailables = map.querySelectorAll('.wherework__available');
for (let i = 0; i < countryItems.length; i++){
   let countryItem = countryItems[i];
   countryItem.addEventListener('click', function () {
      let countryItemActive = countryList.querySelector('._active');
      countryItemActive.classList.remove('_active');

      let mapAvailableActive = map.querySelector('._active');
      mapAvailableActive.classList.remove('_active');

      this.classList.add('_active');
      mapAvailables[this.dataset.countryId].classList.add('_active');
   });
}

// СПОЙЛЕРЫ
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
   // Получение обычных спойлеров
   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
   });

   // Инициализация обычных спойлеров
   if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
   }

   // Получение спойлеров с медиа запросами
   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
   });

   // Инициализация спойлеров с медиа запросами
   if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
         const params = item.dataset.spollers;
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });

      // Получаем уникальные брейкпоинты
      let mediaQeries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQeries = mediaQeries.filter(function (item, index, self) {
         return self.indexOf(item) === index;
      });

      // Работаем с каждым брейкпоинтом
      mediaQeries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(",");
         const mediaBreakpoint = paramsArray[1];
         const mediaType = paramsArray[2];
         const matchMedia = window.matchMedia(paramsArray[0]);

         // Объекты с нужными условиями
         const spollersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
               return true;
            }
         });
         // Событие
         matchMedia.addListener(function () {
            initSpollers(spollersArray, matchMedia);
         });
         initSpollers(spollersArray, matchMedia);
      });
   }
   // Инициализация
   function initSpollers(spollersArray, matchMedia = false) { 
      spollersArray.forEach(spollersBlock => {
         spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
         if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_init');
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener('click', setSpollerAction);
         } else {
            spollersBlock.classList.remove('_init');
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener('click', setSpollerAction);
         }
      });
   }
   // Работа с контентом
   function initSpollerBody(spollersBlock, hideSpollerBody = true) { 
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length > 0) {
         spollerTitles.forEach(spollerTitle => {
            if (hideSpollerBody) {
               spollerTitle.removeAttribute('tabindex');
               if (!spollerTitle.classList.contains('_active')) {
                  spollerTitle.nextElementSibling.hidden = true;
               }
            } else {
               spollerTitle.setAttribute('tabindex', '-1');
               spollerTitle.nextElementSibling.hidden = false;
            }
         });
      }
   }
   function setSpollerAction(e) { 
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) { 
         const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
         const spollersBlock = spollerTitle.closest('[data-spollers]');
         const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
         const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
         if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) { 
               hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
         }
         e.preventDefault();
      }
   }
   function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle) {
         spollerActiveTitle.classList.remove('_active');
         _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
   }
   // Закрытие при клике вне спойлера
	const spollersClose = document.querySelectorAll('[data-spoller-close]');
	if (spollersClose.length) {
		document.addEventListener("click", function (e) {
			const el = e.target;
			if (!el.closest('[data-spollers]')) {
				spollersClose.forEach(spollerClose => {
					const spollersBlock = spollerClose.closest('[data-spollers]');
					const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
					spollerClose.classList.remove('_active');
					_slideUp(spollerClose.nextElementSibling, spollerSpeed);
				});
			}
		});
	}
}

let _slideUp = (target, duration = 500) => { 
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => { 
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideDown = (target, duration = 500) => { 
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
         target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => { 
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideToggle = (target, duration = 500) => { 
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}

// ЛИПКИЙ HEADER
let header = document.querySelector('.header');
let headerT = document.querySelector('.header').clientHeight;
let headerH = document.querySelector('.header').clientHeight * 3;

document.onscroll = function () {
   let scroll = window.scrollY;

   if (scroll > headerT) {
      header.classList.remove('reanim');
      header.classList.add('anim');
   } else {
      header.classList.remove('anim');
      header.classList.remove('reanim');
   }
   if (scroll > headerH){
      header.classList.remove('reanim');
      document.body.classList.add('fixed');
      header.classList.add('fixed');
      header.style.position = 'fixed';
   } else {
      if (scroll < headerH - 88) {
         header.classList.remove('reanim');
         header.removeAttribute('style');
         header.classList.remove('fixed');
         document.body.classList.remove('fixed');
         document.body.removeAttribute('style');
         header.classList.remove('reanim');
      }
      header.classList.add('reanim');
   }
}

// POPUP
let popapCountries = document.querySelector('.countries-popap-form');
let popapCountriesChoice = popapCountries.querySelector('.countries-popap-form__choice');
let popapCountriesList = popapCountries.querySelectorAll('.countries-popap-form__item');
for (let i = 0; i < popapCountriesList.length; i++){
   let country = popapCountriesList[i];
   country.addEventListener('click', function () {
      let countryActive = popapCountries.querySelector('._active');
      if (countryActive) {
         countryActive.classList.remove('_active');
      }


      let value = this.dataset.countryPopapValue;

      popapCountriesChoice.setAttribute('class', 'countries-popap-form__choice', '.countries-popap-form__item' + value);
      this.classList.add('_active');
      popapCountriesChoice.textContent = this.textContent;
      popapCountriesChoice.dataset.countryPopap = this.textContent;
      popapCountriesChoice.classList.add('countries-popap-form__item-' + value);
   });
}



const popupLinks = document.querySelectorAll('.popap-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++){
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('.close-popap');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++){
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popap'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popap.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popap__content')) {
            popupClose(e.target.closest('.popap'));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {

      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];

         el.style.paddingRight = lockPaddingValue;
      }
   }   
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }   
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popap.open');
      popupClose(popupActive);
   }
});

(function () {
   // проверяем поддержку
   if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      }
   }
})();
(function () {
   // проверяем поддержку
   if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();




















