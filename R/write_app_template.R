

write_app_template <- function(app_template, loc) {
  # Function takes an app template argument and creates the app template in the
  # requested location App template args include the following.

#
#  uiTree: ui AST node;
#  outputType: "single-file" | "multi-file"
#  otherCode: {
#     /**
#      * Extra code that will be coppied unchanged above the ui definition
#      */
#     uiExtra?: string;
#     /**
#      * Extra code that will be copied unchanged above server funtion definition
#      */
#     serverExtra?: string;
#     /**
#      * Body of server function. This will be wrapped in the code
#      * `function(input, output){....}`
#      */
#     serverFunctionBody?: string;
#   };
#

browser()
print(paste("Request to write app template to", loc))

# Single-file mode will build with

# libraries(...)
#
# <UiExtraCode>
# 
# ui <- <Deparsed ui tree>
#
# <ServerExtraCode>
# 
# server <- function(input, output) {
#   <ServerFunctionBody>
# }



}
