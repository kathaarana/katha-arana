```javascript
// =========================================
// KATHA ARANA - SIMPLE WORKING SCRIPT
// =========================================

let stories = [];
let adultCategoryUnlocked = false;


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
// 18+ CHECK
// =========================================

function isAdultStory(story) {

    return String(story?.category || "")
        .trim()
        .toLowerCase() === "18+";
}


// =========================================
// LOAD STORIES
// =========================================

async function loadStories() {

    console.log("START loading stories");


    const grid =
        document.getElementById("storyGrid");

    const latestGrid =
        document.getElementById("latestGrid");


    try {

        console.log(
            "supabaseClient:",
            supabaseClient
        );


        const result =
            await supabaseClient
                .from("stories")
                .select("*")
                .order("id", {
                    ascending: false
                });


        console.log(
            "SUPABASE RESULT:",
            result
        );


        if (result.error) {

            console.error(
                "STORIES DATABASE ERROR:",
                result.error
            );


            if (grid) {

                grid.innerHTML = `
                    <p style="
                        color:#ff7777;
                        padding:20px;
                    ">
                        ❌ Stories load error.<br><br>
                        ${escapeHTML(
                            result.error.message ||
                            "Unknown error"
                        )}
                    </p>
                `;

            }


            return;
        }


        stories =
            result.data || [];


        console.log(
            "STORIES COUNT:",
            stories.length
        );


        // DISPLAY IMMEDIATELY
        displayHomeStories();

        displayLatest();

        displayLibrary();


        // Rating is NOT required
        // for stories to appear.


    }
    catch (error) {

        console.error(
            "LOAD STORIES EXCEPTION:",
            error
        );


        if (grid) {

            grid.innerHTML = `
                <p style="
                    color:#ff7777;
                    padding:20px;
                ">
                    ❌ ${escapeHTML(
                        error.message ||
                        String(error)
                    )}
                </p>
            `;

        }

    }

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

    let coverHTML =
        "📖";


    if (
        story.cover &&
        String(story.cover).trim() !== ""
    ) {

        coverHTML = `
            <img
                src="${escapeHTML(
                    story.cover
                )}"
                alt="${escapeHTML(
                    story.title || "Story"
                )}"
                loading="lazy"
            >
        `;

    }


    // =====================================
    // STATS
    // =====================================

    const views =
        Number(
            story.views || 0
        );


    const likes =
        Number(
            story.likes || 0
        );


    const rating =
        Number(
            story.rating || 0
        );


    // =====================================
    // CARD HTML
    // =====================================

    card.innerHTML = `

        <div class="cover">

            ${coverHTML}

            <div class="cover-label">

                ${escapeHTML(
                    story.category ||
                    "Story"
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
                    story.title ||
                    "Untitled"
                )}

            </h3>


            <p>

                ✍️
                ${escapeHTML(
                    story.author ||
                    "කතා අරණ"
                )}

            </p>


            <p>

                ${escapeHTML(
                    story.description ||
                    ""
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

    const button =
        card.querySelector(".read-btn");


    if (button) {

        button.addEventListener(
            "click",
            function () {

                openStory(
                    story.id
                );

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

                තවම කතා නැහැ. 📚

            </p>

        `;

        return;
    }


    storyList.forEach(
        function (story) {

            element.appendChild(
                createStoryCard(
                    story
                )
            );

        }
    );

}


// =========================================
// PUBLIC STORIES
// =========================================

function getPublicStories() {

    return stories.filter(
        function (story) {

            return !isAdultStory(story);

        }
    );

}


// =========================================
// ADULT STORIES
// =========================================

function getAdultStories() {

    return stories.filter(
        function (story) {

            return isAdultStory(story);

        }
    );

}


// =========================================
// HOME
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
// LATEST
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
        getPublicStories()
            .slice(0, 4);


    displayStories(
        latest,
        grid
    );

}


// =========================================
// OPEN STORY
// =========================================

function openStory(id) {

    const story =
        stories.find(
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!story) {

        console.error(
            "Story not found:",
            id
        );

        return;
    }


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
// CATEGORY
// =========================================

function showCategory(category) {

    const categoryName =
        String(category)
            .trim()
            .toLowerCase();


    if (
        categoryName === "18+"
    ) {

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


            adultCategoryUnlocked =
                true;

        }


        showCategoryResults(
            "🔞 18+ කතා",
            getAdultStories()
        );


        return;
    }


    const filtered =
        getPublicStories()
            .filter(
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


    if (text === "") {

        displayHomeStories();

        return;
    }


    const results =
        getPublicStories()
            .filter(
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
                        title.includes(text) ||
                        author.includes(text) ||
                        category.includes(text) ||
                        description.includes(text)
                    );

                }
            );


    const grid =
        document.getElementById(
            "storyGrid"
        );


    displayStories(
        results,
        grid
    );

}


// =========================================
// SEARCH SETUP
// =========================================

function setupSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const button =
        document.getElementById(
            "searchButton"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        function () {

            searchStories();

        }
    );


    if (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                searchStories();

            }
        );

    }


    input.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

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

    try {

        return JSON.parse(
            localStorage.getItem(
                "kathaLibrary"
            )
        ) || [];

    }
    catch (error) {

        return [];

    }

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
        getPublicStories()
            .filter(
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
// START
// =========================================

async function startWebsite() {

    console.log(
        "🚀 KATHA ARANA START"
    );


    setupSearch();


    // Load database stories

    await loadStories();

}


// =========================================
// DOM READY
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
