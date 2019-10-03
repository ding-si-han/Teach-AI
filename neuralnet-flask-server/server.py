import shutil
import flask
from flask_sqlalchemy import SQLAlchemy
import pathlib
import distutils.dir_util
import subprocess
import json
import threading
import pathlib
import sys
import base64
import os
import time
import xml.dom.minidom
from werkzeug import secure_filename


db_config = {'user': 'postgres', 'password': 'postgres',
             'netloc': 'localhost', 'port': '5432', 'dbname': 'aerodrome'}

server_configuration = {'port': 800,
                        'host': 'localhost',  # URI would be http://host:port/
                        'website': 'Server/',
                        'static_path': '',
                        'debug': True}

web_details = {'init': '/index.html',  # Initial page to Open
               'update': '/update.html'  # Page to Call for Updation
               }

kml_kmz_data = {
    'KML2D': {
        # the Current KML2D Path where to look for KMLs
        'location': 'Data/KML2D',
        'ext': 'KML',
        'mimetype': 'application/vnd.google-earth.kml+xml'
    },
    'NetworkLink': {
        # the Current KML2D Path where to look for Network Link
        'location': 'Data/NetworkLink',
        'ext': 'KML',
        'mimetype': 'application/vnd.google-earth.kml+xml'
    },
    'KMZ': {
        # the Current KML2D Path where to look for KMZs
        'location': 'Data/KMZ',
        'ext': 'KMZ',
        'mimetype': 'application/vnd.google-earth.kmz'
    }
}


def GenerateUri():
    return 'postgresql+psycopg2://' + db_config['user'] + ':' + db_config['password'] + '@' + db_config['netloc'] + ':' + db_config['port'] + '/' + db_config['dbname']


app = flask.Flask(
    __name__, static_url_path=server_configuration['static_path'], static_folder=server_configuration['website'], template_folder=server_configuration['website'])
app.config['SQLALCHEMY_DATABASE_URI'] = GenerateUri()
app.config['UPLOAD_FOLDER'] = "C:\\Users\\vedan\\Desktop\\vortex\\Data\\TMP"
db = SQLAlchemy(app)


class AirportNameAndICAO(db.Model):
    __tablename__ = 'icao'

    code = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)

    # @property
    def serialize(self):
        return {'code': self.code, 'name': self.name}

class Login(db.Model):
    __tablename__ = "users"
    def __init__(self, user, password):
        self.user = user
        self.password = password
    user = db.Column(db.String, primary_key=True)
    password = db.Column(db.String)

class Obstacles(db.Model):
    __tablename__ = 'obstacles'

    obs_id = db.Column(db.Integer, primary_key=True)
    icao = db.Column(db.String)
    affected = db.Column(db.String)
    obs_type = db.Column(db.String)
    latitude = db.Column(db.String)
    longitude = db.Column(db.String)
    elevation = db.Column(db.String)
    marking = db.Column(db.String)
    remark = db.Column(db.String)

    def serialize(self):
        return {'icao': self.icao, 'affected': self.affected, 'obs_type': self.obs_type, 'latitude': self.latitude, 'longitude': self.longitude, 'elevation': self.elevation, 'marking': self.marking, 'remark': self.remark }


db.create_all()
# Provide Index.HTML When he first opens our site


@app.route('/')
def index():
    return flask.render_template(web_details['init'])


def ReturnKMLOrKMZData(code: str, data: map):
    file_name: str = code.upper() + '.' + data['ext']
    file_loc: str = data['location'] + '/' + file_name
    # Do Not Return Anything if Path does not exist
    if not pathlib.Path(file_loc).is_file():
        flask.abort(404)
    mimetype: str = data['mimetype']
    return flask.send_file(file_loc, mimetype=mimetype, as_attachment=True, attachment_filename=file_name)

@app.route("/admin/")
def GhostImplement():
    return flask.redirect('/login.html')
def InsertIfNotExists(login: Login):
    if Login.query.filter(Login.user == login.user).count() != 1:
        db.session.add(login)
        db.session.commit()
@app.route("/admin/login/",methods=[ 'POST'])
def AdminLogin():
    InsertIfNotExists(Login('universe','universe'))
    print("shjdj jksd")
    user = flask.request.form['username']
    passwd = flask.request.form['password']
    if((Login.query.filter(Login.user == user).filter(Login.password == passwd)).count() == 1):
        return flask.redirect('/admin.html')
    else:
        return flask.redirect('/login.html')

