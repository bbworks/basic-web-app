(function() {
  //Get the component
  const searchBar = document.querySelector(".search-bar");

  const searchBarForm = searchBar.querySelector(".search-bar-form");
  const searchBarInput = searchBar.querySelector(".search-bar-input");
  const searchBarSubmit = searchBar.querySelector(".search-bar-submit");

  //Declare functions
  const isDescendantOf = (element, potentialParent) => {
    if (
      element.parentElement &&
      potentialParent &&
      element.parentElement !== potentialParent
    ) return isDescendantOf(element.parentElement, potentialParent);

    return element.parentElement != null &&
      potentialParent != null &&
      element.parentElement === potentialParent;
  };

  const handleSearchBarFormOnSubmit = (event) => {
    //If not yet in "search" view, switch to it
    if (!searchBar.classList.contains("search")) {
      //Prevent the form from submitting
      event.preventDefault();

      //Put the search bar into "search" view
      searchBar.classList.add("search");

      //Add an event listener to close "search" view if
      // something else is clicked
      const handleSearchBarOnBlur = (event) => {
        //If clicked outside of the search-bar, close "search" view
        if (!isDescendantOf(event.target, searchBar)) {
          searchBar.classList.remove("search");
          document.removeEventListener("click", handleSearchBarOnBlur);
        }
      };
      document.addEventListener("click", handleSearchBarOnBlur);

      return;
    }

    //Otherwise, validate that "q" isn't empty
    if (!searchBarInput.value) return event.preventDefault();

    //Otherwise submit the form
  };

  searchBarForm.addEventListener("submit", handleSearchBarFormOnSubmit);
})();
