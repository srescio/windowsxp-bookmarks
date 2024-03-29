# Windows XP Bookmarks ★ #

![enter image description here][1]

End of support has come for Windows XP, on [8th of April 2014][2] Microsoft officially discontinued critical security updates for the platform thus declaring its death, and now that it is gone...it has become *vintage*!

It was the most loved (not much maybe) and hated (**a lot**) OS worldwide for 12 long years, so paying a memory tribute to it is a given.

This webapp revives the Windows XP graphic shell as an HTML5 showcase for your bookmarks.

## The icons ##

Each `Icon` responds to mouse grid-selection and double-click on the desktop, when double-clicked it will open a new `Program` which consist of a 'window' showing the link in an iFrame and a 'program-bar element' below to handle multiple `Programs`.
Windows can then be moved around, resized, magnified, hidden or closed as you was used with programs on dear old XP.

The icon's images are the website's favicons, they're obtained from the website's root link plus the `favicon.ico` path appended to fetch the file from the root folder, which should be the standard location for such files.

Unfortunately not all websites honor this path convention and an image might give a 404 error if located in a different path.
In such case a default class will be added to the icon to display a default image.

## iFrame inclusion restrictions ##

Each bookmark is first checked against a PHP script that reads the website's HTTP response header looking for iFrame inclusion restrictions. If none is found the link will be rendered.
Notice that a website may still restrict loading contents in an iFrame but not block the inclusion choosing to display a specific page instead, like Flickr does.

The most popular social networks like facebook and twitter, and social coding platforms as well, do restrict webpages from being loaded in iFrames but it's not really an option to opt-out such links.
For this reason I've included them in the `startmenu` where they'll be opened in new browser's windows unlike the other links that will not show up at all if it's impossible to load them in a 'window'.

The main framework is **BackBone** with **requirejs** AMD modules pattern, and the styles rely mostly on **CSS tables** to achieve an OS-like behavior of the various elements such as the bottom program bar, the window elements and their inner components such as titles and buttons.
The only JS size manipulation is handled by the `jquery-ui resizable` plugin which modifies the outer most container of the 'window' and then all the inner contents adpat accordingly.

## Import bookmarks from Chrome ##

First export your Chrome bookmarks to your *desktop* directory, you will obtain a file named `bookmarks_DATE_OF_EXPORT.html`, now run the package script:

    npm run copy-bookmarks

this will make a copy in the project's `data` directory, it is ignored by git so no danger to commit that.

Next run the package script:

    npm run generate-data

this will create the file `data/data.json` which will contains a subset of your choice using a link as indentifier for a directory that will be looped for bookmarks.

## Usage ##

First install the npm packages, it will also execute automatically the copy task that will take the minified assets into the js directory that will be uploaded:

    npm i

The user is required to init the app from the main js file by providing arguments to the `Dekstop` function, which are :

        user : {
            name        :'User Name',
            avatarUrl   :'path/to/image.png',
            email       :'user@email.com',
            website     :'http://website.com'
        },

        social : {
            github      :'https://github.com/username/',
            codepen     :'http://codepen.io/username/',
            twitter     :'https://twitter.com/username/',
            linkedin    :'https://www.linkedin.com/username'
        },

        bookmarks : {
            desktop     : data.find(el => el.directory == 'Name of subdir 1'),
            startmenu   : data.find(el => el.directory == 'Name of subdir 2'),
            documents   : data.find(el => el.directory == 'Name of subdir 3')
        }

Startup and shutdown sounds included, which require initial user interaction as per latest Audio APIs.
You can see it in action at [http://windowsxp.simonerescio.it][3]

License : [CC BY 3.0 IT][4]

  [1]: https://raw.githubusercontent.com/srescio/windowsxp-bookmarks/master/img/windowsxp-bookmarks.jpg
  [2]: http://www.microsoft.com/en-us/windows/business/retiring-xp.aspx
  [3]: http://windowsxp.simonerescio.it
  [4]: http://creativecommons.org/licenses/by/3.0/it/deed.en
  