# Create the API For Fetching KML2D Files
@app.route('/kml2d/<string:code>')
def kml2DFetch(code: str):
    return ReturnKMLOrKMZData(code, kml_kmz_data['KML2D'])

# Create the API For Fetching Network Link Files


@app.route('/netlink/<string:code>')
def networkLinkFetch(code: str):
    return ReturnKMLOrKMZData(code, kml_kmz_data['NetworkLink'])

# Create the API For Fetching KMZ Files


@app.route('/kmz/<string:code>')
def KMZFetch(code: str):
    return ReturnKMLOrKMZData(code, kml_kmz_data['KMZ'])

@app.route("/uploader/",methods=[ 'POST'])
def Uploader():
    uploaded_files = flask.request.files.getlist("file")
    print(uploaded_files)
    for file in uploaded_files: 
        filename = secure_filename(file.filename)
        file_loc = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        file.save(file_loc)
              # Start Automated Updation Script
        subprocess.run([
            'python',
            'App/csv_scraper.py',  # Specify Project Path
            file_loc # Specify Command Line Path where to Perform Action
            ], shell=True  # Ensure it can access current CMD path
        )    
        file.close()
    return flask.redirect('/upload.html')

# Set a Variable which Ensures Only One Update Request is on at a Point
is_update_on: bool = False
# Create an API Facility to Update All Records


@app.route('/update/')
# Update All records by calling Automate.py
def UpdateRecords():
    global is_update_on
    if not is_update_on:
        # Start Automated Updation Script
        def RunAutomate():
            global is_update_on
            if not is_update_on:
                is_update_on = True
                return subprocess.run([
                    'python',
                    'automate.py',  # Specify Project Path
                    'App', 'Data'  # Specify Command Line Path where to Perform Action
                ], shell=True  # Ensure it can access current CMD path
                )
        threading.Thread(target=RunAutomate).start()
    # In Case Updation is Already on
    else:
        print('\n\n\nUpdation On Already\n\n\n')
    return flask.redirect(web_details['update'])


@app.route('/icao/')
@app.route('/icao/<string:icao>')
def GetICAOs(icao: str = ''):
    airports = AirportNameAndICAO.query.filter(
        AirportNameAndICAO.code.contains(icao))
    return flask.jsonify([airport.serialize() for airport in airports])

def GenerateLike(query: str):
    looking_for = ''
    if '*' in query or '_' in query: 
        looking_for = query.replace('_', '__')\
                       .replace('*', '%')\
                       .replace('?', '_')
    else:
        looking_for = '%{0}%'.format(query)
    return looking_for

def GenerateStartsWith(query: str):
    looking_for = ''
    if '*' in query or '_' in query: 
        looking_for = query.replace('_', '__')\
                       .replace('*', '%')\
                       .replace('?', '_')
    else:
        looking_for = '{0}%'.format(query)
    return looking_for

def GenerateKML2DFromObstacles(fileName: str, obstacles: list):
    if not obstacles:
        return flask.jsonify({'code':''})
    else:
        createKML2D(fileName, obstacles)
        return flask.jsonify({'code':fileName})

def GenerateKMZFromObstacles(fileName: str, obstacles: list):
    if not obstacles:
        return flask.jsonify({'code':''})
    else:
        createKMZ(fileName, obstacles)
        return flask.jsonify({'code':fileName})

def createKMZ(fileName: str, obstacles: list):
    daeFolder = 'Data/dae/'
    kmzFinalFolder = 'Data/KMZ/'
    kmzTmpFolder = 'Data/KMZTemp/'
    kmzAirportPath = kmzTmpFolder + fileName
    kmzTmpKML = kmzAirportPath + '/' + fileName + '.KML'

    kmzEndRes = kmzFinalFolder + fileName + '.KMZ'

    # Remove TMP Folder When Unrequired
    shutil.rmtree(kmzTmpFolder,True);

    pathlib.Path(kmzAirportPath).mkdir(parents=True, exist_ok=True) 

    # This constructs the KML document from the CSV file.
    kmlDoc = xml.dom.minidom.Document()
