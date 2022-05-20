# Shiny UI Editor

A GUI for laying out a Shiny application that generates clean and human-readable UI code.

**Extended goal**
The overarching goal of the Shiny Ui Editor is to be a way for people to build the broad-level UI for their Shiny app without writing code. The people the editor is indented for are those who may not be comfortable with the HTML style of Shiny's UI functions or who simply don't want to fiddle with sizes to get things laid out correctly.

The goal is not to handle every possible use case. Instead, we're trying hard to constrain the feature set as lots of the no-code UI builder experiences expose so many options that, ultimately, they're more complex to use than just writing the code by hand. By generating code for the user, we're letting them flesh out those details by hand on top of a solid foundation instead of forcing them to do it in a (probably sub-optimal) visual paradigm.

## Feedback

Any thoughts or comments you have on the editor can come via email (nick.strayer@rstudio.com), the [github repo's issues.](https://github.com/rstudio/shinyuieditor/issues), or the RStudio slack channel `#shiny-ui-editor`.

The things most useful for feedback at this stage are:

- Are there interaction patterns you kept wanting to do that were either unavailable or not intuitive? E.g., Wanting to delete an element with the delete key or by throwing the element off the screen.
- Did the app crash? If so
  - Was the crash reflected in errors in the R console?
  - if not, were there errors in the browser's javascript console? (Keyboard shortcut Ctrl-Shift-J on Windows, or Cmd-Option-J on Mac.)
- Do you have any ideas about how you could see yourself or others using the editor that are not currently supported?

ℹ️ _The editor currently is only tested in Chrome, but Safari support is coming shortly._

## Quick Start

[Video walkthrough of using ui editor to create and edit a new app](https://youtu.be/2Z0NfNLEJJQ).

A few notes on the video:

- It is public but unlisted, so please don't share the link.
- The UI and features of the app are continuously evolving and the video will updated periodically but if you notice something is egregiously/ confusingly out of date, don't hestiate to reach out and I will update it ASAP.

### Pre-reqs

- Two-file shiny app (or at least willingness to use the two-file format)

### Installing

While in development the package is only available on github:

```r
install.packages("pak")
pak::pkg_install("rstudio/shinyuieditor")

# Alternatively, using the remotes package
remotes::install_github("rstudio/shinyuieditor")
```

ℹ️ _You may need to setup your github PAT to access as the repo is still private. However, if you're reading this, you have access. To set this up run `usethis::create_github_token()` in the terminal and follow the prompts._

### Running

#### New app

If you set the argument `app_loc` to a location that does not yet exist, the launcher will ask a few and setup a simple template app for you to use with building.

```r
shinyuieditor::launch_editor(app_loc = "new-app/")

#> No app was found at location /Users/me/new_app.
#> Would you like to start a new app from a template?
#> 1: yes
#> 2: no
#>
#> Selection: 1
#> Which starter template would you like to use? (Sorry, it's an easy choice currently.)
#> 1: geyser
#>
#> Selection: 1
#> => Starting Shiny preview app...
#> ...
```

_In the future more starting templates will be offered, however, currently only a simple grid-layout recreation of the classic "Geyser" app is available._

#### Existing app

Assuming theres an existing `ui.R` and `server.R` in the folder `existing-app/` relative to your current working directly (`getwd()`), then you start the ui-editor on that app by running the following code and pasting the returned link into your web-browser.

```r
shinyuieditor::launch_editor(app_loc = "existing-app/")
#> Live editor running at http://localhost:44509/app
```

---

### Using

Once you're in the editor, any changes you make will automatically be written to your app's UI and the changes can be seen in real-time with the "App Preview" window.

### Finishing

When you're done, simply close the browswer window and stop the editor preview process in R. Since all changes are eagerly applied there's no need to save.

## Getting help

If the UI is confusing, there's a tour mode that walks you through the various components of the Ui Editor. Simple click the button titled "Tour App" to enter the tour mode.

# Stack

- React
- Create React App for project setup
- Redux for state management

# Development Design Dogma

The following are a series of design practices that the code of this application strives to follow in the name of maintainable and efficient code. Don't hesitate to break these, just think strongly about _why_ when doing so.

## Overarching principle

> Complexity is anything related to the structure of a system that makes it hard to understand and modify that system

_- A Philosophy of Software Design, John Ousterhout_
