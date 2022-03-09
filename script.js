"use strict";
const modalCity = document.querySelector(".show__city--1");
const overlay = document.querySelector(".overlay");
const btnCity = document.querySelectorAll(".btn-city");
const btnClose = document.querySelector(".close-show");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const btnHeader = document.querySelector(".btn--scroll-hd");
const nav = document.querySelector(".nav");
const slideImg = document.querySelectorAll(".slide");
const lightNext = document.querySelector(".btn-next");
const lightPrev = document.querySelector(".btn-prev");
const dotsImgC = document.querySelector(".dots-container");
const closeImg = document.querySelector(".close");
const modalResort = document.querySelector(".modal");
const imgclResort = document.querySelectorAll(".section-resort__photo");
const btnBuy = document.querySelectorAll(".btn-buy");
const boxSuccess = document.querySelector(".success");
const iconSeach = document.querySelector(".nav__icon-search");
const boxSeach = document.querySelector(".seach");

const modalShow = function (modal) {
    if (modal === "open") {
        modalCity.classList.remove("hidden");
        overlay.classList.remove("hidden");
    } else if (modal === "close") {
        modalCity.classList.add("hidden");
        overlay.classList.add("hidden");
        modalResort.classList.add("hidden");
        boxSeach.style.opacity = "0";
        boxSeach.style.zIndex = "-1";
    } else if (modal === "slide-open") {
        modalResort.classList.remove("hidden");
        overlay.classList.remove("hidden");
    } else if (modal === "seach-open") {
        boxSeach.style.opacity = "1";
        boxSeach.style.zIndex = "60";
        overlay.classList.remove("hidden");
    }
};

btnCity.forEach((cur) => cur.addEventListener("click", () => modalShow("open")));
btnClose.addEventListener("click", () => modalShow("close"));

// seach
iconSeach.addEventListener("click", () => modalShow("seach-open"));
overlay.addEventListener("click", () => modalShow("close"));
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") modalShow("close");
    if (e.key === "Escape") modalShow("close");
});

// scroll
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const navFixed = function (scroll) {
    const [entry] = scroll;
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(navFixed, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
btnHeader.addEventListener("click", function (e) {
    const scroll1 = section1.getBoundingClientRect();
    section1.scrollIntoView({ behavior: "smooth" });
});
// scroll header
document.querySelector(".nav__list").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

document.querySelectorAll(".box__list").forEach(function (cur) {
    cur.addEventListener("click", function (e) {
        e.preventDefault();
        if (e.target.classList.contains("box__link")) {
            const id = e.target.getAttribute("href");
            document.querySelector(id).scrollIntoView({ behavior: "smooth" });
        }
    });
});

let boxS;
const checkSuccess = function () {
    boxS = false;
    if (boxS === false)
        return setTimeout(() => (boxSuccess.style.transform = `translateX(120%)`), 1000);
};
btnBuy.forEach((cur) =>
    cur.addEventListener("click", function (e) {
        boxSuccess.style.transform = `translateX(0)`;
        checkSuccess();
    })
);

const allSection = document.querySelectorAll(".section");
const sectionAffect = function (entries, obv) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    obv.unobserve(entry.target);
    console.log(entry.target);
};

const sectionObsever = new IntersectionObserver(sectionAffect, {
    root: null,
    threshold: 0.15,
});

allSection.forEach((section) => {
    sectionObsever.observe(section);
    section.classList.add("section--hidden");
});
////////////////////////////
let s = 0;
const runSlide = function () {
    const createDots = function () {
        slideImg.forEach(function (_, i) {
            dotsImgC.insertAdjacentHTML(
                "beforeend",
                `
            <div class="column" data-size="${i}">
                <img src="img/villa-${i + 1}.jpg" alt="" class="dot-img" data-img="${i}">
            </div>
        `
            );
        });
    };
    const activeDots = function (size) {
        document
            .querySelectorAll(".column")
            .forEach((dot) => dot.classList.remove("column--active"));
        document.querySelector(`.column[data-size="${size}"]`).classList.add("column--active");
    };

    const gotoslide = function (slides) {
        slideImg.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slides)}%)`));
    };
    const lightBoxNext = function () {
        s === slideImg.length - 1 ? (s = 0) : s++;
        gotoslide(s);
        activeDots(s);
    };

    const lightBoxPrev = function () {
        s === 0 ? (s = slideImg.length - 1) : s--;
        gotoslide(s);
        activeDots(s);
    };

    lightPrev.addEventListener("click", lightBoxPrev);
    lightNext.addEventListener("click", lightBoxNext);
    closeImg.addEventListener("click", () => modalShow("close"));

    imgclResort.forEach(function (cur, i) {
        cur.addEventListener("click", function (e) {
            modalShow("slide-open");
            if (e.target.classList.contains("section-resort__photo")) {
                const { resort } = e.target.dataset;
                gotoslide(resort);
                activeDots(resort);
            }
        });
    });

    dotsImgC.addEventListener("click", function (e) {
        if (e.target.classList.contains("dot-img")) {
            const { img } = e.target.dataset;
            gotoslide(img);
            activeDots(img);
        }
    });
    document.addEventListener("keyup", (e) => {
        console.log(e.key);
        if (e.key === "ArrowRight") lightBoxNext();
        if (e.key === "ArrowLeft") lightBoxPrev();
        if (e.key === "Escape") modalShow("close");
    });
    createDots();
};
runSlide();