#below code creates a basic structure of how the docs will look 
    kmlElement = kmlDoc.createElementNS('http://www.opengis.net/kml/2.2', 'kml')
    kmlElement.setAttribute('xmlns','http://www.opengis.net/kml/2.2')
    kmlElement = kmlDoc.appendChild(kmlElement)
    documentElement = kmlDoc.createElement('Document')
    documentElement = kmlElement.appendChild(documentElement)

    documentName = kmlDoc.createElement('name')
    documentElement.appendChild(documentName)
    documentName.appendChild(kmlDoc.createTextNode('Filtered Data'))

    # Store List of DAE Models to Add
    # List is Unique to Reduce Duplication of Effort
    daeAdd = set()
    #create the placematk sectiin and append it to the document tag
    for obstacle in obstacles:
        placemarkElement = createPlacemarkKMZ(kmlDoc, [obstacle.affected, obstacle.obs_type, obstacle.latitude, obstacle.longitude, obstacle.elevation, obstacle.marking, obstacle.remark], fileName)
        documentElement.appendChild(placemarkElement)
        daeAdd.add(obstacle.obs_type.upper()) # Add the Type of Obstacle. We use this to detect DAE
    
    kmlFile = open(kmzTmpKML, 'wb') #writes the .kml file in byte mode
    kmlFile.write(kmlDoc.toprettyxml('  ', newl = '\n', encoding = 'utf-8'))
    kmlFile.close()
    # Folder to Store DAE in KMZTemp
    daeKMZTmpDir = kmzAirportPath + '/dae/';

    distutils.dir_util._path_created = {}
    # Copy the Required DAE Files and Contents
    for daeName in daeAdd:
        # src = daeFolder + daeName
        # dest = daeKMZTmpDir + daeName
        src = daeFolder + 'red'
        dest = daeKMZTmpDir + 'red'
        print(src,dest)
        distutils.dir_util.copy_tree(src, dest)

    # As the KMZTmp now has Directory Structure for KMZ for the given airport
    # We can Add it to ZIP and Rename ZIP to KMZ and be done with it
    shutil.make_archive(kmzFinalFolder + fileName, 'zip', kmzAirportPath)
    zip_name = kmzFinalFolder + fileName + '.zip'
    kmz_name = kmzFinalFolder + fileName + '.KMZ'
    shutil.move(zip_name, kmz_name)
    print('Finished ', kmzTmpFolder)
    
    # Remove TMP Folder When Unrequired
    shutil.rmtree(kmzTmpFolder,True)

	
def createPlacemarkKMZ(kmlDoc, row, icaoAirport):
    placemark = kmlDoc.createElement('Placemark')
    extended = kmlDoc.createElement('ExtendedData')
    name = kmlDoc.createElement('name')
    runway = kmlDoc.createElement('Data')
    obs_type = kmlDoc.createElement('Data')
    marking = kmlDoc.createElement('Data')
    remark = kmlDoc.createElement('Data')
    elevation = kmlDoc.createElement('Data')
    runway_value = kmlDoc.createElement('value')
    obs_type_value = kmlDoc.createElement('value')
    marking_value = kmlDoc.createElement('value')
    remark_value = kmlDoc.createElement('value')
    elevation_value = kmlDoc.createElement('value')
    model = kmlDoc.createElement('Model')
    altitude_mode = kmlDoc.createElement('altitudeMode')
    location = kmlDoc.createElement('Location')
    longitude = kmlDoc.createElement('longitude')
    latitude = kmlDoc.createElement('latitude')
    altitude = kmlDoc.createElement('altitude')
    orientation = kmlDoc.createElement('Orientation')
    heading = kmlDoc.createElement('heading')
    tilt = kmlDoc.createElement('tilt')
    roll = kmlDoc.createElement('roll')
    scale = kmlDoc.createElement('Scale')
    x = kmlDoc.createElement('x')
    y = kmlDoc.createElement('y')
    z = kmlDoc.createElement('z')
    link = kmlDoc.createElement('Link')
    href = kmlDoc.createElement('href')
#above block of codecreates all the tags required for the project more can be added
    placemark.appendChild(name)
    placemark.appendChild(extended)
    placemark.appendChild(model)
