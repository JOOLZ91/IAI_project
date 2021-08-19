// MODAL POP-UP

const openModalButton = document.querySelector("button.main");
const closeModalButton = document.querySelector(".close");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const shoppingAlert = document.querySelector(".alert");

openModalButton.addEventListener("click", () => {
  openModal();
});

overlay.addEventListener("click", () => {
  closeModal();
});

closeModalButton.addEventListener("click", () => {
  closeModal();
});

const openModal = () => {
  modal.classList.add("active");
  overlay.classList.add("active");
};

const closeModal = () => {
  overlay.style.zIndex = "0";
  modal.classList.remove("active");
  overlay.classList.remove("active");
  shoppingAlert.classList.remove("active");
};

// SELECTORS

const productName = document.querySelector(".product");
const productPrice = document.querySelector(".price");
const productSmall = document.querySelector(".small");
const productMedium = document.querySelector(".medium");
const productLarge = document.querySelector(".large");
const productColorSilver = document.querySelector(".silver");
const productColorBlack = document.querySelector(".black");
const productColorWhite = document.querySelector(".white");
const productAvailable = document.querySelector(".available-product");
const productAmount = document.querySelector(".amount");
const availableIcon = document.querySelector(".available");
const notAvailableIcon = document.querySelector(".notavailable");
const plusButton = document.querySelector(".plus");
const minusButton = document.querySelector(".minus");
const select = document.getElementById("color");
const image = document.querySelector(".photo-image");
const addProduct = document.querySelector(".add-product");

const shoppingName = document.querySelector(".shopping-product-name");
const shoppingPrice = document.querySelector(".shopping-product-price");
const shoppingColor = document.querySelector(".shopping-product-color");
const shoppingQuantity = document.querySelector(".shopping-product-quantity");
const shoppingAllTogether = document.querySelector(
  ".shopping-product-alltogether"
);

// VARIABLES

let quantity = 1;
let price = 1;
let amount = 1;
let priceDifferences = {};
let images = {};
let jsonData;

// FETCH DATA

const domFetch = () => {
  fetch("/xbox.json")
    .then((res) => res.json())
    .then((data) => {
      jsonData = data;
      image.setAttribute(
        "src",
        data.multiversions[0].items["1-1"].products[0].url
      );
      productName.innerHTML = data.product.name;
      price = data.sizes.items.U.price;
      productSmall.innerHTML = data.sizes.items.U.name;
      productMedium.innerHTML = data.sizes.items.V.name;
      productLarge.innerHTML = data.sizes.items.W.name;
      productColorSilver.innerHTML =
        data.multiversions[0].items["1-1"].values[61].name;
      productColorBlack.innerHTML =
        data.multiversions[0].items["1-2"].values[60].name;
      productColorWhite.innerHTML =
        data.multiversions[0].items["1-3"].values[59].name;
      productAvailable.innerHTML = data.sizes.items.U.status;
      productPrice.innerHTML = price + ",00 zł";
      productAmount.innerHTML = quantity;

      let multiItems = Object.keys(data.multiversions[0].items);
      multiItems.forEach((i) => {
        let item = data.multiversions[0].items[i];

        priceDifferences[item.values[item.values_id].name] =
          item.products[0].price_difference;
      });

      multiItems.forEach((i) => {
        let item = data.multiversions[0].items[i];
        images[item.values[item.values_id].name] = item.products[0].url;
      });
    });
};

// FUNCTIONS

const getSelectedValue = () => {
  productPrice.innerHTML =
    price + parseInt(priceDifferences[select.value]) + ",00 zł";
  image.setAttribute("src", images[select.value]);
};

// SHOPPING ALERT

addProduct.addEventListener("click", (e) => {
  e.preventDefault();
  if (quantity > amount) {
    alert(
      `Przepraszamy, nie mamy w magazynie takiej ilości produktu, posiadamy tylko ${amount}`
    );
  } else {
    overlay.style.zIndex = "25";
    shoppingAlert.classList.add("active");
    shoppingName.innerHTML = `${jsonData.product.name}`;
    shoppingPrice.innerHTML = `${price},00 zł`;
    shoppingColor.innerHTML = `Wariant: ${select.value}`;
    shoppingQuantity.innerHTML = `Ilość sztuk: ${quantity}`;
    shoppingAllTogether.innerHTML = `Razem: ${price * quantity},00 zł`;
  }
});

//EVENT LISTENERS

productSmall.addEventListener("click", () => {
  const sizes = jsonData.sizes.items;
  productAvailable.innerHTML = sizes.U.status;
  amount = sizes.U.amount;
  price = sizes.U.price;
  productPrice.innerHTML =
    price + parseInt(priceDifferences[select.value]) + ",00 zł";

  if (!amount) {
    notAvailableIcon.classList.add("active");
    availableIcon.classList.add("notactive");
  } else {
    notAvailableIcon.classList.remove("active");
    availableIcon.classList.remove("notactive");
  }
});

productMedium.addEventListener("click", () => {
  const sizes = jsonData.sizes.items;
  productAvailable.innerHTML = sizes.V.status;
  amount = sizes.V.amount;
  price = sizes.V.price;
  productPrice.innerHTML =
    price + parseInt(priceDifferences[select.value]) + ",00 zł";

  if (!amount) {
    notAvailableIcon.classList.add("active");
    availableIcon.classList.add("notactive");
  } else {
    notAvailableIcon.classList.remove("active");
    availableIcon.classList.remove("notactive");
  }
});

productLarge.addEventListener("click", () => {
  const sizes = jsonData.sizes.items;
  productAvailable.innerHTML = sizes.W.status;
  amount = sizes.W.amount;
  price = sizes.W.price;
  productPrice.innerHTML =
    price + parseInt(priceDifferences[select.value]) + ",00 zł";

  if (!amount) {
    notAvailableIcon.classList.add("active");
    availableIcon.classList.add("notactive");
  } else {
    notAvailableIcon.classList.remove("active");
    availableIcon.classList.remove("notactive");
  }
});

plusButton.addEventListener("click", () => {
  if (quantity >= amount) {
    alert(
      `Przepraszamy, nie mamy więcej tego produktu w magazynie, aktualnie posiadamy tylko ${amount}`
    );
    return;
  }
  quantity += 1;
  productAmount.innerHTML = quantity;
});

minusButton.addEventListener("click", () => {
  if (quantity === 1) return;
  quantity -= 1;
  productAmount.innerHTML = quantity;
});

select.addEventListener("change", () => {
  getSelectedValue();
});

document.addEventListener("DOMContentLoaded", domFetch());
