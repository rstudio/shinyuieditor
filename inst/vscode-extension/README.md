# ShinyUiEditor VSCode extension

This is the VSCode extension for the ShinyUiEditor. It wraps the UIEditor and allows for it to be run right in your VSCode editor.

## Starting editor

### From an existing app

With the extension installed any file with the name pattern of `*app.R` will be interpreted as a Shiny app. In this situation a small button will appear in the upper right that allows you to open the current file in the ui editor. If the app is a [valid app for the ui editor]() it will immediatley start up the editor. If the file is empty, a template chooser interface will be shown allowing you to populate the app. If the app is invalid, then an error will be shown and you will need to edit the file before running the editor.

### Building a new app

If you wish to start a new app with the ui editor you can use the command `shinyuieditor.launchEditor` (or "Launch ShinyUiEditor"). This will open up a file picker dialog where you can chose the location of the app you wish to create followed by the name of the app file. This will start up the editor in the template chooser mode.
You may also start the editor on an existing app this way. Just choose an existing app location.

## About the ShinyUiEditor

![VSCode editor](https://rstudio.github.io/shinyuieditor/articles/screenshots/template-chooser.png)

A visual tool for building the UI portion of a Shiny application that generates clean and human-readable code.

The goal of the Shiny Ui Editor is to allow people to build the broad-level UI for their Shiny app without writing code. The editor is intended for those who may not be comfortable with the HTML-style code of Shiny's UI functions or who simply don't want to fiddle with sizes to get things laid out correctly.

## ⚠️ `shinyuieditor` is currently in Alpha.

It may be unstable, and the API may change. We're excited to hear your feedback, but please don't use it for production applications just yet!

## Getting errors?

The extension relies on R being installed and available and that the R package `shinyuieditor` is also installed. To install this package, from R run: `remotes::install_github('rstudio/shinyuieditor')`. If errors persist see the [main website's troubleshooting section](https://rstudio.github.io/shinyuieditor/index.html#trouble-installing/)

## Feedback

Found a bug or want to suggest a feature? Use the github issues page: [github repo's issues.](https://github.com/rstudio/shinyuieditor/issues).

More general comments can be sent via email (nick.strayer@rstudio.com) or for more public discourse, [twitter.](https://twitter.com/NicholasStrayer)

The things most useful for feedback at this stage are:

- Are there interaction patterns you kept wanting to do that were either unavailable or not intuitive? E.g., Wanting to delete an element with the delete key or by throwing the element off the screen.
- Did the app crash? If so
  - Was the crash reflected in errors in the R console?
  - if not, were there errors in the browser's javascript console? (Keyboard shortcut Ctrl-Shift-J on Windows, or Cmd-Option-J on Mac.)
- Do you have any ideas about how you could see yourself or others using the editor that are not currently supported?

## Getting help

If the UI is confusing, there's a tour mode that walks you through the various components of the Ui Editor. Simple click the button titled "Tour App" to enter the tour mode. Also check out the FAQs section (`vignette('faqs')`) and the "How To" article (`vignette('how-to')`).

## Overarching principle

We're trying hard to constrain the feature set so we have fewer but higher-quality features. Lots of the no-code UI builders expose so many options that, ultimately, they're more complex to use than just writing the code by hand. By generating code for the user, we're letting them flesh out those details by hand on top of a solid foundation instead of forcing them to do it in a (probably sub-optimal) visual paradigm.

> Complexity is anything related to the structure of a system that makes it hard to understand and modify that system

_- A Philosophy of Software Design, John Ousterhout_

## VSIX Install

You can alternatively download and install the extension from the command line as follows:

1.  Download the extension file from the repo: [shinyuieditor VS Code (VSIX)](https://github.com/rstudio/shinyuieditor/inst/vscode-extension)

2.  Install from the command line with: _(Note that the version number suffix may be different for you)_

    ```bash
    code --install-extension vscode-extension-0.0.1.vsix
    ```

Note that in order to use the `code` command to perform the installation you may need to open the VS Code Command Palette (Ctrl+Shift+P) and type "shell command" to execute the `Shell Command: Install 'code' command in PATH` command. This will make sure that `code` can be invoked from the command line on your system.
