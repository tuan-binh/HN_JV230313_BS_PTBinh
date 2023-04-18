let form = document.querySelector("form");
let submit = document.querySelector("button[type='submit']");
// console.log(submit);
let tbody = document.querySelector(".table tbody");

let username = document.getElementById("username");
let email = document.getElementById("email");
let telePhone = document.getElementById("tel");
let queQuan = document.getElementById("location");
let gender = document.querySelectorAll("input[type='radio']");
console.log(gender);

let search = document.querySelector(".search button");
let userInput = document.querySelector(".search input");

let patternMobile = "(+84|0)d{9,10}";

let sort = document.querySelector(".sort");
console.log(sort);

let listStudent = [];

// gender.addEventListener("click", handleGender);
// console.log(submit);
// let sex;
// function handleGender(e) {
//   console.log(e.target.id);
// }
form.onsubmit = function (e) {
  e.preventDefault();
};

tbody.onclick = function (e) {
  let index = e.target.parentElement.parentElement.id;
  if (e.target.classList.contains("delete")) {
    listStudent.splice(index, 1);
    render();
  }
  if (e.target.classList.contains("update")) {
    submit.style.display = "none";
    username.value = listStudent[index].name;
    email.value = listStudent[index].email;
    telePhone.value = listStudent[index].tel;
    queQuan.value = listStudent[index].location;

    let tr = e.target.parentElement.parentElement;
    tr.innerHTML = `<tr id="${index}">
              <th scope="row">${index + 1}</th>
              <td>${listStudent[index].name}</td>
              <td>${listStudent[index].email}</td>
              <td>${listStudent[index].tel}</td>
              <td>${listStudent[index].location}</td>
              <td>${listStudent[index].sex}</td>
              <td>
                <button type="button" class="btn btn-success confirm">confirm</button>
                <button type="button" class="btn btn-danger cancel">Cancel</button>
              </td>
            </tr>`;
  }
  if (e.target.classList.contains("confirm")) {
    submit.style.display = "block";
    let value1 =
      form.children[0].children[1].children[0].children[1].children[0].value;
    let value2 =
      form.children[0].children[1].children[1].children[1].children[0].value;
    let value3 =
      form.children[0].children[1].children[2].children[1].children[0].value;
    let value4 =
      form.children[0].children[1].children[3].children[1].children[0].value;
    let sex;
    for (let i = 0; i < gender.length; i++) {
      if (gender[i].checked) {
        sex = gender[i].value;
      }
    }
    listStudent[index].name = value1;
    listStudent[index].email = value2;
    listStudent[index].tel = value3;
    listStudent[index].location = value4;
    listStudent[index].sex = sex;
    username.value = "";
    email.value = "";
    telePhone.value = "";
    queQuan.value = "";
    render();
  }
  if (e.target.classList.contains("cancel")) {
    submit.style.display = "block";
    render();
  }
};

submit.addEventListener("click", handleClick);
function handleClick() {
  if (
    username.value === "" ||
    email.value === "" ||
    telePhone.value === "" ||
    queQuan.value === ""
    // telePhone.value !== patternMobile
  ) {
    alert(`Vui Lòng Nhập Vào Thông Tin`);
  } else {
    // alert("Bạn Đã Thêm Thành Công");
    let sex;
    for (let i = 0; i < gender.length; i++) {
      if (gender[i].checked) {
        sex = gender[i].value;
      }
    }
    // console.log(gender[0].value);
    let student = {
      id: listStudent.length + 1,
      name: username.value,
      email: email.value,
      tel: telePhone.value,
      location: queQuan.value,
      sex: sex,
    };
    listStudent.unshift(student);
    render();
    username.value = "";
    email.value = "";
    telePhone.value = "";
    queQuan.value = "";
  }
}
// nút sắp xếp
sort.onclick = function () {
  // console.log("hello");
  for (let i = 0; i < listStudent.length; i++) {
    for (let j = i + 1; j < listStudent.length; j++) {
      if (listStudent[i].id > listStudent[j].id) {
        let temp = listStudent[i];
        listStudent[i] = listStudent[j];
        listStudent[j] = temp;
      }
    }
  }
  render();
};
// function search

let table = document.querySelector(".info");
// tìm kiếm
userInput.onkeyup = function (e) {
  for (let i = 0; i < listStudent.length; i++) {
    if (listStudent[i].name.startsWith(e.target.value)) {
      let index = table.children[1].children[i];
      index.innerHTML = `<tr id="${i}">
                          <th scope="row">${listStudent[i].id}</th>
                          <td>${listStudent[i].name}</td>
                          <td>${listStudent[i].email}</td>
                          <td>${listStudent[i].tel}</td>
                          <td>${listStudent[i].location}</td>
                          <td>${listStudent[i].sex}</td>
                          <td>
                            <button type="button" class="btn btn-success update">Edit</button>
                            <button type="button" class="btn btn-danger delete">Delete</button>
                          </td>
                        </tr>`;
      // console.log("Có");
    } else {
      let index = table.children[1].children[i];
      index.style.display = "none";
      // console.log("Không có");
    }
    if (e.target.value === "") {
      render();
    }
  }
};

// search.onclick = function () {
//   let newSearch = listStudent.filter((e) => {
//     return userInput.value === e.name;
//   });

//   let html = newSearch.map((e, i) => {
//     return `<tr id="${i}">
//               <th scope="row">${e.id}</th>
//               <td>${e.name}</td>
//               <td>${e.email}</td>
//               <td>${e.tel}</td>
//               <td>${e.location}</td>
//               <td>${e.sex}</td>
//               <td>
//                 <button type="button" class="btn btn-success update">Edit</button>
//                 <button type="button" class="btn btn-danger delete">Delete</button>
//               </td>
//             </tr>`;
//   });
//   tbody.innerHTML = html.join("");
//   // tbody.innerHTML = html.join("");
// };

render();
// render
function render() {
  let html = listStudent.map((e, i) => {
    return `<tr id="${i}">
              <th scope="row">${e.id}</th>
              <td>${e.name}</td>
              <td>${e.email}</td>
              <td>${e.tel}</td>
              <td>${e.location}</td>
              <td>${e.sex}</td>
              <td>
                <button type="button" class="btn btn-success update">Edit</button>
                <button type="button" class="btn btn-danger delete">Delete</button>
              </td>
            </tr>`;
  });
  tbody.innerHTML = html.join("");
}
