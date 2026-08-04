// JSON part

const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWords(data.data))
}

// **********************************

// Function part
const displayLevelWords = (words) => {

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full">
                    <img class="mx-auto" src="./assets/alert-error.png" alt="">
                   <p class="text-[#79716B] text-[13px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p> 
                   <h2 class="text-[34px] mt-3 font-bangla font-medium">নেক্সট Lesson এ যান</h2>
                </div>
        `;
        return;
    }

    words.forEach(word => {

        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm text-center py-10 px-5">
                    <h2 class="text-[32px] font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                    <p class="text-[20px] mt-3">Meaning /Pronounciation</p>
                    <p class="font-bangla font-semibold text-[32px] text-[#18181B] mt-5">"${word.meaning ? word.meaning : "অর্থো পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</p>
                    <div class="flex justify-between items-center mt-5">
                        <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume"></i></button>
                    </div>
                </div>
        `
        wordContainer.append(card);
    });
}

const displayLesson = (lessons) => {

    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    for (let lesson of lessons) {

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `
        lessonContainer.append(btnDiv);

    }

}

loadLesson();

