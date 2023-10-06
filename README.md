# Project_3_CDCdata
This group is made up for:
Alyssa Gomez
Patrick Nartey
Johnny Ramirez
Nathan Hyde
Sebastian Tagle

Data Source
---------------------------
The focus of this project is to uncover pattern of disease incidences in certain locations within 3 states of the United States (California, Texas, New York). Some of the disease incidences that we investigated are Arthritis, cancer, obesity, smoking, asthma, high blood pressure, and diabetes. The rationale behind the choice of states is based upon population size and location in the Country. California from the west, Texas from the central and New York from the east.

So, to do this we pulled our data from the CDC website, and the data was filtered according to the aim of the project. The dataset contains 177 unique observations.

Clean, Transfor and Store the data
----------------------------
Our dataset was already cleaned, we only filtered the variables of interest for the project. Three major US cities namely California, Texas, and New were selected.
The final dataset contains a total of 177 observations and 11 variables. we store the data in SQL database (you can see the picture)

Python Flask API
----------------------------
The project was powered by using SQLlite, the data was stored in a data base and was accessed by using a Python flask API ("Flask_API_SQL.py"). The route to the database was built into the javascript which powered the project and data visualizations.

JavaScript
----------------------------
in the file "prueba.js", you can find the functions that we create and use to plot every bar graph, bubble graph. To plot the map of USA with state, we use the JS Library of Google Chart.

Html
----------------------------
Finally, in the html file, we have the index where you can find the div and class for every graph, title, table, etc.
