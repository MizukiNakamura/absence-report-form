import {
	form,
	button_confirm,
	button_submit,
	select_paperType,
	input_reason,
	select_startMonth,
	select_startDay,
	select_lastMonth,
	select_lastDay,
	select_startHour,
	select_startMinute,
	select_lastHour,
	select_lastMinute,
	input_date,
	errorBox,
	confirmModal,
	modalCloser,
	background,
} from './dom.js';

// 送信ボタン
button_submit.dom.addEventListener('click', (e) => {
	e.preventDefault();
	form.dom.submit();
});

// 日付取得
const today = new Date();
input_date.setValue(
	`届け日： ${today.getFullYear()}年 ${
		today.getMonth() + 1
	}月 ${today.getDate()}日`
);

const message = {
	paperType: '届け種類を記入してください。',
	reason: '理由を記入してください。',
	span: '期間を選択してください。',
	reselect_date: '期間の設定が間違っています。',
	time: '時間を選択してください。',
	reselect_time: '時間の設定が間違っています。',
};

const getErrors = () => {
	const startDate = new Date(
		2022,
		select_startMonth.getValue(),
		select_startDay.getValue()
	);
	const lastDate = new Date(
		2022,
		select_lastMonth.getValue(),
		select_lastDay.getValue()
	);
	const startTime = new Date(
		2022,
		1,
		1,
		select_startHour.getValue(),
		Number(select_startMinute.getValue())
	);
	const lastTime = new Date(
		2022,
		1,
		1,
		select_lastHour.getValue(),
		Number(select_lastMinute.getValue())
	);
	const errors = [];
	const errorItems = [];
	// 届け出種類
	if (select_paperType.getValue() === '') {
		errors.push(message.paperType);
		errorItems.push(select_paperType);
	}
	// 理由
	if (input_reason.getValue() === '') {
		errors.push(message.reason);
		errorItems.push(input_reason);
	}
	// 期間
	if (
		(select_startMonth.getValue() === '') |
		(select_startDay.getValue() === '') |
		(select_lastMonth.getValue() === '') |
		(select_lastDay.getValue() === '')
	) {
		errors.push(message.span);
		errorItems.push(
			select_startMonth,
			select_startDay,
			select_lastMonth,
			select_lastDay
		);
	} else if (startDate > lastDate) {
		errors.push(message.reselect_date);
		errorItems.push(
			select_startMonth,
			select_startDay,
			select_lastMonth,
			select_lastDay
		);
	}
	// 時間
	if (
		(select_startHour.getValue() === '') |
		(select_startMinute.getValue() === '') |
		(select_lastHour.getValue() === '') |
		(select_lastMinute.getValue() === '')
	) {
		errors.push(message.time);
		errorItems.push(
			select_startHour,
			select_startMinute,
			select_lastHour,
			select_lastMinute
		);
	} else if (startTime > lastTime) {
		errors.push(message.reselect_time);
		errorItems.push(
			select_startHour,
			select_startMinute,
			select_lastHour,
			select_lastMinute
		);
	}
	const errorInfo = {
		errors: errors,
		errorItems: errorItems,
	};
	return errors.length === 0 ? false : errorInfo;
};

// 確認画面へ
button_confirm.dom.addEventListener('click', (e) => {
	e.preventDefault();
	errorBox.removeClass('is-active');
	errorBox.dom.innerHTML = '';
	form.dom.querySelectorAll('.is-error').forEach((errorItem) => {
		errorItem.classList.remove('is-error');
	});
	if (getErrors()) {
		errorBox.addClass('is-active');
		const errors = getErrors().errors;
		const errorItems = getErrors().errorItems;
		errors.forEach((error) => {
			const li = document.createElement('li');
			li.textContent = error;
			li.classList.add('errorMessageItem');
			errorBox.dom.appendChild(li);
		});
		errorItems.forEach((errorItem) => {
			errorItem.addClass('is-error');
		});
	} else {
		const value = {
			paperType: select_paperType.getValue(),
			reason: input_reason.getValue(),
			startMonth: select_startMonth.getValue(),
			lastMonth: select_lastMonth.getValue(),
			startDay: select_startDay.getValue(),
			lastDay: select_lastDay.getValue(),
			startHour: select_startHour.getValue(),
			lastHour: select_lastHour.getValue(),
			startMinute: select_startMinute.getValue(),
			lastMinute: select_lastMinute.getValue(),
		};
		const listItems = confirmModal.dom.querySelectorAll('.js-confirmItem');
		for (let [i, listItem] of listItems.entries()) {
			switch (i) {
				case 0:
					listItem.querySelector('dd').textContent = value.paperType;
					break;
				case 1:
					listItem.querySelector('dd').textContent = value.reason;
					break;
				case 2:
					const startDate = `${value.startMonth}月${value.startDay}日`;
					const lastDate = `${value.lastMonth}月${value.lastDay}日`;
					if (startDate === lastDate) {
						listItem.querySelector('dd').textContent = startDate;
					} else {
						listItem.querySelector(
							'dd'
						).textContent = `${startDate} 〜 ${lastDate}`;
					}
					break;
				case 3:
					const startTime = `${value.startHour}:${value.startMinute}`;
					const lastTime = `${value.lastHour}:${value.lastMinute}`;
					listItem.querySelector(
						'dd'
					).textContent = `${startTime} 〜 ${lastTime}`;
					break;
			}
		}
		confirmModal.addClass('is-active');
		background.addClass('is-active');
	}
});
background.dom.addEventListener('click', (e) => {
	e.preventDefault();
	confirmModal.removeClass('is-active');
	background.removeClass('is-active');
});
modalCloser.dom.addEventListener('click', (e) => {
	e.preventDefault();
	confirmModal.removeClass('is-active');
	background.removeClass('is-active');
});
