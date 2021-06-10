'use strict';
// getting the images and declairing them inside a variable.\\

let section = document.getElementById('secOne');
let leftImgElmnt = document.getElementById('leftImg');
let middleImgElmnt = document.getElementById('middleImg');
let rightImgElmnt = document.getElementById('rightImg');

// creating indexes for the images \\

let leftIndex ;
let middleIndex ;
let rightIndex ;

// setting the rounds of clicks 
let rounds = 25;

 
let clickCount = 0;

let arrOfNames = [];
let arrOfVotes = [];

// Constructor Function \\
function ProductImage (name,source){
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    ProductImage.all.push(this);
    arrOfNames.push(this.name);
}

ProductImage.all = [];

// Images instances.\\
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


     let frstDisplay = [-1,-1,-1];


// Displaying images function.\\
function displayImages (){
     leftIndex = genRandomIndex();
     middleIndex = genRandomIndex();
     rightIndex = genRandomIndex();



        
            // while loop not to duplicate the images \\
            while(leftIndex === middleIndex || leftIndex === rightIndex || 
                middleIndex === rightIndex || frstDisplay.includes(leftIndex) || frstDisplay.includes(middleIndex) || 
                frstDisplay.includes(rightIndex)){
                    leftIndex = genRandomIndex();
                    middleIndex = genRandomIndex();
                    rightIndex = genRandomIndex();
                }


        leftImgElmnt.src = ProductImage.all[leftIndex].source ;
        ProductImage.all[leftIndex].shown++;
        middleImgElmnt.src = ProductImage.all[middleIndex].source;
        ProductImage.all[middleIndex].shown++;
        rightImgElmnt.src = ProductImage.all[rightIndex].source;
        ProductImage.all[rightIndex].shown++;

        frstDisplay = [];
        frstDisplay.push(leftIndex,middleIndex,rightIndex);

}

displayImages();


let button = document.getElementById('ulist');
button.addEventListener('click', clicking);

section.addEventListener('click',clicking);

// function for the clicks on the images. \\

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
        button = document.getElementById('button');
        button.addEventListener('click',handleShow);
        section.removeEventListener('click',clicking);
    }
}

// function that handle showing the lists and the chart. \\

function handleShow(){
    gettingList();
    saving();
    gettingChart();
    button.removeEventListener('click',handleShow);
}


let arrOfSeen =[];

// function for the lists. \\
function gettingList(){
    let ul = document.getElementById('ulist');
    for (let i = 0; i < ProductImage.all.length; i++){
        arrOfVotes.push(ProductImage.all[i].votes);
        arrOfSeen.push(ProductImage.all[i].shown);



        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${ProductImage.all[i].name} had 
        ${ProductImage.all[i].votes} votes, and was seen ${ProductImage.all[i].shown} times.`;

    }
}

// Local Storage saving function. \\
function saving(){
    let stringArr = JSON.stringify(ProductImage.all);
    localStorage.setItem('Atempts',stringArr);
}


// getting data from the LS. \\
function loading(){
    let data = localStorage.getItem('Atempts')
    let parsedAtempts = JSON.parse(data);
    if (parsedAtempts){
        ProductImage.all = parsedAtempts;
    }
    displayImages();
}

loading();

// Chart Function. \\
function gettingChart(){


    let ctx = document.getElementById('myChart')
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: arrOfNames,
            datasets: [{
                label: '# of Votes',
                data: arrOfVotes,
                backgroundColor: [
                    'rgba(244, 208, 63, 1)',
                ],
                borderWidth: 2
            },{
              label: '# of Seen',
              data: arrOfSeen,
              backgroundColor: [
                  'rgba(30, 139, 195, 1)',
              ],
              borderWidth: 2
          }
          ]
        },
    });
    }
   loading();