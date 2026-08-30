// =========================================
// KATHA LOKAYA
// MAIN WEBSITE SCRIPT
// =========================================


// =========================================
// STORY DATA
// =========================================

const stories = [

    {
        id: 1,
        title: "අපේ කතාව",
        category: "Romance",
        author: "කතා ලෝකය",
        description:
            "ආදරය, මතකයන් සහ නොකියූ හැඟීම් අතර ගොඩනැගෙන සුන්දර කතාවක්.",
        views: 1250,
        rating: 4.8,
        cover: "",

        chapters: [

            {
                number: 1,
                title: "පළමු හමුවීම",

                content: `
                    <p>
                        සමහර හමුවීම් අපේ ජීවිතය
                        සම්පූර්ණයෙන්ම වෙනස් කරනවා.
                    </p>

                    <p>
                        ඒ දවසත් එවැනිම දවසක් වුණා.
                        ඔහු ඇයව පළමු වරට දැක්කේ
                        වැස්සෙන් පිරුණු සවසකදීය.
                    </p>

                    <p>
                        ඒ හමුවීමෙන් පස්සේ ඔවුන්ගේ ජීවිතය
                        කිසිදා පෙර තිබූ ආකාරයට තිබුණේ නැහැ...
                    </p>
                `
            },

            {
                number: 2,
                title: "අලුත් හැඟීමක්",

                content: `
                    <p>
                        දින කිහිපයක් ගත වුණා.
                        නමුත් ඒ හමුවීම ඔහුගේ සිතෙන්
                        ඉවත් කරගන්න බැරි වුණා.
                    </p>

                    <p>
                        ඇය ගැන සිතන සෑම මොහොතකම
                        ඔහුගේ මුහුණේ නොදැනුවත්වම
                        සිනහවක් ඇති වුණා.
                    </p>
                `
            }

        ]
    },


    {
        id: 2,
        title: "අඳුරු රාත්‍රිය",
        category: "Horror",
        author: "කතා ලෝකය",
        description:
            "කිසිවෙකු නොදන්නා රහසක් සොයා යන තරුණයෙකුගේ භයානක අත්දැකීමක්.",
        views: 980,
        rating: 4.6,
        cover: "",

        chapters: [

            {
                number: 1,
                title: "අඳුරු නිවස",

                content: `
                    <p>
                        රාත්‍රී දොළහ පසු වී තිබුණි.
                        පාර පුරාම තිබුණේ නිහඬතාවයකි.
                    </p>

                    <p>
                        ඔහු ඉදිරියේ තිබූ පැරණි නිවස දෙස
                        බලාගෙන සිටියේය.
                    </p>

                    <p>
                        කිසිවෙකු අවුරුදු ගණනාවකින්
                        එම නිවසට ගොස් තිබුණේ නැත.
                        නමුත් එදින රාත්‍රියේ
                        එහි ජනේලයක් ඇතුළෙන් ආලෝකයක් පෙනුණි...
                    </p>
                `
            }

        ]
    },


    {
        id: 3,
        title: "අභිරහස් ලිපිය",
        category: "Mystery",
        author: "කතා ලෝකය",
        description:
            "අවුරුදු ගණනාවක් පැරණි ලිපියක් පිටුපස සැඟවුණු අභිරහසක්.",
        views: 760,
        rating: 4.7,
        cover: "",

        chapters: [

            {
                number: 1,
                title: "ලිපිය",

                content: `
                    <p>
                        උදෑසන තැපැල් පෙට්ටිය විවෘත කළ විට
                        ඔහුට ලැබුණේ සාමාන්‍ය ලිපියක් නොවේ.
                    </p>

                    <p>
                        ලියුම් කවරයේ නමක්වත් ලිපිනයක්වත්
                        තිබුණේ නැත.
                    </p>

                    <p>
                        නමුත් එහි ඇතුළත තිබූ වචන කිහිපය
                        ඔහුගේ ජීවිතය සම්පූර්ණයෙන්ම වෙනස් කළේය...
                    </p>
                `
            }

        ]
    },


    {
        id: 4,
        title: "මායා ලෝකය",
        category: "Fantasy",
        author: "කතා ලෝකය",
        description:
            "සාමාන්‍ය ලෝකයෙන් ඔබ්බට සැඟවුණු අපූරු මායා ලෝකයකට යන ගමනක්.",
        views: 540,
        rating: 4.5,
        cover: "",

        chapters: [

            {
                number: 1,
                title: "රහස් දොරටුව",

                content: `
                    <p>
                        ඔහු කවදාවත් දැක නොතිබුණු
                        පැරණි දොරටුවක් කැලය මැද තිබුණි.
                    </p>

                    <p>
                        දොර විවෘත කළ මොහොතේම
                        ඔහු ඉදිරියේ දිස් වූයේ
                        සම්පූර්ණයෙන්ම වෙනස් ලෝකයකි.
                    </p>

                    <p>
                        එතැනින් ආරම්භ වූයේ
                        ඔහු කිසිදා සිතා නොතිබූ ගමනකි...
                    </p>
                `
            }

        ]
    }

];



// =========================================
// GET ALL STORIES
// =========================================

function getStories() {

    return stories;

}



// =========================================
// CREATE STORY CARD
// =========================================

