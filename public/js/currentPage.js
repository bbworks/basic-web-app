const CurrentPageDetector = function() {
  let headerNavContainerNodes = document.getElementsByClassName("navbar")[0].childNodes;
  for(var i in headerNavContainerNodes) {
    let element = headerNavContainerNodes[i];
    if (element.href && element.href === window.location.href) {
      element.classList.add("current");
    }
  }
}();
