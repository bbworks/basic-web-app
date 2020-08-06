//Create private function to handle phone number formatting
(function() {
  //Find the phone number input field
  const phoneNumberInput = document.getElementById("user-phone-number-input");

  //Create formatting function (that also prevents non-numeric input)
  const formatPhoneNumber = function(event) {
    if (event && event.data && !event.data.match(/\d/)) {
      event.preventDefault();
    }
    //console.log(event);
    //window.event = event;

    const number = phoneNumberInput.value.replace(/[^0-9]/g, "");
    phoneNumberInput.value = (number.length === 10) ? number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") : number;
  };

  //Bind the function as an event listener
  phoneNumberInput.addEventListener("input", formatPhoneNumber);

  //Also call the function from the start
  formatPhoneNumber();
})();

//Create dialog box asking the user to confirm saving the information
(function () {
  const saveButton = document.getElementsByClassName("user-account-save-button")[0];

  const displayDialogBeforeSubmit = function(displayBoolean) {
    //Find the dialog box
    const dialogContainer = document.getElementsByClassName("dialog-container")[0];
    //Either hide or display the form
    if (displayBoolean) {
      const form = document.getElementsByClassName("account-form")[0];
      const okButton = document.getElementsByClassName("dialog-ok-button")[0];
      const cancelButton = document.getElementsByClassName("dialog-cancel-button")[0];

      dialogContainer.style.display = "block";

      okButton.addEventListener("click", (event)=>{form.submit();})
      cancelButton.addEventListener("click", (event)=>{dialogContainer.style.display = "none";})
    }
    else {
      dialogContainer.style.display = "none";
    }
  };

  saveButton.addEventListener("click", (event)=>{displayDialogBeforeSubmit(true);});
}());

//Create function to handle the visibility of the save/cancel buttons
(function() {
  const inputs = {};
  let changed = new Set();

  const displayButtonsOnChange = function() {
    if (changed.size > 0) {
      document.getElementsByClassName("user-account-footer")[0].classList.add("display");
    }
    else {
      document.getElementsByClassName("user-account-footer")[0].classList.remove("display");
    }
  };

  new Array(...document.getElementsByTagName("input")).forEach(item=>{
    inputs[item.id] = item.value;
    item.addEventListener("input", event=>{
      if (item. value !== inputs[item.id]) {
        changed.add(item.id);
      }
      else {
        changed.delete(item.id);
      }
      displayButtonsOnChange();
    });
  });
  displayButtonsOnChange();
})();
