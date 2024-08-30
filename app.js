document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let listHTML = document.querySelector(".carousel .list");
let seeMoreButtons = document.querySelectorAll(".seeMore");
let backButton = document.getElementById("back");

nextButton.onclick = function () {
  showSlider("next");
};
prevButton.onclick = function () {
  showSlider("prev");
};
let unAcceppClick;
const showSlider = (type) => {
  nextButton.style.pointerEvents = "none";
  prevButton.style.pointerEvents = "none";

  carousel.classList.remove("next", "prev");
  let items = document.querySelectorAll(".carousel .list .item");
  if (type === "next") {
    listHTML.appendChild(items[0]);
    carousel.classList.add("next");
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add("prev");
  }
  clearTimeout(unAcceppClick);
  unAcceppClick = setTimeout(() => {
    nextButton.style.pointerEvents = "auto";
    prevButton.style.pointerEvents = "auto";
  }, 2000);
};
seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    carousel.classList.remove("next", "prev");
    carousel.classList.add("showDetail");
  };
});
backButton.onclick = function () {
  carousel.classList.remove("showDetail");
};

//cars list

document.addEventListener("DOMContentLoaded", () => {
  const carData = [
    {
      image: "2.jpg",
      title: "Car Model 1",
      attributes: [
        { icon: "hp-icon.png", subtitle: "Horsepower", value: "300 HP" },
        { icon: "speed-icon.png", subtitle: "Speed", value: "250 km/h" },
        { icon: "search-icon.png", subtitle: "Search", value: "" },
      ],
      description: "Detailed description about Car Model 1.",
    },
    // Add more car data here
  ];

  const carTypesSection = document.getElementById("car-types");
  const modal = document.getElementById("car-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");

  carData.forEach((car, index) => {
    const card = document.createElement("div");
    card.className = "car-card";

    card.innerHTML = `
            <img src="${car.image}" alt="${car.title}" class="car-image">
            <h2 class="car-title">${car.title}</h2>
            <div class="car-info">
                ${car.attributes
                  .map(
                    (attr) => `
                    <div class="info-item">
                        <img src="${attr.icon}" alt="${attr.subtitle} Icon" class="info-icon">
                        <span class="info-subtitle">${attr.subtitle}</span>
                        <p class="info-value">${attr.value}</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <button class="more-details-button" data-index="${index}">More Details</button>
        `;

    carTypesSection.appendChild(card);
  });

  carTypesSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("more-details-button")) {
      const index = e.target.getAttribute("data-index");
      const car = carData[index];
      modalTitle.textContent = car.title;
      modalDescription.textContent = car.description;
      modal.style.display = "flex";
    }
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
