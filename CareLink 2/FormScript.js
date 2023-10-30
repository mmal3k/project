const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");



const fullNameInput = document.getElementById('FullName');
const ageInput = document.getElementById('Bdate');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const postcodeInput = document.getElementById('postcode');
const description = document.querySelector("textarea");
const genderInput = document.getElementById('gender');

//prevent default of enter key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // You can add any custom logic here if needed.
  }
});



function checkInputs() {
  // Initialize a flag to track if there are issues
  let hasIssues = false;

  // trim to remove the whitespaces
  const fullNameInputValue = fullNameInput.value.trim();
  const ageInputValue = ageInput.value.trim();
  const phoneInputValue = phoneInput.value.trim();
  const emailInputValue = emailInput.value.trim();
  const postcodeInputValue = postcodeInput.value.trim();
  const descriptionValue = description.value.trim();

  if (fullNameInputValue === '') {
    setErrorFor(fullNameInput, 'Full Name cannot be blank');
    hasIssues = true; // Set the flag to true
  } else {
    setSuccessFor(fullNameInput);
  }

  if (ageInputValue === '') {
    setErrorFor(ageInput, 'Bdate cannot be blank');
    hasIssues = true; // Set the flag to true
  } else {
    setSuccessFor(ageInput);
  }

  if (emailInputValue === '') {
    setErrorFor(emailInput, 'Email cannot be blank');
    hasIssues = true; // Set the flag to true
  } else if (!isEmail(emailInputValue)) {
    setErrorFor(emailInput, 'Not a valid email');
    hasIssues = true; // Set the flag to true
  } else {
    setSuccessFor(emailInput);
  }

  if (phoneInputValue === '') {
    setErrorFor(phoneInput, 'Phone Number cannot be blank');
    hasIssues = true; // Set the flag to true
  } else if (!/^0[567]/.test(phoneInputValue)) {
    setErrorFor(phoneInput, ' Invalid Phone Number ');
    hasIssues = true; // Set the flag to true
  } else {
    setSuccessFor(phoneInput);
  }

  if (postcodeInputValue === '') {
    setErrorFor(postcodeInput, 'Post Code cannot be blank');
    hasIssues = true; // Set the flag to true
  } 
  else {
    setSuccessFor(postcodeInput);
  }

  // Return true if there are no issues, otherwise return false
  return !hasIssues;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'input-group error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'input-group success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
     
    if(btn.classList.contains("arrow-next"))
    {
      if(checkInputs()){
        formStepsNum++;
      updateFormSteps();
      updateProgressbar();
      }
    }
    else{
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}


// JavaScript code can be added here to enforce single-choice behavior
const checkboxes = document.querySelectorAll('.check');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        const group = document.querySelectorAll(`[name="${checkbox.name}"]`);
        group.forEach(otherCheckbox => {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });



function activate() {
	document.head.insertAdjacentHTML("beforeend", `
		<style>
			.time-picker {
				position: absolute;
				display: inline-block;
				padding: 10px;
				background: #eeeeee;
				border-radius: 6px;
			}

			.time-picker__select {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				outline: none;
				text-align: center;
				border: 1px solid #dddddd;
				border-radius: 6px;
				padding: 6px 10px;
				background: #ffffff;
				cursor: pointer;
				font-family: 'Heebo', sans-serif;
			}
		</style>
	`);

	document.querySelectorAll(".time-pickable").forEach(timePickable => {
		let activePicker = null;

		timePickable.addEventListener("focus", () => {
			if (activePicker) return;

			activePicker = show(timePickable);

			const onClickAway = ({ target }) => {
				if (
					target === activePicker
					|| target === timePickable
					|| activePicker.contains(target)
				) {
					return;
				}

				document.removeEventListener("mousedown", onClickAway);
				document.body.removeChild(activePicker);
				activePicker = null;
			};

			document.addEventListener("mousedown", onClickAway);
		});
	});
}

function show(timePickable) {
	const picker = buildPicker(timePickable);
	const { bottom: top, left } = timePickable.getBoundingClientRect();

	picker.style.top = `${top}px`;
	picker.style.left = `${left}px`;

	document.body.appendChild(picker);

	return picker;
}

function buildPicker(timePickable) {
	const picker = document.createElement("div");
	const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption);
	const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(numberToOption);

	picker.classList.add("time-picker");
	picker.innerHTML = `
		<select class="time-picker__select">
			${hourOptions.join("")}
		</select>
		:
		<select class="time-picker__select">
			${minuteOptions.join("")}
		</select>
		<select class="time-picker__select">
			<option value="am">am</option>
			<option value="pm">pm</option>
		</select>
	`;

	const selects = getSelectsFromPicker(picker);

	selects.hour.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
	selects.minute.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
	selects.meridiem.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));

	if (timePickable.value) {
		const { hour, minute, meridiem } = getTimePartsFromPickable(timePickable);

		selects.hour.value = hour;
		selects.minute.value = minute;
		selects.meridiem.value = meridiem;
	}

	return picker;
}

function getTimePartsFromPickable(timePickable) {
	const pattern = /^(\d+):(\d+) (am|pm)$/;
	const [hour, minute, meridiem] = Array.from(timePickable.value.match(pattern)).splice(1);

	return {
		hour,
		minute,
		meridiem
	};
}

function getSelectsFromPicker(timePicker) {
	const [hour, minute, meridiem] = timePicker.querySelectorAll(".time-picker__select");

	return {
		hour,
		minute,
		meridiem
	};
}

function getTimeStringFromPicker(timePicker) {
	const selects = getSelectsFromPicker(timePicker);

	return `${selects.hour.value}:${selects.minute.value} ${selects.meridiem.value}`;
}

function numberToOption(number) {
	const padded = number.toString().padStart(2, "0");

	return `<option value="${padded}">${padded}</option>`;
}

function show(timePickable) {
  const picker = buildPicker(timePickable);
  const { bottom: top, left } = timePickable.getBoundingClientRect();

  picker.style.top = `${top + 10}px`; // Increase top position to show picker under input
  picker.style.left = `${left}px`;

  document.body.appendChild(picker);

  window.addEventListener('resize', onResize); // Handle window resizing

  return picker;
}

function onResize() {
  const pickers = document.querySelectorAll('.time-picker');
  pickers.forEach(picker => {
      const timePickable = picker.parentElement.querySelector('.time-pickable');
      const { bottom: top, left } = timePickable.getBoundingClientRect();

      picker.style.top = `${top + 10}px`;
      picker.style.left = `${left}px`;
  });
}

activate();


function focusNext(event, nextFieldId) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission
        document.getElementById(nextFieldId).focus();
      }
    }


// Get a reference to the button element by its ID
var submitButton1 = document.getElementById("submitButton1");

// Add a click event listener to the button
submitButton1.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission
    // Redirect to ThankYouPage1.html when the button is clicked
    window.location.href = "ThankYouPage1.html";
});


// Get a reference to the button element by its ID
var submitButton2 = document.getElementById("submitButton2");

// Add a click event listener to the button
submitButton2.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission
    // Redirect to ThankYouPage1.html when the button is clicked
    window.location.href = "ThankYouPage2.html";
});







