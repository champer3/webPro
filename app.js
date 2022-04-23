let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //init controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each slides
  sliders.forEach((slider, index, sliders) => {
    const revealImg = slider.querySelector(".reveal-img");
    const img = slider.querySelector("img");
    const revealText = slider.querySelector(".reveal-text");
    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inout" },
    });
    // gsap.to(revealImg, 1, {x: "100%"})
    // gsap.to(img, 1, {scale: 2})
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
    //Create a scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slider,
      triggerHook: 0.45,
      reverse: false,
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(controller);
    //New Animation
    const pageTl = gsap.timeline();
    let nextSlide = sliders.length - 1 === index ? "end" : sliders[index + 1]
    pageTl.fromTo(nextSlide, {y: "0%"}, {y: "50%"})
    pageTl.fromTo(slider, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, {y: "50%"}, {y: "0%"}, "-=0.5")
    //   create New Scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slider,
      duration: "100%",
      triggerHook: 0,
    })
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "page",
        indent: 200
      })
      .setPin(slider, {pushFollowers: false})
      .setTween(pageTl)
      .addTo(controller);
  });
}

let mouse = document.querySelector('.cursor')
let mouseTxt = mouse.querySelector('span')
let burger = document.querySelector('.burger')

function cursor(e){
  mouse.style.top = e.pageY + "px"
  mouse.style.left = e.pageX + "px"
}

function activeCursor(e){
  const item = e.target
  if(item.id === "logo" || item.classList.contains('burger')){
    mouse.classList.add('nav-active')
  }else{
    mouse.classList.remove('nav-active')
  }
  if(item.classList.contains('explore')){
    mouse.classList.add('explore-active')
    gsap.to('.title-swap', 1, {y: "0%"})
    mouseTxt.innerText = 'Tap'
  }else{
    mouse.classList.remove('explore-active')
    gsap.to('.title-swap', 1, {y: "100%"})
    mouseTxt.innerText = ''
  }
}

function navToggle(e){
  if(!e.target.classList.contains("active")){
    e.target.classList.add("active")
    gsap.to(".line1", 0.5, {rotate: "45", y: 5, background: "black"})
    gsap.to(".line2", 0.5, {rotate: "-45", y: -5, background: "black"})
    gsap.to("#logo", 1, {color: "black"})
    gsap.to(".nav-bar", 1, {clipPath: "circle(2500px at 100% -10%)"})
    document.body.classList.add("hide")
  }else{
    e.target.classList.remove("active")
    gsap.to(".line1", 0.5, {rotate: "0", y: 0, background: "white"})
    gsap.to(".line2", 0.5, {rotate: "0", y: 0, background: "white"})
    gsap.to("#logo", 1, {color: "white"})
    gsap.to(".nav-bar", 1, {clipPath: "circle(50px at 100% -10%)"})
    document.body.classList.remove("hide")
  }
}


burger.addEventListener('click', navToggle)
window.addEventListener("mousemove", cursor)
window.addEventListener("mouseover", activeCursor)

animateSlides();



