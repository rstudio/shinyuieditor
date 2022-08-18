# Shiny UI Editor

A visual tool for building the UI portion of a Shiny application that generates clean and human-readable code.

The goal of the Shiny Ui Editor is to allow people to build the broad-level UI for their Shiny app without writing code. The editor is intended for those who may not be comfortable with the HTML-style code of Shiny's UI functions or who simply don't want to fiddle with sizes to get things laid out correctly.

## ⚠️ `shinyuieditor` is currently in Alpha.

It may be unstable, and the API may change. We're excited to hear your feedback, but please don't use it for production applications just yet!

## Installing

While in development the package is only available on github:

```r
install.packages("remotes")

# Install using the remotes package
remotes::install_github("rstudio/shinyuieditor")
```

🚨 _Installation fail? See the [Trouble installing section.](#trouble-installing)_

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

## Trouble installing

Because the package uses a remote dependency (`gridlayout`) installation can sometimes fail in confusing ways.

### HTTP error 404, Not Found

```
> remotes::install_github('rstudio/shinyuieditor')
Error: Failed to install 'shinyuieditor' from GitHub:
  HTTP error 404.
  Not Found

  Did you spell the repo owner (`rstudio`) and repo name (`shinyuieditor`) correctly?
  - If spelling is correct, check that you have the required permissions to access the repo.
```

You may need to setup your github PAT to access. To set this up run `usethis::create_github_token()` in the terminal and follow the prompts.

**Using remotes?**

`usethis::create_github_token()` no longer puts your PAT in an environment variable, however that's the method `remotes` uses for authentication. You can get around this by using the `withr` package to temporarily set the environment variable.

```r
withr::with_envvar(
  list( GITHUB_PAT = gitcreds::gitcreds_get()$password ),
  remotes::install_github('rstudio/shinyuieditor')
)
```

### Subscript out of bounds

```
> pak::pkg_install('rstudio/shinyuieditor')
Error: subscript out of bounds
Type .Last.error.trace to see where the error occurred
```

This occurs for some reason when trying to reinstall or update the package using `pak`. The easiest solution is to either use `remotes` (see above), or to uninstall both `shinyuieditor` and `gridlayout` and then reinstall.

```r
remove.packages(c('shinyuieditor', 'gridlayout'))
# now works
pak::pkg_install("rstudio/shinyuieditor")
```

## Overarching principle

We're trying hard to constrain the feature set so we have fewer but higher-quality features. Lots of the no-code UI builders expose so many options that, ultimately, they're more complex to use than just writing the code by hand. By generating code for the user, we're letting them flesh out those details by hand on top of a solid foundation instead of forcing them to do it in a (probably sub-optimal) visual paradigm.

> Complexity is anything related to the structure of a system that makes it hard to understand and modify that system

_- A Philosophy of Software Design, John Ousterhout_
