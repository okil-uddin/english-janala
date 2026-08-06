const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn bg-[#D7E4EF]">${el}</span>`);
    return htmlElements.join(" ");
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

const manageLoading = (status) => {

    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }

}

const loadLesson = () => {

    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));

}

const removeActive = () => {

    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));

}

const loadLevelWord = (id) => {

    manageLoading(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWords(data.data)
        })

}

const loadWordDetail = async (id) => {

    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);

    const details = await res.json();

    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {

    const detailsBox = document.getElementById("details-container");

    detailsBox.innerHTML = ` 

    <div>
                        <div>
                            <h1 class="text-[28px] font-semibold">${word.word ? word.word : "Not Found"}(<i
                                    class="fa-solid fa-microphone-lines"></i>:${word.pronunciation ? word.pronunciation : "Not Found"})</h1>
                        </div>
                        <div>
                            <h2 class="text-[24px] font-semibold mt-5">Meaning</h2>
                            <p class="font-bangla text-[22px] font-medium mt-3">${word.meaning ? word.meaning : "Not Found"}</p>
                        </div>
                        <div>
                            <h2 class="text-[24px] font-semibold mt-10">Example</h1>
                                <p class="text-[16px] mt-2">${word.sentence ? word.sentence : "Not Found"}</p>
                        </div>
                        <div class="mt-5">
                            <h2 class="font-bangla text-[24px] font-medium">সমার্থক শব্দ গুলো</h2>
                            <div class=" flex flex-wrap gap-2 mt-3">${createElements(word.synonyms)}</div>
                        </div>

    </div>

    `;

    document.getElementById("word_modal").showModal();

}

const displayLevelWords = (words) => {

    const wordContainer = document.getElementById("word-container");

    wordContainer.innerHTML = "";

    if (words.length === 0) {

        wordContainer.innerHTML = `
        <div class="text-center col-span-full">

                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="text-[#79716B] text-[13px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p> 
                <h2 class="text-[34px] mt-3 font-bangla font-medium">নেক্সট Lesson এ যান</h2>

        </div>
        `;

        manageLoading(false);

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
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume"></i></button>
                    </div>
        </div>

        `

        wordContainer.append(card);

    });

    manageLoading(false);
}

const displayLesson = (lessons) => {

    const lessonContainer = document.getElementById("lesson-container");

    lessonContainer.innerHTML = "";

    for (let lesson of lessons) {

        const btnDiv = document.createElement("div");

        btnDiv.innerHTML = `

        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>

        `
        lessonContainer.append(btnDiv);

    }

}

loadLesson();

document.getElementById("btn-search")
    .addEventListener('click', () => {

        removeActive();

        const input = document.getElementById("input-search");

        const searchValue = input.value.trim().toLowerCase();

        fetch("https://openapi.programming-hero.com/api/words/all")
            .then((res) => res.json())
            .then((data) => {

                const allWords = data.data;

                const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));

                displayLevelWords(filterWords);

            })

    })


const faqBtn = document.getElementById("faq-button");
const faqBtnMobile = document.getElementById("faq-button-mobile");
const learnBtn = document.getElementById("learn-button");
const learnBtnMobile = document.getElementById("learn-button-mobile");

faqBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("faq-section").scrollIntoView({
        behavior: "smooth"
    });
});

faqBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("hyr")
    document.getElementById("faq-section").scrollIntoView({
        behavior: "smooth"
    });
});

learnBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("learn-section").scrollIntoView({
        behavior: "smooth"
    });
});

learnBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("learn-section").scrollIntoView({
        behavior: "smooth"
    });
});

const getStartButton = document.getElementById("get-start-btn");
getStartButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("learn-section").scrollIntoView({
        behavior: "smooth"
    });
});
