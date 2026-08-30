// =========================================
// KATHA ARANA
// MAIN WEBSITE SCRIPT
// SUPABASE VERSION
// =========================================


// =========================================
// STORIES
// =========================================

let stories = [];


// =========================================
// GET ALL STORIES
// =========================================

function getStories() {

    return stories;

}


// =========================================
// LOAD STORIES FROM SUPABASE
// =========================================

async function loadStories() {

    try {

        const {
            data,
            error
        } = await supabaseClient

            .from("stories")

            .select("*")

            .order(
                "id",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(
                "Supabase error:",
                error
            );

            showLoadingError();

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

        document.getElementById("libraryGrid")

    ];


    grids.forEach(
        function(grid) {

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

        }
    );

}


// =========================================
// CREATE STORY CARD
// =========================================

function createStoryCard(story) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "story-card";


    let coverHTML =
        "📖";


    if (story.cover) {

        coverHTML = `

            <img
                src="${escapeHTML(story.cover)}"
                alt="${escapeHTML(story.title)}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    display:block;
                "
            >

        `;

    }


    const views =
        Number(story.views || 0);


    const rating =
        Number(story.rating || 0);


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
                style="
                    display:flex;
                    gap:15px;
                    margin-bottom:18px;
                    color:#777;
                    font-size:13px;
                "
            >

                <span>
                    👁️ ${views}
                </span>


                <span>
                    ⭐ ${rating}
                </span>

            </div>


            <button
                class="read-btn"
                type="button"
                onclick="openStory('${story.id}')"
            >

                කියවන්න →

            </button>

        </div>

    `;


    return card;

}


// =========================================
// ESCAPE HTML
// =========================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


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


    element.innerHTML =
        "";


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

                    String(
                        story.category || ""
                    )
                    .toLowerCase()

                    ===

                    String(category)
                    .toLowerCase()

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


    if (
        !results ||
        !title ||
        !grid
    ) {

        return;

    }


    title.innerText =
        category +
        " කතා";


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
        getStories().filter(
            function(story) {

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

// First show empty state

displayHomeStories();

displayLatest();

displayLibrary();


// Then load from Supabase

loadStories();