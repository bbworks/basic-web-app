//Create private function to handle edits
(function() {
  //Find the edit buttons
  const editButtons = [...document.getElementsByClassName("post-edit-button")];

  //Create a funciton to modify the desired field
  const convertTagToInput = function(element) {
    const convertToInput = (element.tagName.toLowerCase() !== "input") ? true : false;

    if (convertToInput) {
      const value = element.innerText;
      element.innerText = null;
      element.outerHTML = element.outerHTML
        .replace(new RegExp("(<\/?)"+element.tagName.toLowerCase(), "g"), "$1input")
        .replace(">", " value=\""+value+"\">");
    }
    else {
      console.log("test");
    }
  };

  //Create a funciton to modify the desired field
  const toggleReadOnly = function(input, readOnly, clearValue) {
    //Create a function-scoped variable to hold the value before editing
    let valueBeforeEdit;

    //If we want to set it readOnly (or not), use that first
    // if we don't specify, toggle it
    const isReadOnly = (readOnly == null) ? !readOnly : ((input.getAttribute("readonly") === null) ? false : true);

    if (isReadOnly) {
      valueBeforeEdit = input.value;
    }

    const setReadOnlyOnBlur = function(input) {
      input.setAttribute("readonly", "");
    };

    if (isReadOnly) {
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (event)=>{setReadOnlyOnBlur(input);});
    }
    else {
      input.setAttribute("readonly", "");
      input.removeEventListener("blur", (event)=>{setReadOnlyOnBlur(input);});
      if (clearValue) {
        input.value = valueBeforeEdit;
      }
    }
  };

  //Bind the function as an event listener
  editButtons.forEach(button=>{
    button.addEventListener("click", (event)=>{toggleReadOnly(document.getElementById(button.getAttribute("data-input-id")))});
  });

  window.addEventListener("keydown", (event)=>{if (event.keyCode === 27) {toggleReadOnly(event.srcElement, false, true);}});

  (function() {
    const postForm = document.getElementsByClassName("post-form")[0];

    const formOnSubmit = function(event) {
      if (!event.submitter.classList.contains("post-save-button")) {
        event.preventDefault();
      }
    };

    postForm.addEventListener("submit", formOnSubmit);
  })();
})();
