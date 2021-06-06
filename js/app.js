'use strict';

let section = document.getElementById('secOne');
let leftImgElmnt = document.getElementById('leftImg');
let middleImgElmnt = document.getElementById('middleImg');
let rightImgElmnt = document.getElementById('rightImg');

let leftIndex ;
let middleIndex ;
let rightIndex ;


let rounds = 25;

let clickCount = 0;

function ProductImage (name,source){
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    ProductImage.all.push(this);
}

ProductImage.all = [];

new ProductImage('bag','img/bag.jpg');
new ProductImage('banana','img/banana.jpg');
new ProductImage('bathroom','img/bathroom.jpg');
new ProductImage('boots','img/boots.jpg');
new ProductImage('breakfast','img/breakfast.jpg');
new ProductImage('bubblegum','img/bubblegum.jpg');
new ProductImage('chair','img/chair.jpg');
new ProductImage('cthulhu','img/cthulhu.jpg');
new ProductImage('dog-duck','img/dog-duck.jpg');
new ProductImage('dragon','img/dragon.jpg');
new ProductImage('pen','img/pen.jpg');
new ProductImage('pet-sweep','img/pet-sweep.jpg');
new ProductImage('scissors','img/scissors.jpg');
new ProductImage('shark','img/shark.jpg');
new ProductImage('sweep','img/sweep.png');
new ProductImage('tauntaun','img/tauntaun.jpg');
new ProductImage('unicorn','img/unicorn.jpg');
new ProductImage('usb','img/usb.gif');
new ProductImage('water-can','img/water-can.jpg');
new ProductImage('wine-glass','img/wine-glass.jpg');


function genRandomIndex(){
    let randomIndex = Math.floor(Math.random() * ProductImage.all.length);
    return randomIndex;
}

function displayImages (){
     leftIndex = genRandomIndex();
     middleIndex = genRandomIndex();
     rightIndex = genRandomIndex();

    while(leftIndex === middleIndex || leftIndex === rightIndex || 
        middleIndex === rightIndex){
            leftIndex = genRandomIndex();
            middleIndex = genRandomIndex();
        }
        
        leftImgElmnt.src = ProductImage.all[leftIndex].source ;
        ProductImage.all[leftIndex].shown++;
        middleImgElmnt.src = ProductImage.all[middleIndex].source;
        ProductImage.all[middleIndex].shown++;
        rightImgElmnt.src = ProductImage.all[rightIndex].source;
        ProductImage.all[rightIndex].shown++;
}
displayImages();

let button = document.getElementById('ulist');
button.addEventListener('click', clicking);

section.addEventListener('click',clicking);

function clicking (event){
    clickCount++;

    if (rounds >= clickCount){
        if (event.target.id === 'leftImg'){
            ProductImage.all[leftIndex].votes++;
        }
        else if (event.target.id === 'middleImg'){
            ProductImage.all[middleIndex].votes++;
        }
        else if (event.target.id === 'rightImg'){
            ProductImage.all[rightIndex].votes++;
        }
        displayImages();
    }else {
        document.getElementById("button").onclick = function(){ gettingList()};
        section.removeEventListener('click',clicking);
    }
}

function gettingList(){
    let ul = document.getElementById('ulist');
    for (let i = 0; i < ProductImage.all.length; i++){
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${ProductImage.all[i].name} had 
        ${ProductImage.all[i].votes} votes, and was seen ${ProductImage.all[i].shown} times.`;

    }
}