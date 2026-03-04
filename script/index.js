const crateElement = (arr) => {
    const htmlElements = arr.map(el =>`<span class='btn'>${el}</span>`) ;
    return (htmlElements.join(' ')) ;

}


// pronunciation function
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


// spinner function
const manageSpinner = (status)=>{

    if(status == true){
        document.getElementById('spinner').classList.remove('hidden') ;
        document.getElementById('word-container').classList.add('hidden') ;
    } else{
        document.getElementById('word-container').classList.remove('hidden') ;
        document.getElementById('spinner').classList.add('hidden'); 

    }
}



const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((data) => displayLessons(data.data))
}


// remove action button

const removeActive = () => {

    const lessonButtons = document.querySelectorAll('.lesson-btn') ;
    // console.log(lessonButtons) 
    lessonButtons.forEach((btn)=>{

        btn.classList.remove('active')

    })

}

// loadLevelWord

const loadLevelWord = (id) =>{
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
    .then(res=> res.json())
    .then(data=> {

        removeActive() ;
        const clickedBtn = document.getElementById(`lesson-btn-${id}`) ;
        // console.log(clickedBtn)
        clickedBtn.classList.add('active')
        displayLevelWord(data.data)
    })
}


// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }


// modal funtion

const loadWordDetail = async(id) =>{

    const url = `https://openapi.programming-hero.com/api/word/${id}` ;
    // console.log(url)
    const res =await fetch(url) ;
    const details= await res.json() ;
    displayWordDetails(details.data)

}

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }


// details display function 

const displayWordDetails = (word) =>{

    console.log(word) ;
    const detailsBox = document.getElementById('details-container') ;
    detailsBox.innerHTML = `
      <div class="">
                    <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class=" font-bold">Meaning</h2>
                    <p class="font-bangla">${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class=" font-bold">Example</h2>
                    <p class="">${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class=" font-bangla mb-2">সমার্থক শব্দ গুলো</h2>
                    <div class="">${crateElement(word.synonyms)} </div>
                  
                </div>
    
    `

    document.getElementById('word_modal').showModal() ;
}


// display level word function 
const displayLevelWord = (words) =>{
    
    // step 1 
    
    const wordContainer = document.getElementById("word-container"); 
    wordContainer.innerHTML = ' ' ;


    // if lesson contain no word then 

    if(words.length === 0){

            wordContainer.innerHTML = `

             <div class="text-center col-span-full rounded-xl py-10 space-y-6">

              <img class="mx-auto" src="./assets/alert-error.png" alt="">

        <p class=" font-normal text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-semibold text-3xl font-bangla">নেক্সট Lesson এ যান</h2>
       </div>
            
            ` ;

            manageSpinner(false)
            return;



    }
    
    
    // step 2
    
    words.forEach((word) => {
        
        // console.log(word)

    const card  = document.createElement('div') ;
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            
            <div class="font-medium text-2xl font-bangla">"${word.meaning? word.meaning: 'অর্থ পাওয়া যায়নি'}/ ${word.pronunciation?word.pronunciation: 'Pronunciation পাওয়া যায়নি'}"</div>
            <div class="flex justify-between items-center">
                <button onclick='loadWordDetail(${word.id})' class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button> 
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>

    
    `
    wordContainer.append(card)



 })
 manageSpinner(false)
} ;


const displayLessons = (lessons) => {

    // 1--get the container and empty 
    const levelContainer = document.getElementById('level-container');

    levelContainer.innerHTML = '';

    // 2-- get into every lessons

    for (const lesson of lessons) {

        // 3-- crate element
        console.log(lesson)

        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
                                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open">        </i>Lesson-${lesson.level_no}</button>

        
        ` ;

        levelContainer.append(btnDiv);

        // 4-- append into container

    }


}


loadLessons()


// search function 
document.getElementById('btn-search').addEventListener('click' , () => {
    removeActive() ;
    const input = document.getElementById('input-search') ; 
    const searchValue =  input.value.trim().toLowerCase() ;
    console.log(searchValue)

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res=>res.json())
    .then(data=>{
        const allWords = data.data ;
        console.log(allWords)

        const filterWords = allWords.filter(word=>word.word.toLowerCase().includes(searchValue)) ;
        displayLevelWord(filterWords)
    })
})


