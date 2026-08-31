```javascript
// =========================================
// KATHA ARANA
// MAIN WEBSITE SCRIPT
// SUPABASE VERSION
// =========================================

let stories = [];
let adultCategoryUnlocked = false;


// =========================================
// GET STORIES
// =========================================

function getStories() {
    return stories;
}


// =========================================
// CHECK 18+ STORY
// =========================================

function isAdultStory(story) {
    return String(story?.category || "")
        .trim()
        .toLowerCase() === "18+";
}


// =========================================
// GET PUBLIC STORIES
// =========================================

function getPublicStories() {
    return getStories().filter(function (story) {
        return !isAdultStory(story);
    });
}


// =========================================
// GET 18+ STORIES
// =========================================

function getAdultStories() {
    return getStories().filter(function (story) {
        return isAdultStory(story);
    });
}


// =========================================
// LOAD STORIES FROM SUPABASE
// =========================================

async function loadStories() {

    try {

        console.log("Loading stories from Supabase...");

        const { data, error } = await supabaseClient
            .from("stories")
            .select("*")
            .order("id", {
                ascending: false
            });

        if (error) {

            console.error(
                "Supabase stories error:",
                error
            );

            showLoadingError();

            return;
        }

        stories = data || [];

        console.log(
            "Stories loaded:",
            stories
        );

        displayHomeStories();
        displayLatest();
        displayLibrary();

    } catch (error) {

        console.error(
            "Load stories error:",
            error
        );

        showLoadingError();
    }
}


// =========================================
// LOADING ERROR
// =========================================

function showLoadingError() {

    const grids = [
        document.getElementById("storyGrid"),
        document.getElementById("latestGrid"),
        document.getElementById("libraryGrid"),
        document.getElementById("categoryStoryGrid")
    ];

    grids.forEach(function (grid) {

        if (!grid) {
            return;
        }

        grid.innerHTML = `
            <p style="
                color:#888;
                padding:20px;
            ">
                කතා load කරන්න බැරි වුණා. 😔
            </p>
        `;
    });
}


// =========================================
// CREATE STORY CARD
// =========================================

function createStoryCard(story) {

    const card = document.createElement("article");

    card.className = "story-card";


    // =====================================
    // COVER
    // =====================================

    let coverHTML = "📖";

    if (
        story.cover &&
        String(story.cover).trim() !== ""
    ) {

        coverHTML = `
            <img
                src="${escapeHTML(story.cover)}"
                alt="${escapeHTML(
                    story.title || "Story"
                )}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    display:block;
                "
            >
        `;
    }


    // =====================================
    // STATS
    // =====================================

    const views = Number(story.views || 0);

    const likes = Number(
        story.liked ??
        story.likes ??
        0
    );

    const rating = Number(
        story.rating || 0
    );


    // =====================================
    // CARD
    // =====================================

    card.innerHTML = `

        <div class="cover">

            ${coverHTML}

            <div class="cover-label">
                ${escapeHTML(
                    story.category || "Story"
                )}
            </div>

        </div>


        <div class="story-info">

            <p class="label">
                ${escapeHTML(
                    story.category || ""
                )}
            </p>


            <h3>
                ${escapeHTML(
                    story.title || "Untitled"
                )}
            </h3>


            <p>
                ✍️
                ${escapeHTML(
                    story.author || "කතා අරණ"
                )}
            </p>


            <p>
                ${escapeHTML(
                    story.description || ""
                )}
            </p>


            <div
                class="story-meta"
                style="
                    display:flex;
                    gap:15px;
                    margin-bottom:18px;
                    color:#777;
                    font-size:13px;
                    flex-wrap:wrap;
                "
            >

                <span>
                    👁️ ${views}
                </span>

                <span>
                    ❤️ ${likes}
                </span>

                <span>
                    ⭐ ${rating}
                </span>

            </div>


            <button
                class="read-btn"
                type="button"
            >
                කියවන්න →
            </button>

        </div>
    `;


    // =====================================
    // READ BUTTON
    // =====================================

    const readButton =
        card.querySelector(".read-btn");

    if (readButton) {

        readButton.addEventListener(
            "click",
            function () {

                openStory(story.id);

            }
        );
    }


    return card;
}


// =========================================
// ESCAPE HTML
// =========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value == null
            ? ""
            : String(value);

    return div.innerHTML;
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


    if (
        !storyList ||
        storyList.length === 0
    ) {

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
        function (story) {

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

    const story =
        getStories().find(
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!story) {
        return;
    }


    // =====================================
    // 18+ PROTECTION
    // =====================================

    if (isAdultStory(story)) {

        const confirmed =
            confirm(
                "🔞 18+ Content\n\n" +
                "මෙම කතාව වැඩිහිටියන් සඳහා පමණි.\n\n" +
                "ඔබට ඉදිරියට යාමට අවශ්‍යද?"
            );


        if (!confirmed) {
            return;
        }
    }


    window.location.href =
        "story.html?id=" +
        encodeURIComponent(id);
}


// =========================================
// DISPLAY HOME STORIES
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
        getPublicStories(),
        grid
    );
}


// =========================================
// DISPLAY LATEST
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
        getPublicStories().slice(0, 4);


    displayStories(
        latest,
        grid
    );
}


// =========================================
// OPEN 18+ CATEGORY
// =========================================

function openAdultCategory() {

    const confirmed =
        confirm(
            "🔞 18+ Content\n\n" +
            "මෙම කොටස වැඩිහිටියන් සඳහා පමණි.\n\n" +
            "ඔබට 18+ කතා බලන්න අවශ්‍යද?"
        );


    if (!confirmed) {
        return;
    }


    adultCategoryUnlocked = true;


    const adultCategory =
        document.getElementById(
            "adultCategory"
        );


    if (adultCategory) {

        adultCategory.style.display =
            "block";


        adultCategory.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


// =========================================
// CATEGORY
// =========================================

function showCategory(category) {

    const categoryName =
        String(category)
            .trim()
            .toLowerCase();


    // =====================================
    // 18+ CATEGORY
    // =====================================

    if (categoryName === "18+") {

        if (!adultCategoryUnlocked) {

            const confirmed =
                confirm(
                    "🔞 18+ Content\n\n" +
                    "මෙම කොටස වැඩිහිටියන් සඳහා පමණි.\n\n" +
                    "ඔබට ඉදිරියට යාමට අවශ්‍යද?"
                );


            if (!confirmed) {
                return;
            }


            adultCategoryUnlocked = true;
        }


        const adultStories =
            getAdultStories();


        showCategoryResults(
            "🔞 18+ කතා",
            adultStories
        );


        return;
    }


    // =====================================
    // NORMAL CATEGORY
    // =====================================

    const filtered =
        getPublicStories().filter(
            function (story) {

                return String(
                    story.category || ""
                )
                    .trim()
                    .toLowerCase()
                    === categoryName;

            }
        );


    showCategoryResults(
        category + " කතා",
        filtered
    );
}


// =========================================
// SHOW CATEGORY RESULTS
// =========================================

function showCategoryResults(
    titleText,
    storyList
) {

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


    if (
        !results ||
        !title ||
        !grid
    ) {
        return;
    }


    title.innerText =
        titleText;


    displayStories(
        storyList,
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


    adultCategoryUnlocked =
        false;


    const adultCategory =
        document.getElementById(
            "adultCategory"
        );


    if (adultCategory) {

        adultCategory.style.display =
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


    displayHomeStories();
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
        getPublicStories().filter(
            function (story) {

                return (

                    String(
                        story.title || ""
                    )
                        .toLowerCase()
                        .includes(text)

                    ||

                    String(
                        story.author || ""
                    )
                        .toLowerCase()
                        .includes(text)

                    ||

                    String(
                        story.category || ""
                    )
                        .toLowerCase()
                        .includes(text)

                    ||

                    String(
                        story.description || ""
                    )
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

function setupSearch() {

    const searchBox =
        document.getElementById(
            "searchBox"
        );


    if (!searchBox) {
        return;
    }


    searchBox.addEventListener(
        "input",
        searchStories
    );
}


// =========================================
// MY LIBRARY
// =========================================

function getLibrary() {

    let library = [];

    try {

        library =
            JSON.parse(
                localStorage.getItem(
                    "kathaLibrary"
                )
            ) || [];

    }
    catch (error) {

        library = [];
    }


    return library;
}


// =========================================
// DISPLAY LIBRARY
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
        getLibrary();


    const savedStories =
        getPublicStories().filter(
            function (story) {

                return saved.some(
                    function (id) {

                        return String(id) ===
                            String(story.id);

                    }
                );
            }
        );


    displayStories(
        savedStories,
        grid
    );
}


// =========================================
// REFRESH STORIES
// =========================================

async function refreshStories() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("stories")
                .select("*")
                .order("id", {
                    ascending: false
                });


        if (error) {

            console.error(
                "Refresh stories error:",
                error
            );

            return;
        }


        stories =
            data || [];


        displayHomeStories();
        displayLatest();
        displayLibrary();

    }
    catch (error) {

        console.error(
            "Refresh stories error:",
            error
        );
    }
}


// =========================================
// START WEBSITE
// =========================================

async function startWebsite() {

    console.log(
        "Katha Arana starting..."
    );


    displayHomeStories();
    displayLatest();
    displayLibrary();


    setupSearch();


    await loadStories();
}


// =========================================
// START
// =========================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startWebsite
    );

}
else {

    startWebsite();

}
```