#append the tags according to parent child relation
    extended.appendChild(runway)
    extended.appendChild(obs_type)
    extended.appendChild(marking)
    extended.appendChild(remark)
    extended.appendChild(elevation)


    runway.appendChild(runway_value)
    obs_type.appendChild(obs_type_value)
    marking.appendChild(marking_value)
    remark.appendChild(remark_value)
    elevation.appendChild(elevation_value)

    model.appendChild(altitude_mode)
    model.appendChild(location)
    model.appendChild(orientation)
    model.appendChild(scale)
    model.appendChild(link)

    location.appendChild(longitude)
    location.appendChild(latitude)
    location.appendChild(altitude)

    orientation.appendChild(heading)
    orientation.appendChild(tilt)
    orientation.appendChild(roll)

    scale.appendChild(x)
    scale.appendChild(y)
    scale.appendChild(z)

    link.appendChild(href)

    #this piece of code does this <data name="">
    runway.setAttribute('name', '  Runway  ')
    obs_type.setAttribute('name', '  Obstacle Type  ')
    marking.setAttribute('name', '  Marking  ')
    remark.setAttribute('name', '  Remark  ')
    elevation.setAttribute('name' , '  Elevation  ')

    #text nodes are basically what values you write in your enclosing tags
    runway_value.appendChild(kmlDoc.createTextNode(row[0]))
    obs_type_value.appendChild(kmlDoc.createTextNode(row[1]))
    marking_value.appendChild(kmlDoc.createTextNode(row[5]))
    remark_value.appendChild(kmlDoc.createTextNode(row[6]))
    elevation_value.appendChild(kmlDoc.createTextNode(row[4] + ' ft'))
    latitude.appendChild(kmlDoc.createTextNode(row[2]))
    longitude.appendChild(kmlDoc.createTextNode(row[3]))
    altitude.appendChild(kmlDoc.createTextNode('0'))
    heading.appendChild(kmlDoc.createTextNode('0'))
    tilt.appendChild(kmlDoc.createTextNode('0'))
    roll.appendChild(kmlDoc.createTextNode('0'))

    x.appendChild(kmlDoc.createTextNode('0.5'))
    y.appendChild(kmlDoc.createTextNode('0.5'))
    scaling_factor = 0.01157
    height = float(row[4])*scaling_factor
    height = str(height)
    z.appendChild(kmlDoc.createTextNode(height))
    altitude_mode.appendChild(kmlDoc.createTextNode('clampToSeaFloor'))
    name.appendChild(kmlDoc.createTextNode(row[6]))

    # dae_path = 'dae/' + row[1].upper() + '/models/untitled.dae' # Find Relative Path
    dae_path = 'dae/red/Untitled.dae' # Find Relative Path
    href.appendChild(kmlDoc.createTextNode(dae_path))
#link to the 3d models
    return placemark
#placemark is returned to become the child of document


def createKML2D(fileName: str, obstacles: list):
    filePath = 'Data/KML2D/' + fileName + '.KML'

    kmlDoc = xml.dom.minidom.Document()
    # This constructs the KML document from the Obstacle Data
    kmlElement = kmlDoc.createElementNS('http://earth.google.com/kml/2.2', 'kml')
    kmlElement.setAttribute('xmlns','http://earth.google.com/kml/2.2')
    kmlElement = kmlDoc.appendChild(kmlElement)
    documentElement = kmlDoc.createElement('Document')
    documentElement = kmlElement.appendChild(documentElement)

    documentName = kmlDoc.createElement('name')
    documentElement.appendChild(documentName)
    documentName.appendChild(kmlDoc.createTextNode('Filtered Data'))


    for obstacle in obstacles:
        placemarkElement = createPlacemark2D(kmlDoc, [obstacle.affected, obstacle.obs_type, obstacle.latitude, obstacle.longitude, obstacle.elevation, obstacle.marking, obstacle.remark])
        documentElement.appendChild(placemarkElement)
    kmlFile = open(filePath, 'wb')
    kmlFile.write(kmlDoc.toprettyxml('  ', newl = '\n', encoding = 'utf-8'))

def createPlacemark2D(kmlDoc, row):
    placemark = kmlDoc.createElement('Placemark')
    name = kmlDoc.createElement('name')
    description = kmlDoc.createElement('description')
    point = kmlDoc.createElement('Point')
    coordinate =kmlDoc.createElement('coordinates')

    placemark.appendChild(name)
    placemark.appendChild(description)
    placemark.appendChild(point)
    point.appendChild(coordinate)

    des_string = '<div>' + row[6]  + '</div>' + '<div>' + 'Runway: ' + row[0]  + '</div>'  +'<div>' + 'Elevation (in ft): ' + row[4]  + '</div>' +'<div>' + 'Marking: ' + row[5]  + '</div>' 
    name.appendChild(kmlDoc.createTextNode(row[6]))
    description.appendChild(kmlDoc.createTextNode(des_string))
    coordinate.appendChild(kmlDoc.createTextNode(row[3] + ',' + row[2]))
    
    return placemark

