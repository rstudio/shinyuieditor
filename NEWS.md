# shinyuieditor 0.0.1.0

### Major new features and improvements

- Single-file apps are now supported (#41, #42)
- Any code outside of the ui declaration is now preserved, along with `library()` calls (#38, #42)
- By default, namespaces are omitted from generated code in favor of placing `library()` calls at the top of the file (#42)

### Minor new features and improvements

- Refreshing the app preview now has animation to let the user know something actually happened (#34, #44)
- Arguments to functions that are not simple primative types are now preserved (#29, #37)
- If the browser window containing the editor is closed, the ui server now terminates, freeing the terminal (#27, #43)

### Bug fixes

- Leaving early from the editor no longer returns `NULL` to the console (#36, #45)
- Resizing grid panels to a smaller size now respects the grid tracts (#25, #46)

# shinyuieditor 0.0.0.9000

- Editor now works with Safari (#33)
