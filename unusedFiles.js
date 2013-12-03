/*global define, brackets, $, console */

define(function (require, exports, module) {
    "use strict";

    var DocumentManager   = brackets.getModule('document/DocumentManager'),
        FileSystem        = brackets.getModule('filesystem/FileSystem'),
        ProjectManager    = brackets.getModule('project/ProjectManager'),
        PanelManager      = brackets.getModule('view/PanelManager'),
        Resizer           = brackets.getModule('utils/Resizer'),
        resultTemplate    = require("text!unusedResult.html"),
        unusedPanel       = PanelManager.createBottomPanel('unusedFiles.panel', $(resultTemplate), 100),
        $unusedPanel      = $('#unused-results');

    function compareFiles(callingFilesList, unusedFilesList) {
        var callingFilesListLength  = callingFilesList.length,
            unusedFilesListLength   = unusedFilesList.length;
        function checkinginFile(n) {
            DocumentManager.getDocumentText(FileSystem.getFileForPath(callingFilesList[n].fullPath)).done(function (doc) {
                var unusedFilesListLength   = unusedFilesList.length;
                for (var i = 0; i < unusedFilesListLength; i++) {
                    if ((typeof unusedFilesList[i] !== "undefined")) var used = new RegExp(unusedFilesList[i]["name"], 'i').test(doc);
                    if ( used ) delete unusedFilesList[i];
                }
                if (n + 1 === callingFilesList.length){
                    var unusedFilesListLength   = unusedFilesList.length;
                    for (var j = 0; j < unusedFilesListLength; j++) {
                        if ((typeof unusedFilesList[j] !== "undefined")) $('table.unusedTable').append('<tr><td>' + unusedFilesList[j]["name"] + '</td><td>' + unusedFilesList[j]["fullPath"] + '</td></tr>');
                    }
                    $('#unused-results .title').text(Object.keys(unusedFilesList).length + ' unused file(s)');
                    Resizer.show( $unusedPanel );
                }
            });
        }
        for (var k = 0; k < callingFilesListLength; k++) {
            checkinginFile(k);
        }
    }

    function listFiles() {
        ProjectManager.getAllFiles().done( function (fileListResult) {
            var ext_a                 = [".html", ".htm", ".css", ".php", ".js", ".aspx", ".ascx", ".master", ".cshtml", ".less", ".scss", ".sass", ".json", ".md"],
                ext_b                 = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".bmp", ".ico", ".js", ".css"],
                filesList             = [],
                unusedFilesList       = [],
                dot                   = 0,
                ext                   = '',
                fileListResultLength  = fileListResult.length;

            for (var i = 0; i < fileListResultLength; i++) {
                dot = fileListResult[i].name.lastIndexOf("."),
                ext = fileListResult[i].name.substring(dot);
                if (ext_a.indexOf(ext) !== -1) filesList.push({'name' : fileListResult[i].name, 'fullPath' : fileListResult[i].fullPath});
                if (ext_b.indexOf(ext) !== -1) unusedFilesList.push({'name' : fileListResult[i].name, 'fullPath' : fileListResult[i].fullPath});
            }

            compareFiles(filesList, unusedFilesList);

        });
    }

    function init(){
        $('table.unusedTable, #unused-results .title').empty();
        $unusedPanel.find('.close').on('click', function() {
            Resizer.hide( $unusedPanel );
        });
        listFiles();
    }

    exports.init  = init;

});
