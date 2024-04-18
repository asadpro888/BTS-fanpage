const typedTextSpan = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

let words = ["피부가 윤기난다", "김석진", "민윤기", "정호석", "김남준", "박지민"];
const typingDelay = 200;
const erasingDelay = 200;
const newLetterDelay = 2000;
let index = 0;
let charIndex = 0;

document.addEventListener('DOMContentLoaded', ()=> {
    if(words.length){
        setTimeout(type, newLetterDelay)
    }
})

function type(){
    if (charIndex < words [index].length){
        typedTextSpan.textContent += words[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay );
    }else{
        setTimeout(erase, newLetterDelay );
    }
}

function erase(){
    if (charIndex > 0){
        typedTextSpan.textContent = words[index].substring(0, charIndex -1)
        charIndex--;
        setTimeout(erase, erasingDelay)
    }else{
        index++;
        if(index >= words.length){
            index = 0;
        }
        setTimeout(type, typingDelay + 1100);

    }
}
const imageContainerEl = document.querySelector(".image-container");

const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");
let x = 0;
prevEl.addEventListener("click", ()=>{
    x = x + 45;
    updateGallery()
});
nextEl.addEventListener("click", ()=>{
    x = x - 45;
    updateGallery()
});

function updateGallery(){
    imageContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`;
    setTimeout(()=>{
        x = x -45
        updateGallery()
    }, 3000)
}

updateGallery() 
const slides = document.querySelectorAll(".slide");
var counter = 0;

slides.forEach(
    (slide,index) => {
        slide.style.left = `${index * 100}%`
    }
)
const goPrev = () => {
    counter--
    slideImage()
}


const goNext = () => {
    counter++
    slideImage()
}


const slideImage = () => {
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`
        }
    )
}
 