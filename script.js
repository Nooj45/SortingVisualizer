let delay = 1000; // in ms
let maxBarHeight = 60; // in vh (viewport height) 60vh is 60% of height relative to your screen/browser

async function swap(bar1, bar2){
    // change the color of the bar to be swapped to red
    bar1.style.background = "#f00000";
    bar2.style.background = "#f00000";
    await new Promise(resolve => setTimeout(resolve, delay));

    // height of the bars
    let heightBar1 = bar1.style.height;
    let heightBar2 = bar2.style.height;

    // swapping the height
    bar1.style.height = heightBar2;
    bar2.style.height = heightBar1;
    await new Promise(resolve => setTimeout(resolve, delay));
}
// "#ffd000" = yellow, "#0072ff" = blue
async function selectionSort(barsArray){
    let n = barsArray.length; //n = total num of bars
    let minIndex = 0;

    for(let i = 0; i < n-1; i++){
        minIndex = i;

        barsArray[minIndex].style.background = "#0072ff"; // change current bar to blue
        await new Promise(resolve => setTimeout(resolve, delay));

        // ^ we are anchored there at the current smallest bar height, this for loop with j
        // will loop through the bars that are next to find the bar that is smaller than our current
        // that is waiting
        // runtime O(n^2)
        for(let j = i + 1; j < n; j++){
            barsArray[j].style.background = "#0072ff";
            await new Promise(resolve => setTimeout(resolve, delay));

            if(parseInt(barsArray[j].style.height) < parseInt(barsArray[minIndex].style.height)){
                // changing color of old bar with the min. height back to yellow
                //barsArray[minIndex].style.background = "#ffd000";
                minIndex = j;

                barsArray[minIndex].style.background = "#0072ff"; // change new minimum height bar to blue
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            // prevent changing of color of minimum height bar to normal
            if(minIndex != j){
                barsArray[j].style.background = "#ffd000";
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        // found a bar that is smaller than our current min., so we need to swap 
        if(minIndex != i){
            await swap(barsArray[minIndex], barsArray[i]);
        }

        // ith bar is sorted, green = sorted
        // new minimum bar is swapped to ith index and will be green
        // minIndex is now the bigger one and will be yellow
        barsArray[minIndex].style.background = "#ffd000";
        barsArray[i].style.background = "#15fa00"; // green
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    barsArray[n-1].style.background = "#15fa00";
}

// runtime best case: O(n), only happens when list is already sorted
// avg and worst case: O(n^2)
// algorithm works by repeatedly swapping the adjacent elements if they are in the wrong order
async function bubbleSort(barsArray){
    let n = barsArray.length;
    for(let i = n-1; i >= 0; i--){
        for(let j = 0; j < i; j++){
            barsArray[j].style.background = "#0072ff"; //bar being processed is blue
            barsArray[j+1].style.background = "#0072ff";
            await new Promise(resolve => setTimeout(resolve, delay));

            if(parseInt(barsArray[j].style.height) > parseInt(barsArray[j+1].style.height)){
                await swap(barsArray[j], barsArray[j+1]);
            }
            // change color back to normal
            barsArray[j].style.background = "#ffd000";
            barsArray[j+1].style.background = "#ffd000";
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        // ith bar is sorted, change its color to green
        barsArray[i].style.background = "#15fa00";
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

//runtime best: O(n)
// worst: O(n^2)
async function insertionSort(barsArray){
    // n is the total number of bars
    let n = barsArray.length;
    
    for (let i = 1; i < n; i++){
       let j = i-1;
       let key = parseInt(barsArray[i].style.height);

       // change the color of the bar to be compared to blue
       barsArray[j+1].style.background = "#0072ff";
       barsArray[j].style.background = "#0072ff";
       await new Promise(resolve => setTimeout(resolve, delay));

        while (j >= 0 && parseInt(barsArray[j].style.height) > key){

            await swap(barsArray[j+1], barsArray[j]);
            // change color back to normal
            barsArray[j+1].style.background = "#ffd000";
            barsArray[j].style.background = "#0072ff";
            await new Promise(resolve => setTimeout(resolve, delay));

            j--;
            // change the color of the first bar smaller or equal to the key's bar
            if (j >= 0){
                barsArray[j].style.background = "#0072ff";
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        // change color back to normal 
        if (j >= 0){
            barsArray[j].style.background = "#ffd000";
        }
        barsArray[j+1].style.background = "#ffd000";
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // barsArray is sorted, change bar's color to green
    for (let i = 0; i < n; i++) {
        barsArray[i].style.background = "#15fa00";
    }
    await new Promise(resolve => setTimeout(resolve, delay));
}

// runtime: O(nlogn)
// Divide and conqueor approach and recursion
/* 1. if list has 1 element, return the list and terminate (base case)
   2. Split list into two halves that are equal in length as possible
   3. Use recursion, and sort both lists (will keep splitting each side as well until base case)
   4. Merge the sorted lists and return the results
 */
async function merge(barsArray, leftIndex, midIndex, rightIndex) {
    // shows mergesort has been called in which part of barsArray by changing its color to blue
    for (let i = leftIndex; i <= rightIndex; i++) {
        barsArray[i].style.background = "#0072ff";
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    
    let leftArrSize = midIndex - leftIndex + 1;
    let rightArrSize = rightIndex - midIndex;
    
    let leftArray = [];
    let rightArray = [];
    
    for (let i = 0; i < leftArrSize; i++) {
        leftArray[i] = barsArray[leftIndex + i].style.height;
    }
    
    for (let j = 0; j < rightArrSize; j++) {
        rightArray[j] = barsArray[midIndex + 1 + j].style.height;
    }
    
    let leftCurrIndex = 0;
    let rightCurrIndex = 0;
    let barCurrIndex = leftIndex;
    
    while (leftCurrIndex < leftArrSize && rightCurrIndex < rightArrSize) {
        if (parseInt(leftArray[leftCurrIndex]) <= parseInt(rightArray[rightCurrIndex])) {
            barsArray[barCurrIndex].style.height = leftArray[leftCurrIndex];
            leftCurrIndex++;
        } else {
            barsArray[barCurrIndex].style.height = rightArray[rightCurrIndex];
            rightCurrIndex++;
        }
        barCurrIndex++;
    }
    
    while (leftCurrIndex < leftArrSize) {
        barsArray[barCurrIndex].style.height = leftArray[leftCurrIndex];
        leftCurrIndex++;
        barCurrIndex++;
    }
    
    while (rightCurrIndex < rightArrSize) {
        barsArray[barCurrIndex].style.height = rightArray[rightCurrIndex];
        rightCurrIndex++;
        barCurrIndex++;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
}

async function mergeSort(barsArray, leftIndex, rightIndex){
    if (leftIndex >= rightIndex){
        return;
    } 
    // shows in which part of barsArray merge function is called by changing color to pink
    for (let i = leftIndex; i <= rightIndex; i++){
        barsArray[i].style.background = "#ff0077";
    }

    if ((rightIndex - leftIndex) == barsArray.length-1){
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    let midIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    // change left part color to normal
    for (let i = midIndex+1; i <= rightIndex; i++){
        barsArray[i].style.background = "#ffd000";
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // sort left part
    await mergeSort(barsArray, leftIndex, midIndex);
    
    // change left part color to pink
    for (let i = midIndex+1; i <= rightIndex; i++){
        barsArray[i].style.background = "#ff0077";
    }
    // change right part color to normal
    for (let i = leftIndex; i <= midIndex; i++){
        barsArray[i].style.background = "#ffd000";
    }
    await new Promise(resolve => setTimeout(resolve, delay));

    // sort right part of array
    await mergeSort(barsArray, midIndex+1, rightIndex);
    
    // change current part color to pink
    for (let i = leftIndex; i <= rightIndex; i++){
        barsArray[i].style.background = "#ff0077";
    }
    await new Promise(resolve => setTimeout(resolve, delay));

    // merge two sorted parts
    await merge(barsArray, leftIndex, midIndex, rightIndex);
    
    // if current part is the whole array and has been sorted, then change its color to green
    if ((rightIndex - leftIndex) == barsArray.length-1){
        for (let i = leftIndex; i <= rightIndex; i++){
            barsArray[i].style.background = "#15fa00";
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

// create given number of bars
function createBars(size) {
    let array = [];
    let barContainer = document.querySelector(".bar-container");
    for(let i = 1; i <= size; i++) {
        let barHeight = Math.floor(Math.random()*maxBarHeight) + 5;
        array.push(barHeight);
        let bar = document.createElement("div");
        bar.classList.add("bars")
        bar.style.height = barHeight + "vh";
        barContainer.appendChild(bar);
    }
}
// removes all the bars from the bar container
function removeBars() {
    document.querySelectorAll(".bars").forEach((node) => {
        node.remove();
    });
}
let array_size = document.querySelector(".array_size");
let animationSpeed = document.querySelector(".speed");

// creates new bars array when "new array" button is clicked
let newArrayBtn = document.querySelector(".new-array");
newArrayBtn.addEventListener("click", () => {
    removeBars();
    createBars(array_size.value);
}); 

// change number of bars when changing the range / moving the slider of "array size"
array_size.addEventListener("input", () => {
    removeBars();
    createBars(array_size.value);
});

// changes the duration of transition and delay of setTimeout when changing the slider / range of "speed"
animationSpeed.addEventListener("input", () => {
    delay = 3000 - animationSpeed.value + 100;
    document.querySelectorAll(".bars").forEach((bar) => {
        bar.style.transitionDuration = ((delay/1000)*0.7) + "s";
    });  
});

// starts sorting using selection sort when "selection sort" button is clicked
let selectionSortBtn = document.querySelector(".selection-sort");
selectionSortBtn.addEventListener("click", () => {
    let barsArray = document.querySelectorAll(".bars");
    selectionSort(barsArray);
});

// starts bubble sort when "bubble sort" button is clicked
let bubbleSortBtn = document.querySelector(".bubble-sort");
bubbleSortBtn.addEventListener("click", () => {
    let barsArray = document.querySelectorAll(".bars");
    bubbleSort(barsArray);
});

// starts insertion sort when "insertion sort" button is clicked
let insertionSortBtn = document.querySelector(".insertion-sort");
insertionSortBtn.addEventListener("click", () => {
    let barsArray = document.querySelectorAll(".bars");
    insertionSort(barsArray);
});

// starts merge sort when "merge sort" button is clicked
let mergeSortBtn = document.querySelector(".merge-sort");
mergeSortBtn.addEventListener("click", () => {
    let barsArray = document.querySelectorAll(".bars");
    mergeSort(barsArray, 0, barsArray.length-1);
});

// creates bars when the page is loaded
createBars(array_size.value);