function createStoryCard(story) {

    const card =
        document.createElement("article");

    card.className =
        "story-card";


    let coverHTML = "";


    if (story.cover) {

        coverHTML = `
            <img
                src="${story.cover}"
                alt="${story.title}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    display:block;
                "
            >
        `;

    } else {

        coverHTML = "📖";

    }


    card.innerHTML = `

        <div class="cover">

            ${coverHTML}

            <div class="cover-label">
                ${story.category}
            </div>

        </div>


        <div class="story-info">

            <p class="label">
                ${story.category}
            </p>


            <h3>
                ${story.title}
            </h3>


            <p>
                ✍️ ${story.author}
            </p>


            <p>
                ${story.description}
            </p>


            <div
                style="
                    display:flex;
                    gap:15px;
                    margin-bottom:18px;
                    color:#777;
                    font-size:13px;
                "
            >

                <span>
                    👁️ ${story.views}
                </span>

                <span>
                    ⭐ ${story.rating}
                </span>

            </div>


            <button
                class="read-btn"
                type="button"
                onclick="openStory(${story.id})"
            >

                කියවන්න →

            </button>

        </div>

    `;


    return card;

}



// =========================================
// DISPLAY STORIES
// =========================================

function displayStories(
    storyList,
    element
) {

    if (!element) {
        return;
    }


    element.innerHTML = "";


    if (storyList.length === 0) {

        element.innerHTML = `

            <p style="
                color:#888;
                padding:20px;
            ">

                මේ section එකේ තවම කතා නැහැ. 📚

            </p>

        `;

        return;

    }


    storyList.forEach(
        function(story) {

            element.appendChild(
                createStoryCard(story)
            );

        }
    );

}



// =========================================
// OPEN STORY
// =========================================

function openStory(id) {

    window.location.href =
        "story.html?id=" + id;

}



// =========================================
// DISPLAY STORIES ON HOME
// =========================================

function displayHomeStories() {

    const grid =
        document.getElementById(
            "storyGrid"
        );


    if (!grid) {
        return;
    }


    displayStories(
        getStories(),
        grid
    );

}



// =========================================
// LATEST STORIES
// =========================================

function displayLatest() {

    const grid =
        document.getElementById(
            "latestGrid"
        );


    if (!grid) {
        return;
    }


    const latest =
        [...getStories()]
        .reverse()
        .slice(0, 4);


    displayStories(
        latest,
        grid
    );

}



// =========================================
// CATEGORY
// =========================================

function showCategory(category) {

    const allStories =
        getStories();


    const filtered =
        allStories.filter(
            function(story) {

                return (
                    story.category
                        .toLowerCase()
                    ===
                    category.toLowerCase()
                );

            }
        );


    const results =
        document.getElementById(
            "categoryResults"
        );


    const title =
        document.getElementById(
            "categoryTitle"
        );


    const grid =
        document.getElementById(
            "categoryStoryGrid"
        );


    if (!results || !title || !grid) {
        return;
    }


    title.innerText =
        category + " කතා";


    displayStories(
        filtered,
        grid
    );


    results.style.display =
        "block";


    results.scrollIntoView({
        behavior: "smooth"
    });

}



// =========================================
// SHOW ALL STORIES
// =========================================

function showAllStories() {

    const results =
        document.getElementById(
            "categoryResults"
        );


    if (results) {

        results.style.display =
            "none";

    }


    const storiesSection =
        document.getElementById(
            "stories"
        );


    if (storiesSection) {

        storiesSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}



// =========================================
// SEARCH
// =========================================

function searchStories() {

    const input =
        document.getElementById(
            "searchBox"
        );


    if (!input) {
        return;
    }


    const text =
        input.value
            .toLowerCase()
            .trim();


    const grid =
        document.getElementById(
            "storyGrid"
        );


    if (!grid) {
        return;
    }


    if (text === "") {

        displayHomeStories();

        return;

    }


    const results =
        getStories().filter(
            function(story) {

                return (

                    (story.title || "")
                        .toLowerCase()
                        .includes(text)

                    ||

                    (story.author || "")
                        .toLowerCase()
                        .includes(text)

                    ||

                    (story.category || "")
                        .toLowerCase()
                        .includes(text)

                );

            }
        );


    displayStories(
        results,
        grid
    );


    const storiesSection =
        document.getElementById(
            "stories"
        );


    if (storiesSection) {

        storiesSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}



// =========================================
// SEARCH WHILE TYPING
// =========================================

const searchBox =
    document.getElementById(
        "searchBox"
    );


if (searchBox) {

    searchBox.addEventListener(
        "keyup",
        searchStories
    );

}



// =========================================
// MY LIBRARY
// =========================================

function displayLibrary() {

    const grid =
        document.getElementById(
            "libraryGrid"
        );


    if (!grid) {
        return;
    }


    const saved =
        JSON.parse(
            localStorage.getItem(
                "kathaLibrary"
            )
        ) || [];


    const savedStories =
        getStories().filter(
            function(story) {

                return saved.includes(
                    story.id
                );

            }
        );


    displayStories(
        savedStories,
        grid
    );

}



// =========================================
// START WEBSITE
// =========================================

displayHomeStories();

displayLatest();

displayLibrary();