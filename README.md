#Find Unused Files

A Brackets editor extension to find unused files in your web project


### How to use this extension

You can launch an unused files detection by clicking "Edit" > "Find unused file".
The list of unused files will be display in the bottom panel.


### The logic used :

1. List all file from the web project.
2. Extract of this list , all the files likely to call another file. > First list
3. Extract of this list , all the file names likely to don't be used. > Second List
4. Check if the content of each file of the first list contains the name of a file of the second list
5. When a file of the second list is called, remove it from the list.
6. List all the file which are never called.


### Analysed Files :

The extension will search the call of a : PNG, JPG, JPEG, GIF, SVG, BMP, ICO, JS, CSS
in files : HTML, HTM, CSS, PHP, JS, ASPX, ASCX, CSHTML, LESS, SCSS, SASS, JSON, MD


### Warning

A file isn't used when it's name isn't called in another file.
For example, if file names are generated in loops :

    for (var i = 0; i < 5; i++){
      console.log('image_' + i + '.jpg');
    }

The filename *"image_3.jpg"* isn't written in this few lines but this file is called once the code executed.
So, a file in the list can be useful, **always checked the files before deleting them**.

This extension scans the current project, so if a file is called in another project or by another website, this file cannot be considered as used.


### Processing time

The result is almost instantaneous in a web project containing less than 3000 files.
I tested on a web project of 10 000 files and the editor freezes, the list of unused files is shown after few minutes...
I will try to reduce the analyzing speed in future versions.
