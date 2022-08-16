const form = document.getElementById('js-form');
const submitButton = document.getElementById('js-submitButton');

submitButton.addEventListener('click', (e) => {
	e.preventDefault();
	form.submit();
});

const months = [],
	days = [],
	hours = [],
	minutes = [];

for (let i = 1; i <= 12; i++) {
	months.push(i);
}
for (let i = 1; i <= 31; i++) {
	days.push(i);
}
for (let i = 9; i <= 18; i++) {
	hours.push(i);
}
for (let i = 0; i <= 50; i += 10) {
	minutes.push(i);
}

const paperType = document.getElementById('js-paperType');
const reason = document.getElementById('js-reason');
const startMonth = document.getElementById('js-startMonth');
const startDay = document.getElementById('js-startDay');
const lastMonth = document.getElementById('js-lastMonth');
const lastDay = document.getElementById('js-lastDay');
const startHour = document.getElementById('js-startHour');
const startMinute = document.getElementById('js-startMinute');
const lastHour = document.getElementById('js-lastHour');
const lastMinute = document.getElementById('js-lastMinute');
const date = document.getElementById('js-date');

const today = new Date();
date.value =
	today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
console.log(date.value);

const setOption = (array, element) => {
	array.forEach((value) => {
		const option = document.createElement('option');
		option.value = value;
		option.textContent = value;
		element.appendChild(option);
	});
};

setOption(months, startMonth);
setOption(months, lastMonth);
setOption(days, startDay);
setOption(days, lastDay);
setOption(hours, startHour);
setOption(hours, lastHour);
setOption(minutes, startMinute);
setOption(minutes, lastMinute);

const errorMessage = document.getElementById('js-errorMessage');
const confirmButton = document.getElementById('js-confirmButton');
const confirmModal = document.getElementById('js-confirmModal');
const background = document.getElementById('js-background');
const modalCloser = document.getElementById('js-modalCloser');
const confirmItems = confirmModal.querySelectorAll('.js-confirmItem');

const getErrors = () => {
	const errors = [];
	if (paperType.value === '') {
		errors.push('届け種類を記入してください。');
	}
	if (reason.value === '') {
		errors.push('理由を記入してください。');
	}
	if (
		(startMonth.value === '') |
		(startDay.value === '') |
		(lastMonth.value === '') |
		(lastDay.value === '')
	) {
		errors.push('期間を選択してください。');
	}
	if (startMonth.value + startDay.value > lastMonth.value + lastDay.value) {
		errors.push('期間を設定し直してください。');
	}
	if (
		(startHour.value === '') |
		(startMinute.value === '') |
		(lastHour.value === '') |
		(lastMinute.value === '')
	) {
		errors.push('時間を選択してください。');
	}
	if (startHour.value + startMinute.value > lastHour.value + lastMinute.value) {
		errors.push('時間を設定し直してください。');
	}
	return errors.length ? errors : false;
};

confirmButton.addEventListener('click', (e) => {
	e.preventDefault();
	errorMessage.classList.remove('is-active');
	errorMessage.innerHTML = '';
	if (getErrors()) {
		errorMessage.classList.add('is-active');
		const messages = getErrors();
		messages.forEach((message) => {
			const li = document.createElement('li');
			li.textContent = message;
			li.classList.add('errorMessageItem');
			errorMessage.appendChild(li);
		});
	} else {
		let i = 0;
		const confirmValues = [
			paperType.value,
			reason.value,
			startMonth.value === lastMonth.value && startDay.value === lastDay.value
				? `${startMonth.value}月${startDay.value}日`
				: `${startMonth.value}月${startDay.value}日 〜 ${lastMonth.value}月${lastDay.value}日`,
			`${startHour.value}：${startMinute.value} 〜 ${lastHour.value}：${lastMinute.value}`,
		];
		confirmItems.forEach((confirmItem) => {
			confirmItem.querySelector('dd').textContent = confirmValues[i];
			i++;
		});
		confirmModal.classList.add('is-active');
		background.classList.add('is-active');
	}
});

background.addEventListener('click', (e) => {
	e.preventDefault();
	confirmModal.classList.remove('is-active');
	background.classList.remove('is-active');
});
modalCloser.addEventListener('click', (e) => {
	e.preventDefault();
	confirmModal.classList.remove('is-active');
	background.classList.remove('is-active');
});
