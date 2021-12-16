library(jsonlite)
app_dump <- '
{
  "layout": {
    "type": "gridlayout",
    "options": {
      "gapSize": "1rem",
      "areas": [
        [
          "title",
          "title"
        ],
        [
          "settings",
          "plot"
        ]
      ],
      "rowSizes": [
        "100px",
        "1fr"
      ],
      "colSizes": [
        "250px",
        "1fr"
      ]
    }
  },
  "elements": {
    "title": {
      "name": "titlePanel",
      "settings": {
        "title": "My App"
      }
    },
    "settings": {
      "name": "sliderInput",
      "settings": {
        "name": "My slider!",
        "min": 2,
        "max": 15,
        "val": 7
      }
    },
    "plot": {
      "name": "plotOutput",
      "settings": {
        "name": "My Plot!"
      }
    }
  }
}
'

parsed_dump <- jsonlite::parse_json(app_dump)
lobstr::tree(parsed_dump)

cat(to_gridlayout_ui(parsed_dump))

