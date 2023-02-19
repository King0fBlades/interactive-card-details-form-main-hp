'use strict';

const formContainer = document.querySelector('.form__container');
const completedContainer = document.querySelector('.completed__container');
const cardHolder = document.querySelector('.card__holder');
const cardNumbers = document.querySelector('.card__numbers');
const cardExpirationMonth = document.querySelector('.expire__date-month');
const cardExpirationYear = document.querySelector('.expire__date-year');
const cardCvc = document.querySelector('.card__cvc');
const error = document.querySelectorAll('.error__msg');

const btnConfirm = document.querySelector('.confirm-btn');
const btnContinue = document.querySelector('.continue-btn');

const inputCardHolder = document.querySelector('.input__text-name');
const inputCardNumbers = document.querySelector('.input__text-numbers');
const inputCardExpirationMonth = document.querySelector('.input__text-month');
const inputCardExpirationYear = document.querySelector('.input__text-year');
const inputCvc = document.querySelector('.input__cvc');

const isText = (l) => {
	const text = /^[A-Za-z\s]*$/;
	return text.test(l);
};
const isNumber = (n) => {
	const number = /^[0-9\s]+$/;
	return number.test(n);
};

const showError = (input, msg) => {
	const formField = input.parentElement;
	const err = formField.querySelector('.error__msg');
	input.classList.add('error');
	err.innerHTML = msg;
};

const showSuccess = (input) => {
	input.classList.remove('error');
	error.innerHTML = '';
};

function displayName() {
	let valid = false;

	const name = inputCardHolder.value;
	if (!name) {
		showError(inputCardHolder, `Can't be blank`);
		cardHolder.innerHTML = 'Jane Appleseed';
	} else if (!isText(name)) {
		showError(inputCardHolder, `Wrong format, letters only`);
	} else {
		showSuccess(inputCardHolder);
		error[0].innerHTML = '';
		cardHolder.innerHTML = name;
		valid = true;
	}
	return valid;
}

function displayNumbers() {
	let formatedNumber = inputCardNumbers.value
		.split('')
		.map(function (e, i) {
			if (i % 4 == 3) return e + ' ';
			else return e;
		})
		.join('');

	let valid = false;
	let n = formatedNumber;

	if (!n) {
		showError(inputCardNumbers, `Can't be blank`);
		cardNumbers.innerHTML = '0000 0000 0000 0000';
	} else if (!isNumber(n)) {
		showError(inputCardNumbers, `Wrong format, numbers only`);
	} else {
		showSuccess(inputCardNumbers);
		error[1].innerHTML = '';
		cardNumbers.innerHTML = n;
		valid = true;
	}
	return valid;
}

function displayMonth() {
	let valid = false;
	let month = inputCardExpirationMonth.value;

	console.log(month);
	if (!month) {
		showError(inputCardExpirationMonth, `Can't be blank`);
		cardExpirationMonth.innerHTML = '00';
	} else if (!isNumber(month)) {
		showError(inputCardExpirationMonth, `Wrong format, numbers only`);
	} else if (month < 0 || month > 12) {
		showError(inputCardExpirationMonth, `Please enter a valid month`);
	} else {
		showSuccess(inputCardExpirationMonth);
		error[2].innerHTML = '';
		cardExpirationMonth.innerHTML = month;
		valid = true;
	}
	return valid;
}

function displayYear() {
	let valid = false;
	let year = inputCardExpirationYear.value;

	if (!year) {
		showError(inputCardExpirationYear, `Can't be blank`);
		cardExpirationYear.innerHTML = '00';
	} else if (!isNumber(year)) {
		showError(inputCardExpirationYear, `Wrong format, numbers only`);
	} else if (year < 23 || year > 33) {
		showError(inputCardExpirationYear, `Please enter a valid year`);
	} else {
		showSuccess(inputCardExpirationYear);
		error[2].innerHTML = '';
		cardExpirationYear.innerHTML = year;
		valid = true;
	}
	return valid;
}

function displayCvc() {
	let valid = false;
	let cvc = inputCvc.value;

	if (!cvc) {
		showError(inputCvc, `Can't be blank`);
		cardCvc.innerHTML = '000';
	} else if (!isNumber(cvc)) {
		showError(inputCvc, `Wrong format, numbers only`);
	} else {
		showSuccess(inputCvc);
		error[3].innerHTML = '';
		cardCvc.innerHTML = cvc;
		valid = true;
	}
	return valid;
}

btnConfirm.addEventListener('click', function (e) {
	e.preventDefault();
	let validName = displayName();
	let validNumbers = displayNumbers();
	let validMonth = displayMonth();
	let validYear = displayYear();
	let validCvc = displayCvc();

	if (validName && validNumbers && validMonth && validYear && validCvc) {
		formContainer.classList.add('hidden');
		completedContainer.classList.remove('hidden');
	}
});

btnContinue.addEventListener('click', function (e) {
	e.preventDefault();

	formContainer.classList.remove('hidden');
	completedContainer.classList.add('hidden');

	cardHolder.innerHTML = 'Jane Appleseed';
	cardNumbers.innerHTML = '0000 0000 0000 0000';
	cardExpirationMonth.innerHTML = '00';
	cardExpirationYear.innerHTML = '00';
	cardCvc.innerHTML = '000';

	inputCardHolder.value = '';
	inputCardNumbers.value = '';
	inputCardExpirationMonth.value = '';
	inputCardExpirationYear.value = '';
	inputCvc.value = '';
});