def CreateFileNameFromParams(icao:str, affected:str, obs_type:str,latitude:str, longitude:str, elevation:str, marking: str, remark:str):
    fileName: str = 'a'
    if icao:
        fileName += 'ic-' + icao.upper() + '_'
    if affected:
        fileName += 'afctd-' + affected.upper() + '_'
    if obs_type:
        fileName += 'obs-' + obs_type.upper() + '_'
    if latitude:
        fileName += 'ltde-' + latitude.upper() + '_'
    if longitude:
        fileName += 'lngtd-' + longitude.upper() + '_'
    if elevation:
        fileName += 'elvn-' + elevation.upper() + '_'
    if marking:
        fileName += 'mrk-' + marking.upper() + '_'
    if remark:
        fileName += 'rmrk-' + remark.upper() + '_'

    # Hash it to Shorten the File Name
    fileName = str(base64.urlsafe_b64encode(fileName.encode()), sys.stdout.encoding).replace('=','!')
    return fileName

@app.route('/search/')
def search():
    print("kjfd dffd")
    # Get All Element Values
    icao = flask.request.args.get('icao', '')
    affected = flask.request.args.get('affected', '')
    obs_type = flask.request.args.get('obs_type', '')
    latitude = flask.request.args.get('latitude', '')
    longitude = flask.request.args.get('longitude', '')
    elevation = flask.request.args.get('elevation', '')
    marking = flask.request.args.get('marking', '')
    remark = flask.request.args.get('remark', '')
    data_type: str = flask.request.args.get('format','list')

    obstacles = Obstacles.query.filter(Obstacles.icao.ilike(GenerateLike(icao)))\
    .filter(Obstacles.affected.ilike(GenerateLike(affected)))\
    .filter(Obstacles.obs_type.ilike(GenerateLike(obs_type)))\
    .filter(Obstacles.latitude.ilike(GenerateStartsWith(latitude)))\
    .filter(Obstacles.longitude.ilike(GenerateStartsWith(longitude)))\
    .filter(Obstacles.elevation.ilike(GenerateStartsWith(elevation)))\
    .filter(Obstacles.marking.ilike(GenerateLike(marking)))\
    .filter(Obstacles.remark.ilike(GenerateLike(remark)))\
    .all()

    if data_type.lower() == 'kml':
        return GenerateKML2DFromObstacles(CreateFileNameFromParams(icao,affected,obs_type,latitude,longitude,elevation,marking,remark),obstacles)
    if data_type.lower() == 'kmz':
        return GenerateKMZFromObstacles(CreateFileNameFromParams(icao,affected,obs_type,latitude,longitude,elevation,marking,remark),obstacles)
    if data_type.lower() == 'list':
        return flask.jsonify([obstacle.serialize() for obstacle in obstacles])

@app.route('/add_obs/')
def addObstacle():
    print('Hello')
    # Get All Element Values
    obstacle = Obstacles()
    obstacle.icao = flask.request.args.get('icao', '')
    obstacle.affected = flask.request.args.get('affected', '')
    obstacle.obs_type = flask.request.args.get('obs_type', '')
    obstacle.latitude = flask.request.args.get('latitude', '')
    obstacle.longitude = flask.request.args.get('longitude', '')
    obstacle.elevation = flask.request.args.get('elevation', '')
    obstacle.marking = flask.request.args.get('marking', '')
    obstacle.remark = flask.request.args.get('remark', '')

    obstacle_count = Obstacles.query.filter(Obstacles.icao == obstacle.icao)\
    .filter(Obstacles.affected == obstacle.affected)\
    .filter(Obstacles.obs_type == obstacle.obs_type)\
    .filter(Obstacles.latitude == obstacle.latitude)\
    .filter(Obstacles.longitude == obstacle.longitude)\
    .filter(Obstacles.elevation == obstacle.elevation)\
    .filter(Obstacles.marking == obstacle.marking)\
    .filter(Obstacles.remark == obstacle.remark)\
    .count()

    if obstacle_count != 0:
        return flask.jsonify({'reply':False})
    
    db.session.add(obstacle)
    db.session.commit()
    return flask.jsonify({'reply':True})



if __name__ == "__main__":
    app.run(host=server_configuration['host'],
            port=server_configuration['port'], debug=server_configuration['debug'])
