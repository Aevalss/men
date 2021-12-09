document.querySelector(".sz-square").addEventListeners("click", function () {
  document.querySelectorAll(".sz-square").forEach(function () {
    this.classList.remove("active");
  });
  this.classList.add("active");
});
