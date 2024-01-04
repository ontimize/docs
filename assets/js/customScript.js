// Load jsTree
$(document).ready(function () { $('.jstreeloader').jstree(); });

// Toggle tree multicolumn
document.addEventListener('DOMContentLoaded', function() {
    var toggleButtons = document.getElementsByClassName('toggle-tree-btn');
    for (let btn of toggleButtons) {
        btn.addEventListener('click', function() {
            btn.closest('.multicolumn').querySelector('.jstreeloader').classList.toggle('collapsed');
        });
    }
});

// Collapsible TOC
document.addEventListener("DOMContentLoaded", function() {
    var tocTitle = document.getElementById("tocTitle");

    if(tocTitle != null){
        tocTitle.addEventListener("click", function() {
            var toc = document.getElementById("toc");
            toc.querySelector('.toc__menu').classList.toggle('collapsed');
            toc.closest('.sidebar__right').classList.toggle('collapsed');
            tocTitle.classList.toggle('collapsed');
            toc.classList.toggle('collapsed');
        });
    }
});

// Show trees on initial load with width bigger than 1260px
window.onload = function() {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth > 1260) {
        var toggleButtons = document.getElementsByClassName('jstreeloader');
        for (let div of toggleButtons){
            div.classList.remove('collapsed');
        }
    }
};