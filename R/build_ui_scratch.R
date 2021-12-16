library(jsonlite)
app_dump <- '
{
  "layout": {
    "type": "gridlayout",
    "options": {
      "gapSize": "1rem",
      "areas": [
        [   "title",  "title"],
        ["settings",   "plot"],
        [  "footer", "footer"]
      ],
      "rowSizes": [
        "100px",
        "1fr",
        "80px"
      ],
      "colSizes": [
        "250px",
        "1fr"
      ]
    }
  },
  "elements": {
    "title": {
      "uiName": "titlePanel",
      "uiArguments": {
        "title": "My App"
      }
    },
    "settings": {
      "uiName": "sliderInput",
      "uiArguments": {
        "name": "My slider!",
        "min": 5,
        "max": 10,
        "val": 7
      }
    },
    "plot": {
      "uiName": "plotOutput",
      "uiArguments": {
        "name": "My Plot!"
      }
    }
  }
}
'

parsed_dump <- jsonlite::parse_json(app_dump)
lobstr::tree(parsed_dump)

cat(to_gridlayout_ui(parsed_dump))

