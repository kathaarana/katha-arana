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
// PUBLIC STORIES
// =========================================

function getPublicStories() {

    return getStories().filter(function (story) {
        return !isAdultStory(story);
    });
}


// =========================================
// ADULT STORIES
// =========================================

function getAdultStories() {

    return getStories().filter(function (story) {
        return isAdultStory(story);
    });
}


// =========================================
// ESCAPE HTML
// =========================================

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent =
        value == null ? "" : String(value);

    return div.innerHTML;
}


// =========================================
// LOAD STORIES FROM SUPABASE
// =========================================

async function loadStories() {

    console.log("📚 Loading stories...");

    try {

        if (typeof supabaseClient === "undefined") {

            console.error(
                "❌ supabaseClient is not defined"
            );

            showLoadingError(
                "Supabase connection එක හම්බ වුණේ නැහැ."
            );

            return;
        }


        const result =
            await supabaseClient
                .from("stories")
                .select("*")
                .order("id", {
                    ascending: false
                });


        const data = result.data;
        const error = result.error;


        if (error) {

            console.error(
                "❌ Supabase stories error:",
                error
            );

            showLoadingError(
                "Supabase එකෙන් කතා load කරන්න බැරි වුණා."
            );

            return;
        }


        console.log(
            "✅ Stories loaded:",
            data
        );


        stories = data || [];


        displayHomeStories();

        displayLatest();

        displayLibrary();

    }

    catch (error) {

        console.error(
            "❌ loadStories error:",
            error
        );

        showLoadingError(
            "කතා load කරන්න බැරි වුණා."
        );
    }
}


// =========================================
// LOADING ERROR
// =========================================

function showLoadingError(message) {

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

                😔 ${escapeHTML(message)}

            </p>

        `;
    });
}


// =========================================
// CREATE STORY CARD
// =========================================

function createStoryCard(story) {

    const card =
        document.createElement("article");


    card.className =
        "story-card";


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
                loading="lazy"
            >

        `;
    }


    // =====================================
    // DATABASE STATS
    // IMPORTANT:
    // views  = views
    // likes  = likes
    // rating = rating
    // =====================================

    const views =
        Number(story.views || 0);


    const likes =
        Number(story.likes || 0);


    const rating =
        Number(story.rating || 0);


    console.log(
        "📊 Story stats:",
        story.title,
        {
            views: views,
            likes: likes,
            rating: rating
        }
    );


    // =====================================
    // CARD HTML
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


            <div class="story-meta">

                <span>

                    👁️ ${views}

                </span>


                <span>

                    ❤️ ${likes}

                </span>


                <span>

                    ⭐ ${rating.toFixed(1)}

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


    storyList.forEach(function (story) {

        element.appendChild(
            createStoryCard(story)
        );

    });
}


// =========================================
// OPEN STORY
// =========================================

function openStory(id) {

    const story =
        getStories().find(function (item) {

            return String(item.id) ===
                String(id);

        });


    if (!story) {

        console.error(
            "Story not found:",
            id
        );

        return;
    }


    // =====================================
    // 18+ CHECK
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
// HOME STORIES
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
        getPublicStories().slice(0, 4);


    displayStories(
        latest,
        grid
    );
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
    // 18+
    // =====================================

    if (categoryName === "18+") {

        if (!adultCategoryUnlocked) {

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
        }


        showCategoryResults(
            "🔞 18+ කතා",
            getAdultStories()
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
                .toLowerCase() ===
                categoryName;

            }
        );


    showCategoryResults(
        category + " කතා",
        filtered
    );
}


// =========================================
// CATEGORY RESULTS
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


    displayHomeStories();


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
            "searchInput"
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


    // =====================================
    // EMPTY
    // =====================================

    if (text === "") {

        displayHomeStories();

        return;
    }


    // =====================================
    // SEARCH
    // =====================================

    const results =
        getPublicStories().filter(
            function (story) {

                const title =
                    String(
                        story.title || ""
                    )
                    .toLowerCase();


                const author =
                    String(
                        story.author || ""
                    )
                    .toLowerCase();


                const category =
                    String(
                        story.category || ""
                    )
                    .toLowerCase();


                const description =
                    String(
                        story.description || ""
                    )
                    .toLowerCase();


                return (

                    title.includes(text)

                    ||

                    author.includes(text)

                    ||

                    category.includes(text)

                    ||

                    description.includes(text)

                );

            }
        );


    displayStories(
        results,
        grid
    );


    const categoryResults =
        document.getElementById(
            "categoryResults"
        );


    if (categoryResults) {

        categoryResults.style.display =
            "none";
    }
}


// =========================================
// SEARCH SETUP
// =========================================

function setupSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const searchButton =
        document.getElementById(
            "searchButton"
        );


    if (!searchInput) {

        console.log(
            "Search input not found."
        );

        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            searchStories();

        }
    );


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                searchStories();

            }
        );
    }


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchStories();

            }

        }
    );
}


// =========================================
// LIBRARY
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

    console.log(
        "🔄 Refreshing stories..."
    );


    try {

        const result =
            await supabaseClient
                .from("stories")
                .select("*")
                .order("id", {
                    ascending: false
                });


        if (result.error) {

            console.error(
                "Refresh error:",
                result.error
            );

            return;
        }


        stories =
            result.data || [];


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
        "🚀 Katha Arana starting..."
    );


    // Initial empty display

    displayHomeStories();

    displayLatest();

    displayLibrary();


    // Search

    setupSearch();


    // Load Supabase stories

    await loadStories();


    console.log(
        "✅ Katha Arana ready."
    );
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
