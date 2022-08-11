# shinyuieditor (development)

### Major new features and improvements

### Minor new features and improvements

- Popups on hover over the elements panel now provide some context for the functionality of the element. (#74)

### Bug fixes

- Fixes bug where ui editor would not work on hosted services like RStudio Workbench (#73)

### Known bugs

# shinyuieditor 0.1.0

### Major new features and improvements

- Edits can now be made in either ui editor _or_ the in the code and the updates are now automatically synced (`fca63396948905055d6f42d05f87993bc3620c65`)
- New single-file starter templates (geyser and chick weights)
- The main container for placing items on grid is now `gridlayout::grid_card()`

### Minor new features and improvements

- Tract resizing is now much quicker and has less visual noise due to only showing small size-popups (`5e767eef9e62170f758d1aab87ba22464008cd7b`)
- Website updated with a bunch of new articles
- Added some explanatory text about the format of grid-names to the popup for naming newly added grid items (`ca625edb3c65c5a0da4ebebb5b9d04013c4e84e5`)
- The app preview window now no-longer shoes up at all if there's no preview connection. (`ae5d8113bd687bd7f7c2d540347bf3289bb57f49`)

### Bug fixes

- Theme argument is now supported in `gridlayout::grid_page()` (#51)
- Numeric inputs are now _usable_ in firefox (See "Known bugs" for more detail.)

### Known bugs

- Firefox inputs don't have increment buttons (#60)
- Arguments that a component knows about but are supplied a non-known argument type will simply get wiped away (#58)
- Can fail installing on windows using `pak` (#53)

# shinyuieditor 0.0.1.0

### Major new features and improvements

- Single-file apps are now supported (#41, #42)
- Rehauled the interface for updating the layout for `gridlayout::grid_page()`. Tracts can now be resized by dragging the divisions and the resizing controls hide when not in use to allow for more efficient use of space.
- Any code outside of the ui declaration is now preserved, along with `library()` calls (#38, #42)
- By default, namespaces are omitted from generated code in favor of placing `library()` calls at the top of the file (#42)

### Minor new features and improvements

- Refreshing the app preview now has animation to let the user know something actually happened (#34, #44)
- Arguments to functions that are not simple primative types are now preserved (#29, #37)
- If the browser window containing the editor is closed, the ui server now terminates, freeing the terminal (#27, #43)

### Bug fixes

- Leaving early from the editor no longer returns `NULL` to the console (#36, #45)
- Resizing grid panels to a smaller size now respects the grid tracts (#25, #46)
- Fixed accidental allowance of `gridlayout::grid_panel_plot()` being dropped into a `gridlayout::grid_panel_stack()` which could cause an invalid ui function state (#35, #49).

# shinyuieditor 0.0.0.9000

- Editor now works with Safari (#33)
