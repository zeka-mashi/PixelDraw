var gsize = 16;
var drawing = false;

function setUp() {
    var error = document.getElementsByClassName("error")[0];
    error.textContent = "";
    error.style.color = null;
    error.classList.add("hidden");
    var clr = document.getElementsByClassName("color-wrapper")[0];
    clr.style.backgroundColor = document.getElementById("color").value;
    var size = document.getElementById("size");
    size.value = gsize;
    var minSize = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8);
    var container = document.getElementsByClassName("grid-container")[0];
    container.style.minWidth = minSize + "px";
    container.style.maxWidth = minSize + "px";
    container.style.minHeight = minSize + "px";
    container.style.maxHeight = minSize + "px";
    container.style.gridAutoRows = "repeat(" + gsize + ", " + (minSize / gsize) + "px)";
    container.style.gridTemplateColumns = "repeat(" + gsize + ", " + (minSize / gsize) + "px)";
    for (let i = 0; i < gsize * gsize; i++) {
        var grid = document.createElement("div");
        grid.id = "grid" + i;
        grid.classList.add("grid-item");
        grid.addEventListener("mouseover", function() { colorGrid(this) });
        container.appendChild(grid);
    }
}

setUp();

document.getElementById("change-size").addEventListener("click", function changeSize() {
    var container = document.getElementsByClassName("grid-container")[0];
    var size = document.getElementById("size").value
    var error = document.getElementsByClassName("error")[0];
    error.classList.add("hidden");
    error.style.color = null;
    if (!isNaN(parseInt(size))) {
        if (parseInt(size) === gsize) {
            error.innerHTML = "&#x26A0; Canvas is already size " + gsize;
            error.style.color = "#686868";
            error.classList.remove("hidden");
        } else if (parseInt(size) > 0 && parseInt(size) <= 100) {
            gsize = parseInt(size);
            var grids = document.getElementsByClassName("grid-item");
            for (let i = 0; i < grids.length; i++) {
                grids[i].removeEventListener("click", changeSize);
            }
            container.remove();
            var newContainer = document.createElement("div");
            newContainer.classList.add("grid-container");
            newContainer.classList.add("center");
            var body = document.getElementsByClassName("content")[0];
            body.append(newContainer);
            setUp();
        } else {
            error.textContent = "Invalid new grid size (1 - 100 only)";
            error.classList.remove("hidden");
        }
    } else {
        error.textContent = "Grid size must contain numbers only!";
        error.classList.remove("hidden");
    }
});
var clr = document.getElementsByClassName("color-wrapper")[0];
clr.addEventListener("input", function(e) {
    clr.style.backgroundColor = e.target.value;
})
window.addEventListener("mousedown", function(e) {
    if (e.target.className === "grid-item" && e.button === 0) {
        drawing = true;
        colorGrid(e.target);
    }
});
window.addEventListener("mouseup", function(e) {
    drawing = false;
});
window.addEventListener("resize", function(e) {
    var minSize = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8);
    var container = document.getElementsByClassName("grid-container")[0];
    container.style.minWidth = minSize + "px";
    container.style.maxWidth = minSize + "px";
    container.style.minHeight = minSize + "px";
    container.style.maxHeight = minSize + "px";
    container.style.gridAutoRows = "repeat(" + gsize + ", " + (minSize / gsize) + "px)";
    container.style.gridTemplateColumns = "repeat(" + gsize + ", " + (minSize / gsize) + "px)";
})
document.getElementById("clear").addEventListener("click", function() {
    var grids = document.getElementsByClassName("grid-item");
    for (let i = 0; i < grids.length; i++) {
        grids[i].style.backgroundColor = null;
    }
    var error = document.getElementsByClassName("error")[0];
    error.textContent = "";
});

function colorGrid(grid) {
    if (drawing) {
        var elm = document.getElementById(grid.id);
        elm.style.backgroundColor = document.getElementById("color").value;
    }
}