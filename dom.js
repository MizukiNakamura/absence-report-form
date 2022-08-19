class Dom {
	constructor(id) {
		this.id = id;
		this.dom = document.getElementById(this.id);
		this.elements = [];
	}
	getValue() {
		return this.dom.value;
	}
	setValue(value) {
		this.dom.value = value;
	}
	addClass(className) {
		// const dom = this.getDom();
		this.dom.classList.add(className);
	}
	removeClass(className) {
		// const dom = this.getDom();
		this.dom.classList.remove(className);
	}
	appendChild() {
		this.elements.forEach((element) => {
			const child = document.createElement('option');
			child.value = element;
			child.textContent = element;
			this.dom.appendChild(child);
		});
	}
	setMonth() {
		for (let i = 1; i <= 12; i++) {
			this.elements.push(i);
		}
		this.appendChild();
	}
	setDay() {
		const month =
			this.id === 'js-startDay' ? select_startMonth : select_lastMonth;
		month.dom.addEventListener('change', () => {
			this.elements = [];
			this.dom.innerHTML = '<option value="">---</option>';
			const pushElements = (max) => {
				for (let i = 1; i <= max; i++) {
					this.elements.push(i);
				}
			};
			switch (month.getValue()) {
				case '2':
					pushElements(28);
					break;
				case '4':
				case '6':
				case '9':
				case '11':
					pushElements(30);
					break;
				default:
					pushElements(31);
					break;
			}
			this.appendChild();
		});
	}
	setHour() {
		this.elements = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
		this.appendChild();
	}
	setMinute() {
		this.elements = ['00', '10', '20', '30', '40', '50'];
		this.appendChild();
	}
}

const form = new Dom('js-form');
const button_confirm = new Dom('js-confirmButton');
const button_submit = new Dom('js-submitButton');
const select_paperType = new Dom('js-paperType');
const input_reason = new Dom('js-reason');
const select_startMonth = new Dom('js-startMonth');
select_startMonth.setMonth();
const select_startDay = new Dom('js-startDay');
select_startDay.setDay();
const select_lastMonth = new Dom('js-lastMonth');
select_lastMonth.setMonth();
const select_lastDay = new Dom('js-lastDay');
select_lastDay.setDay();
const select_startHour = new Dom('js-startHour');
select_startHour.setHour();
const select_startMinute = new Dom('js-startMinute');
select_startMinute.setMinute();
const select_lastHour = new Dom('js-lastHour');
select_lastHour.setHour();
const select_lastMinute = new Dom('js-lastMinute');
select_lastMinute.setMinute();
const input_date = new Dom('js-date');
const errorBox = new Dom('js-errorBox');
const confirmModal = new Dom('js-confirmModal');
const modalCloser = new Dom('js-modalCloser');
const background = new Dom('js-background');

export {
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
};
