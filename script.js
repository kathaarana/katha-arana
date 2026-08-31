```javascript
// =========================================
// KATHA ARANA
// MAIN WEBSITE SCRIPT
// SUPABASE VERSION
// =========================================

var stories = [];
var adultCategoryUnlocked = false;


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

    if (!story) {
        return false;
    }

    return String(story.category || "")
        .trim()
        .toLowerCase() === "18+";
}


// =========================================
// GET PUBLIC STORIES
// =========================================

function getPublicStories() {

    return stories.filter(function (story) {
        return !isAdultStory(story);
    });
}


// =========================================
// GET 18+ STORIES
// =========================================

function getAdultStories() {

    return stories.filter(function (story) {
        return isAdultStory(story);
    });
}


// =========================================
// LOAD STORIES FROM SUPABASE
// =========================================

async function loadStories() {

    try {

        console.log("Loading stories from Supabase...");


        if (
            typeof supabaseClient ===
            "undefined"
        ) {

            console.error(
                "supabaseClient is not defined."
            );

            showLoadingError();

            return;
        }


        var result =
            await supabaseClient
                .from("stories")
                .select("*")
                .order("id", {
                    ascending: false
                });


        var data =
            result.data;

        var error =
            result.error;


        if (error) {

            console.error(
                "Supabase stories error:",
                error
            );

            showLoadingError();

            return;
        }


        stories =
            data || [];


        console.log(
            "Stories loaded:",
            stories.length
        );


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

    var grid1 =
        document.getElementById(
            "storyGrid"
        );

    var grid2 =
        document.getElementById(
            "latestGrid"
        );

    var grid3 =
        document.getElementById(
            "libraryGrid"
        );

    var grid4 =
        document.getElementById(
            "categoryStoryGrid"
        );


    var grids = [
        grid1,
        grid2,
        grid3,
        grid4
    ];


    grids.forEach(function (grid) {

        if (!grid) {
            return;
        }


        grid.innerHTML =
            "<p style=\"color:#888;padding:20px;\">" +
            "කතා load කරන්න බැරි වුණා. 😔" +
            "</p>";

    });
}


// =========================================
// CREATE STORY CARD
// =========================================

function createStoryCard(story) {

    var card =
        document.createElement(
            "article"
        );


    card.className =
        "story-card";


    // =====================================
    // COVER
    // =====================================

    var cover =
        document.createElement(
            "div"
        );

    cover.className =
        "cover";


    if (
        story.cover &&
        String(story.cover).trim() !== ""
    ) {

        var image =
            document.createElement(
                "img"
            );


        image.src =
            String(story.cover);


        image.alt =
            String(
                story.title ||
                "Story"
            );


        image.style.width =
            "100%";

        image.style.height =
            "100%";

        image.style.objectFit =
            "cover";

        image.style.display =
            "block";


        cover.appendChild(
            image
        );

    }

    else {

        cover.textContent =
            "📖";

    }


    // =====================================
    // COVER LABEL
    // =====================================

    var coverLabel =
        document.createElement(
            "div"
        );


    coverLabel.className =
        "cover-label";


    coverLabel.textContent =
        String(
            story.category ||
            "Story"
        );


    cover.appendChild(
        coverLabel
    );


    // =====================================
    // STORY INFO
    // =====================================

    var info =
        document.createElement(
            "div"
        );


    info.className =
        "story-info";


    // =====================================
    // CATEGORY
    // =====================================

    var category =
        document.createElement(
            "p"
        );


    category.className =
        "label";


    category.textContent =
        String(
            story.category ||
            ""
        );


    info.appendChild(
        category
    );


    // =====================================
    // TITLE
    // =====================================

    var title =
        document.createElement(
            "h3"
        );


    title.textContent =
        String(
            story.title ||
            "Untitled"
        );


    info.appendChild(
        title
    );


    // =====================================
    // AUTHOR
    // =====================================

    var author =
        document.createElement(
            "p"
        );


    author.textContent =
        "✍️ " +
        String(
            story.author ||
            "කතා අරණ"
        );


    info.appendChild(
        author
    );


    // =====================================
    // DESCRIPTION
    // =====================================

    var description =
        document.createElement(
            "p"
        );


    description.textContent =
        String(
            story.description ||
            ""
        );


    info.appendChild(
        description
    );


    // =====================================
    // STATS
    // =====================================

    var meta =
        document.createElement(
            "div"
        );


    meta.className =
        "story-meta";


    meta.style.display =
        "flex";

    meta.style.gap =
        "15px";

    meta.style.marginBottom =
        "18px";

    meta.style.color =
        "#777";

    meta.style.fontSize =
        "13px";

    meta.style.flexWrap =
        "wrap";


    var views =
        Number(
            story.views || 0
        );


    var likes =
        Number(
            story.liked || 0
        );


    var rating =
        Number(
            story.rating || 0
        );


    var viewsSpan =
        document.createElement(
            "span"
        );


    viewsSpan.textContent =
        "👁️ " + views;


    var likesSpan =
        document.createElement(
            "span"
        );


    likesSpan.textContent =
        "❤️ " + likes;


    var ratingSpan =
        document.createElement(
            "span"
        );


    ratingSpan.textContent =
        "⭐ " + rating;


    meta.appendChild(
        viewsSpan
    );

    meta.appendChild(
        likesSpan
    );

    meta.appendChild(
        ratingSpan
    );


    info.appendChild(
        meta
    );


    // =====================================
    // READ BUTTON
    // =====================================

    var readButton =
        document.createElement(
            "button"
        );


    readButton.className =
        "read-btn";


    readButton.type =
        "button";


    readButton.textContent =
        "කියවන්න →";


    readButton.addEventListener(
        "click",
        function () {

            openStory(
                story.id
            );

        }
    );


    info.appendChild(
        readButton
    );


    // =====================================
    // BUILD CARD
    // =====================================

    card.appendChild(
        cover
    );


    card.appendChild(
        info
    );


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


    element.innerHTML =
        "";


    if (
        !storyList ||
        storyList.length === 0
    ) {

        element.innerHTML =
            "<p style=\"color:#888;padding:20px;\">" +
            "මේ section එකේ තවම කතා නැහැ. 📚" +
            "</p>";

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
// OPEN STORY
// =========================================

function openStory(id) {

    var story =
        stories.find(
            function (item) {

                return String(
                    item.id
                ) === String(
                    id
                );

            }
        );


    if (!story) {

        console.error(
            "Story not found:",
            id
        );

        return;
    }


    // =====================================
    // 18+ PROTECTION
    // =====================================

    if (
        isAdultStory(story)
    ) {

        var confirmed =
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
        encodeURIComponent(
            id
        );
}


// =========================================
// DISPLAY HOME STORIES
// =========================================

function displayHomeStories() {

    var grid =
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

    var grid =
        document.getElementById(
            "latestGrid"
        );


    if (!grid) {
        return;
    }


    var latest =
        getPublicStories().slice(
            0,
            4
        );


    displayStories(
        latest,
        grid
    );
}


// =========================================
// OPEN 18+ CATEGORY
// =========================================

function openAdultCategory() {

    var confirmed =
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


    var adultCategory =
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
// SHOW CATEGORY
// =========================================

function showCategory(
    category
) {

    var categoryName =
        String(
            category
        )
        .trim()
        .toLowerCase();


    // =====================================
    // 18+
    // =====================================

    if (
        categoryName ===
        "18+"
    ) {

        if (
            !adultCategoryUnlocked
        ) {

            var confirmed =
                confirm(
                    "🔞 18+ Content\n\n" +
                    "මෙම කොටස වැඩිහිටියන් සඳහා පමණි.\n\n" +
                    "ඔබට ඉදිරියට යාමට අවශ්‍යද?"
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


    // =====================================
    // NORMAL CATEGORY
    // =====================================

    var filtered =
        getPublicStories().filter(
            function (story) {

                return String(
                    story.category ||
                    ""
                )
                .trim()
                .toLowerCase()
                === categoryName;

            }
        );


    showCategoryResults(
        String(category) +
        " කතා",
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

    var results =
        document.getElementById(
            "categoryResults"
        );


    var title =
        document.getElementById(
            "categoryTitle"
        );


    var grid =
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


    title.textContent =
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

    var results =
        document.getElementById(
            "categoryResults"
        );


    if (results) {

        results.style.display =
            "none";
    }


    adultCategoryUnlocked =
        false;


    var adultCategory =
        document.getElementById(
            "adultCategory"
        );


    if (adultCategory) {

        adultCategory.style.display =
            "none";
    }


    displayHomeStories();


    var storiesSection =
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

    var input =
        document.getElementById(
            "searchBox"
        );


    if (!input) {
        return;
    }


    var text =
        input.value
            .toLowerCase()
            .trim();


    var grid =
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


    var results =
        getPublicStories().filter(
            function (story) {

                var title =
                    String(
                        story.title ||
                        ""
                    )
                    .toLowerCase();


                var author =
                    String(
                        story.author ||
                        ""
                    )
                    .toLowerCase();


                var category =
                    String(
                        story.category ||
                        ""
                    )
                    .toLowerCase();


                var description =
                    String(
                        story.description ||
                        ""
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


    displayStories(
        results,
        grid
    );
}


// =========================================
// SEARCH WHILE TYPING
// =========================================

function setupSearch() {

    var searchBox =
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

    var library = [];


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

    var grid =
        document.getElementById(
            "libraryGrid"
        );


    if (!grid) {
        return;
    }


    var saved =
        getLibrary();


    var savedStories =
        getPublicStories().filter(
            function (story) {

                return saved.some(
                    function (id) {

                        return String(
                            id
                        ) === String(
                            story.id
                        );

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

        var result =
            await supabaseClient
                .from("stories")
                .select("*")
                .order("id", {
                    ascending: false
                });


        if (result.error) {

            console.error(
                "Refresh stories error:",
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
