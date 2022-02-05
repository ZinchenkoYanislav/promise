let form = document.querySelector(".find-comment");
let input = form.elements["find-id"];
let wrapper = document.querySelector(".wrapper");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validate()) {
    fetchPlaceHolder(parseInt(input.value));
  }
});

function fetchPlaceHolder(numberId) {
  fetch("https://jsonplaceholder.typicode.com/posts/")
    .then((response) => response.json())
    .then((json) => {
      let elementId = json.find((elem) => elem.id === numberId);
      printComment(elementId.body);
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
      wrapper.innerHTML = "server error";
    });
}

function printComment(element) {
  wrapper.innerHTML = "";
  wrapper.insertAdjacentHTML(
    "afterbegin",
    `<div class="card">
        <div class="card-body">
          <h5 class="card-title">Сomment</h5>
          <p class="card-text">${element}</p>
        </div>
      </div>`
  );
}

function validate() {
  let validate = false;
  let errorNumber = document.querySelector(".errorNumber");
  console.log(errorNumber);
  if (parseInt(input.value) < 1 || parseInt(input.value) > 100) {
    errorNumber.classList.remove("hidden");
    validate = false;
  } else {
    errorNumber.classList.add("hidden");
    validate = true;
  }
  return validate;
}
