#Import the dependencies.
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///database.sqlite")
#i need to find the way to create a sqlite file that connect with SQL database
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table "name of the table=database"
data_proyect = Base.classes.data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
#with this route, we open directly our html file
@app.route("/")
def index():
    return render_template("index.html")

#with this route, we load the data that we need to use to make the plot,maps, and tables.
@app.route("/api/v1.0/diseases")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list with the information of the state that we selected"""
    # Query all cities
   
    results = session.query(data_proyect.stateabbr,
                            data_proyect.placename,
                            data_proyect.arthritis_crudeprev,
                            data_proyect.bphigh_crudeprev,
                            data_proyect.cancer_crudeprev,
                            data_proyect.casthma_crudeprev,
                            data_proyect.csmoking_crudeprev,
                            data_proyect.diabetes_crudeprev,
                            data_proyect.obesity_crudeprev).all()

    session.close()
    #with this we store the data with the new style (name of the columns)
    data_base=[]
    #here we go fro every row extracting the information.
    for stateabbr,placename,arthritis,bphigh,cancer,asthma,smoking,diabetes,obesity in results:
        df={}
        df["State"]=stateabbr,
        df["City"]=placename,
        df["Arthritis"]=arthritis,
        df["BPHigh"]=bphigh,
        df["Cancer"]=cancer,
        df["Asthma"]=asthma,
        df["Smoking"]=smoking,
        df["Diabetes"]=diabetes,
        df["Obesity"]=obesity,
        data_base.append(df)

    # Convert list of tuples into normal list
    

    return jsonify(data_base)

if __name__ == '__main__':
    app.run(debug=True)