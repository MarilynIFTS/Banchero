const inputAdd = document.getElementById("input-name");
const inputPrice = document.getElementById("input-price");
const btnAdd = document.getElementById("btn-add");
const dishSection = document.querySelector(".dish-section");
const dishesLocal = JSON.parse(localStorage.getItem("dishesLocal")) || [];
let editId = null;


const addDish = ()=> {

    const dishText = inputAdd.value.trim();
    const priceText = inputPrice.value.trim();
    if(dishText === "" || priceText === "") return

    if(editId !== null){
        dishesLocal[editId].name = inputAdd.value;
        dishesLocal[editId].price = inputPrice.value;

        localStorage.setItem("dishesLocal", JSON.stringify(dishesLocal));

        editId = null
        btnAdd.textContent = "+";
    }else{

    const dish = {
        name: inputAdd.value,
        price: inputPrice.value,
    };

    dishesLocal.push(dish);

    localStorage.setItem("dishesLocal", JSON.stringify(dishesLocal));


    displayDishes();
    }

    inputAdd.value = "";
    inputPrice.value = "";
    displayDishes();
};

let btnTrash = document.querySelectorAll(".btn-trash");
let btnEdit = document.querySelectorAll(".btn-edit");

const generateId = () => Math.floor(Math.random() * 3000);

const remove = (i) => {
    dishesLocal.splice(i, 1);

    localStorage.setItem("dishesLocal", JSON.stringify(dishesLocal));

    displayDishes();
}

const edit = (i) => {

    inputAdd.value = dishesLocal[i].name;
    inputPrice.value = dishesLocal[i].price;
    btnAdd.textContent = "✔";
    editId = i;
}

const displayDishes = (i) => {

    dishDivs = document.querySelectorAll(".dish");

    dishDivs.forEach(dish => dish.remove());

    dishesLocal.forEach((dish, i) => {
        let divDish = document.createElement("div");
        divDish.classList.add("dish");
        divDish.setAttribute("id", i);

        divDish.innerHTML = `
                        <h4 class="description">${dish.name}</h4>
                        <h4 class="price">${dish.price}</h4>
                        <div class="abm-container">
                            <button class="btn-edit" onclick="edit(${i})"><img src="imgs/icon-edit.svg" alt="edit icon"></button>
                            <button class="btn-trash" onclick="remove(${i})"><img src="imgs/icon-trash.svg" alt="trash icon"></button>
                        </div>`

        dishSection.appendChild(divDish);
    });
};

document.addEventListener("DOMContentLoaded", displayDishes);
btnAdd.addEventListener("click", addDish);