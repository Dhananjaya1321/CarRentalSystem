let click = 0;
$("#filter>button").click(function () {
    if (click === 0) {
        let filter = $("#filter");
        // filter.css("display", "flex");
        filter.css("position", "absolute");
        filter.css("boxShadow", "#0000007a 0px 0px 8px -4px");
        filter.css("borderRadius", "10px");
        filter.css("top", "-40px");
        filter.css("right", "0px");
        filter.css("height", "35px");
        filter.css("width", "90px");

        let searchBar = $(" #search-bar");
        searchBar.css("width", "80%");
        searchBar.css("align-self", "unset");
        searchBar.css("margin-right", "unset");
        searchBar.css("border-radius", "15px");
        $("#search-bar > select").css("display", "flex");
        $("#search-bar > button").css("display", "inline");

        click = 1;
    } else {
        let searchBar = $(" #search-bar");
        searchBar.css("width", "max-content");
        searchBar.css("align-self", "flex-end");
        searchBar.css("margin-right", "15px");
        searchBar.css("border-radius", "10px");
        $("#search-bar > select").css("display", "none");
        $("#search-bar > button").css("display", "none");

        click = 0;
    }

});