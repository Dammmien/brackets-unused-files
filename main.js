/*global define, brackets*/

define(function (require, exports, module) {
    "use strict";
    var CommandManager    = brackets.getModule('command/CommandManager'),
        Menus             = brackets.getModule('command/Menus'),
        unusedFiles       = require("unusedFiles"),
        COMMAND_ID_I      = 'unusedFiles.init',
        menu              = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    CommandManager.register("Find unused files", COMMAND_ID_I, unusedFiles.init);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID_I);
});
