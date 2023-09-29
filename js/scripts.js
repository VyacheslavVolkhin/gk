//field counter
let fieldCounter = document.getElementsByClassName('frm-field-counter')
let counterTotalText = document.querySelectorAll('[data-counter-text]')

function fieldCounterResult() {
	for (i = 0; i < counterTotalText.length; i++) {
		console.log(counterTotalText.length)
		let counterTotal = counterTotalText[i].dataset.counterText
		for (j = 0; j < fieldCounter.length; j++) {
			if (fieldCounter[j].dataset.counter == counterTotal) {
				let counterValue = fieldCounter[j].querySelector('input').value
				let counterPrice = fieldCounter[j].dataset.price
				let counterResult = counterValue * counterPrice
				counterTotalText[j].textContent = counterResult
			}
		}
	}
}

function fieldCounterButtons(index) {
	return `
        <button class="field-counter-button" data-index="${index}" data-type="plus"></button>
        <button class="field-counter-button" data-index="${index}" data-type="minus"></button>
    `
}

function fieldCounterCreator() {
	for (i = 0; i < fieldCounter.length; i++) {
		fieldCounter[i].insertAdjacentHTML('beforeend', fieldCounterButtons(i))
		fieldCounter[i].onclick = function (event) {
			const type = event.target.dataset.type
			const index = event.target.dataset.index
			if (index) {
				const fieldCounterPlus = fieldCounter[index].children[1]
				const fieldCounterMinus = fieldCounter[index].children[2]
				const fieldCounterInput = fieldCounter[index].children[0]
				if (type === 'plus') {
					fieldCounterInput.value = Number(fieldCounterInput.value) + 1
				} else if (type === 'minus') {
					fieldCounterInput.value = Number(fieldCounterInput.value) - 1
				}
				if (Number(fieldCounterInput.value) > 0) {
					fieldCounterMinus.removeAttribute('disabled')
				} else if (Number(fieldCounterInput.value) < 1) {
					fieldCounterMinus.setAttribute('disabled', true)
				}
				fieldCounterResult();
			}
		}
	}
}

fieldCounterCreator();
fieldCounterResult();


//order active
const orderNextButton = document.querySelectorAll('.js-order-next')
const orderEditButton = document.querySelectorAll('.js-order-edit')
for (i = 0; i < orderNextButton.length; i++) {
	orderNextButton[i].addEventListener('click', function(e) {
		this.closest('.order-section-wrap').classList.toggle('result-active')
		this.closest('.order-section-wrap').nextElementSibling.classList.add('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < orderEditButton.length; i++) {
	orderEditButton[i].addEventListener('click', function(e) {
		this.closest('.order-section-wrap').classList.toggle('result-active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}

//btn tgl
let tglButtons = document.querySelectorAll('.js-btn-tgl')
for (i = 0; i < tglButtons.length; i++) {
	tglButtons[i].addEventListener('click', function (e) {
		this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}


//filter toggle
const filterToggleButton = document.querySelectorAll('.js-filter-toggle')
for (i = 0; i < filterToggleButton.length; i++) {
	filterToggleButton[i].addEventListener('click', function(e) {
		document.body.classList.toggle('filter-showed')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}

//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')

function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}

function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}

function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}

for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})

$(window).on('load', function () {

	//content toggle action
	$('input[data-content]').each(function () {
		if ($(this).is(':checked')) {
			let selectContent = $(this).attr('data-content');
			$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
		}
	})
	$('input[data-content]').on('click', function () {
		$('.frm-content.active').removeClass('active');
		$('input[data-content]').each(function () {
			if ($(this).is(':checked')) {
				let selectContent = $(this).attr('data-content');
				$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
			}
		})
	})
	$('.btn[data-content]').on('click', function () {
		let dataContent = $(this).attr('data-content');
		$(this).attr('disabled', 'disabled');
		$('.frm-content[data-content="' + dataContent + '"]').slideDown(200);
		return false;
	})
	
	
	//popups
	let popupCurrent;
	$('.js-popup-open').on('click', function () {
		$('.popup-outer-box').removeClass('active');
		$('body').addClass('popup-open');
		popupCurrent = $(this).attr('data-popup');
		$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		return false;
	})
	$('.js-popup-close').on('click', function () {
		$('body').removeClass('popup-open');
		$('.popup-outer-box').removeClass('active');
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-open-scroll');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
	})


	if (!!$('.header').offset()) {
		var stickyTop = $('.header').offset().top;
		$(window).scroll(function () {
			var windowTop = $(window).scrollTop();
			if (stickyTop < windowTop) {
				$('.wrap').addClass('header-fixed');
			} else {
				$('.wrap').removeClass('header-fixed');
			}
		});
	}
	
	
	//mobile menu
	$('.main-menu-wrap li .submenu-inner-wrap').each(function () {
		$(this).parent().addClass('submenu');
	})
	$('.main-menu-wrap li a').on('click', function () {
		if ($(this).next('.submenu-inner-wrap').length > 0) {
			if ($(window).innerWidth() < 1024) {
				if ($(this).parent().hasClass('open')) {
					$(this).parent().removeClass('open').children('.submenu-inner-wrap').slideUp(200);
				} else {
					$('.main-menu-wrap li.open').removeClass('open').children('.submenu-inner-wrap').slideUp(200);
					$(this).parent().addClass('open').children('.submenu-inner-wrap').slideDown(200);
				}
				return false;
			}
		}
	})


	//catalog-box
	if (!!$('.catalog-box').offset()) {
		$('.catalog-box').each(function() {
			if (!$(this).hasClass('catalog-inner')) {
				$(this).find('.slider').slick({
					dots: false,
					slidesToShow: 4,
					variableWidth: false,
					infinite: true,
					adaptiveHeight: false,
					rows: 1,
					swipeToSlide: true,
					autoplay: false,
					autoplaySpeed: 5000,
					prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
					nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 640,
							settings: {
								slidesToShow: 2,
							}
						},
					]
				});
			} else {
				$(this).find('.slider').slick({
					dots: false,
					slidesToShow: 2,
					variableWidth: false,
					infinite: true,
					adaptiveHeight: false,
					rows: 1,
					swipeToSlide: true,
					autoplay: false,
					autoplaySpeed: 5000,
					prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
					nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 640,
							settings: {
								slidesToShow: 2,
							}
						},
					]
				});
			}
		})

	}


	//main-tiles-slider-box
	if (!!$('.main-tiles-slider-box').offset()) {
		$('.main-tiles-slider-box .slider').slick({
			dots: false,
			slidesToShow: 4,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		});

	}

	//photos-slider-box
	if (!!$('.photos-slider-box').offset()) {
		$('.photos-slider-box .slider').slick({
			dots: true,
			slidesToShow: 4,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			vertical: true,
			autoplaySpeed: 5000,
			prevArrow: false,
			nextArrow: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						vertical: false,
					}
				},
			]
		});

	}


	//#range-price
	if (!!$('#range-price').offset()) {
		$('#range-price').slider({
			range: true,
			min: 198,
			max: 548,
			values: [198, 548],
			slide: function (event, ui) {
				$('#range-price-min').text(ui.values[0]);
				$('#range-price-max').text(ui.values[1]);
			}
		})
		$('#range-price-min').text($('#range-price').slider('values', 0));
		$('#range-price-max').text($('#range-price').slider('values', 1));
		$('#widget').draggable();
	}
	
});