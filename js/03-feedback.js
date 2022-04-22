const _throttle = require("lodash.throttle");

const refs = {
	form: document.querySelector(".feedback-form"),
	input: document.querySelector(".feedback-form input"),
	textarea: document.querySelector(".feedback-form textarea"),
	button: document.querySelector(".feedback-form button"),
};

let formDataInput = {};

if (localStorage.getItem("feedback-form-state")) {
	const markupJSON = localStorage.getItem("feedback-form-state");
	formDataInput = JSON.parse(markupJSON);

	if (formDataInput.email) refs.input.value = formDataInput.email;

	if (formDataInput.message) refs.textarea.value = formDataInput.message;
}

const onInput = (event) => {
	formDataInput[event.target.name] = event.target.value;
	const markupJSON = JSON.stringify(formDataInput);
	localStorage.setItem("feedback-form-state", markupJSON);
};
refs.form.addEventListener("input", _throttle(onInput, 500));

refs.button.addEventListener("click", (event) => {
	event.preventDefault();
	console.log(formDataInput);
	refs.form.reset();
	formDataInput = {};
	localStorage.removeItem("feedback-form-state");
});
