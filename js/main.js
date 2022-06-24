$(document).ready(
    function () {

        "use strict";

        var expandableContents = $("[data-display='expandable'], .expandable");
        expandableContents.each(function (index, element) {
            var params = {}, $element = $(element);
            if ($element.attr("data-showNum")) {
                params.showNum = parseInt($element.attr("data-showNum"), 10);
            }
            $element.contentExpand(index, params);
        });

        var expandableTables = $("[data-display='table'], .table-expand");
        expandableTables.each(function (index, element) {
            var params = {}, $element = $(element);
            if ($element.attr("data-showNum")) {
                params.showNum = parseInt($element.attr("data-showNum"), 10);
            }
            $element.tableExpand(index, params);
        });

        var pinnedMenus = $("[data-nav='pinned'], .pinned");
        pinnedMenus.each(function (index, element) {
            var params = {}, $element = $(element);
            if ($element.attr("data-topMargin")) {
                params.topMargin = parseInt($element.attr("data-topMargin"), 10);
            }
            $element.menuPin(index, params);
        });

        var notesNavs = $("[data-nav='notes'], .notes");
        notesNavs.each(function (index, element) {
            var params = {}, $element = $(element);
            $element.notesNav(index, params);
        });

        var tableRow = $("[data-display='table-row'], .table-row");
        tableRow.each(function (index, element) {
            var params = {}, $element = $(element);
            $element.tableRow(index, params);
        });
    }
);
