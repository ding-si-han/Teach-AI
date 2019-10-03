import face_recognition
import cv2
import csv
import numpy as np
from datetime import datetime

# Write the header of the columsn of the csv fiule
row = ['name', ' left', ' top', 'timestamp', 'numPerson', 'personId']
# with open('people.csv', 'r') as readFile:
#     reader = csv.reader(readFile)
#     lines = list(reader)
#     lines[1] = row
# with open('people.csv', 'w') as writeFile:
#     writer = csv.writer(writeFile)
#     writer.writerows(row)
# # readFile.close()
# writeFile.close()

# row = ["face_names", "left", top, timestamp]
with open('./oneShotLearning.csv', 'w') as csvFile:
    writer = csv.writer(csvFile)
    writer.writerow(row)
csvFile.close()

# Initialise cam, window name, img_counter and users
cam = cv2.VideoCapture(1)
cv2.namedWindow("test")
img_counter = 1
userInput = [" Hello to:", " "]
showImage = False

screenWidth = 1200
screenHeight = 700
hasFrameDetector = False



def __draw_label(img, text, pos, bg_color):
    font_face = cv2.FONT_HERSHEY_SIMPLEX
    scale = 1.3
    color = (0, 0, 255)
    thickness = cv2.FILLED *2
    margin = 2

    txt_size = cv2.getTextSize(text, font_face, scale, thickness)
    # end_x = pos[0] + txt_size[0][0] + margin
    # end_y = pos[1] - txt_size[0][1] - margin
    # cv2.rectangle(img, pos, (end_x, end_y), bg_color, thickness)
    cv2.putText(img, text, pos, font_face, scale, color, 1, cv2.LINE_AA)


# This is a demo of running face recognition on live video from your webcam. It's a little more complicated than the
# other example, but it includes some basic performance tweaks to make things run a lot faster:
#   1. Process each video frame at 1/4 resolution (though still display it at full resolution)
#   2. Only detect faces in every other frame of video.

# PLEASE NOTE: This example requires OpenCV (the `cv2` library) to be installed only to read from your webcam.
# OpenCV is *not* required to use the face_recognition library. It's only required if you want to run this
# specific demo. If you have trouble installing it, try any of the other demos that don't require it instead.

# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

# # Load a sample picture and learn how to recognize it.
# sihan_image = face_recognition.load_image_file("si_han.jpg")
# sihan_face_encoding = face_recognition.face_encodings(sihan_image)[0]

# # Load a second sample picture and learn how to recognize it.
# gabriel_image = face_recognition.load_image_file("gabriel3.jpg")
# gabriel_face_encoding = face_recognition.face_encodings(gabriel_image)[0]

# Load a second sample picture and learn how to recognize it.
kanye_image = face_recognition.load_image_file("kanye.jpg")
kanye_face_encoding = face_recognition.face_encodings(kanye_image)[0]

# Create arrays of known face encodings and their names
known_face_encodings = [
    
    # gabriel_face_encoding,
    kanye_face_encoding
]
known_face_names = [
    
    # "Gabriel",
    "Kanye"
    
]

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()

    # Resize frame of video to 1/4 size for faster face recognition processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_small_frame = small_frame[:, :, ::-1]

    # Only process every other frame of video to save time
    if process_this_frame and hasFrameDetector:
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame, number_of_times_to_upsample=1)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            # # If a match was found in known_face_encodings, just use the first one.
            # if True in matches:
            #     first_match_index = matches.index(True)
            #     name = known_face_names[first_match_index]

            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]

            face_names.append(name)

    process_this_frame = not process_this_frame


    # Display the results
    if hasFrameDetector:
        count = 0
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
            print("left is", left )
            print("top is ", top)

            timestamp =  datetime.now().second + datetime.now().minute * 60 + datetime.now().hour * 60 * 60
            row = [face_names[count], left, top, timestamp, len(face_names), count]
            with open('./oneShotLearning.csv', 'a') as csvFile:
                writer = csv.writer(csvFile)
                writer.writerow(row)
            csvFile.close()
            count += 1


    # Hit 'q' on the keyboard to quit!
    k = cv2.waitKey(1)
    # if k & 0xFF == ord('q'):
    #     break


    img = cv2.imread("placeholderSmiley.png", 1)
    part=img[0:screenHeight,0:screenWidth]
    # img = np.array(i, dtype=np.float)
    # img /= 255.0
    # a_channel = np.ones(img.shape, dtype=np.float)/5.0
    # image = img*a_channel


    # NAME RECORDING SECTION
    if ret == True:
        # draw the label into the frame
        userInputLen = len(userInput)
        # print("drawing")
        for i in range(userInputLen):
            __draw_label(frame, userInput[i], (20,50+ 40*i), (255,0,0))
            # print("drawing " + userInput[i])
    
    
    for i in range(97,123):
        if k == i:
            if userInput[-1][-1] == ' ':
                userInput[-1] += chr(i-32)
                # print("Uppercase")
            else:
                userInput[-1] += chr(i)
                # print("Lowercase")

    if k%256 == 32:
        userInput[-1] += ' '

    # if k%256 == 27:
    #     # ESC pressed
    #     print("Escape hit, closing...")
    #     break
    elif k%256 == 13:
        # ENTER pressed
        img_name = "{}.jpg".format(userInput[-1][1:])
        img_path = "./images/" + img_name
        cv2.imwrite(img_path, frame) 
        print("{} written!".format(img_name))
        img_counter += 1
        image = face_recognition.load_image_file(img_path)
        known_face_encodings.append(face_recognition.face_encodings(image)[0])
        known_face_names.append(img_name[:-4])

        userInput.append(" ")

    if k%256 == 27:
        showImage = not showImage
        print("show Image is now " + str(showImage))
    
    if k == 61:
        hasFrameDetector = not hasFrameDetector

    if showImage:
        print("showing image")
        frame2=frame[0:screenHeight,0:screenWidth]
        frame=cv2.addWeighted(part,0.3,frame2,0.7,0)
    # Display the resulting image
    cv2.imshow('Video', frame)


# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()