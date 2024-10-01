/*header */

const btnLogin = document.getElementById("btn-login");
const userControls = document.getElementById("user-controls");
const navMenu = document.getElementById("nav-menu");
const header = document.querySelector("header");
const btnMenu = document.getElementById("btn-menu");

const responsiveMenu = () => {
    if(window.innerWidth <= 768){
        navMenu.children[0].appendChild(btnLogin);
        header.appendChild(navMenu);
    }else{
        userControls.appendChild(btnLogin);
    }
};

responsiveMenu();

window.addEventListener("resize", responsiveMenu);

btnMenu.addEventListener("click", ()=>{
    navMenu.classList.toggle("mostrar");
});

/*swiper */
document.addEventListener("DOMContentLoaded", async () => {
    try{
        const response = await fetch("images.json");
        const dishes = await response.json();
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        dishes.forEach((dish) => {
            const slide = document.createElement("div");
            slide.classList.add("swiper-slide");
            slide.innerHTML=`<img src="${dish.url}" alt="${dish.title}"/>
            <div class="title"><span>${dish.title}</span></div>`;
            swiperWrapper.appendChild(slide);
        });

          const swiper = new Swiper(".swiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            initialSlide: 0,
            speed: 500,
            preventClicks: true,
            slidesPerView: "auto",
            loop: true,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slidesShadows:true,
            },
            on:{
                click(event){
                    swiper.slideTo(swiper.clickedIndex)
                }
            },
            pagination: {
              el: ".swiper-pagination",
              clickable:true,
            },
          });

          swiper.on("slideChangeTransitionEnd", () => {
            if(swiper.isEnd){
                swiper.loopFix();
            }
          });

    }catch(error){
        console.error("Error fetching images", error);
    }
});