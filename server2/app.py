from flask import Flask, render_template, Response
import cv2
import numpy as np
import tensorflow.keras
import mediapipe as mp
import math
import os
import threading
from tensorflow.keras.models import Model
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input, Flatten, Bidirectional, Permute, multiply


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
def attention_block(inputs, time_steps):
    a = Permute((2, 1))(inputs)
    a = Dense(time_steps, activation='softmax')(a)
    a_probs = Permute((2, 1), name='attention_vec')(a)
    output_attention_mul = multiply([inputs, a_probs], name='attention_mul') 
    return output_attention_mul

def build_model(HIDDEN_UNITS=256, sequence_length=30, num_input_values=33*4, num_classes=3):
    inputs = Input(shape=(sequence_length, num_input_values))
    lstm_out = Bidirectional(LSTM(HIDDEN_UNITS, return_sequences=True))(inputs)
    attention_mul = attention_block(lstm_out, sequence_length)
    attention_mul = Flatten()(attention_mul)
    x = Dense(2*HIDDEN_UNITS, activation='relu')(attention_mul)
    x = Dropout(0.5)(x)
    x = Dense(num_classes, activation='softmax')(x)
    model = Model(inputs=[inputs], outputs=x)

    load_dir = "./models/LSTM_Attention.h5"
    model.load_weights(load_dir)
    return model

HIDDEN_UNITS = 256
model = build_model(HIDDEN_UNITS)

# -------------------------
# Mediapipe setup
# -----------------
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# -------------------------
# Video Processing Class
# -------------------------
class VideoProcessor:
    def __init__(self):
        self.actions = np.array(['curl', 'press', 'squat'])
        self.sequence_length = 30
        self.colors = [(245,117,16), (117,245,16), (16,117,245)]
        self.threshold = 0.5
        self.sequence = []
        self.current_action = ''
        self.feedback = ''
        self.curl_counter = 0
        self.press_counter = 0
        self.squat_counter = 0
        self.curl_stage = None
        self.press_stage = None
        self.squat_stage = None

    def draw_landmarks(self, image, results):
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                  mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                  mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2))

    def extract_keypoints(self, results):
        pose_keypoints = np.array([[res.x, res.y, res.z, res.visibility] 
                                   for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
        return pose_keypoints

    def calculate_angle(self, a,b,c):
        a, b, c = np.array(a), np.array(b), np.array(c)
        radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
        angle = np.abs(radians*180.0/np.pi)
        return 360-angle if angle > 180.0 else angle

    def get_coordinates(self, landmarks, side, joint):
        coord = getattr(mp_pose.PoseLandmark, side.upper()+"_"+joint.upper())
        return [landmarks[coord.value].x, landmarks[coord.value].y]

    def viz_joint_angle(self, image, angle, joint):
        cv2.putText(image, str(int(angle)), tuple(np.multiply(joint, [640, 480]).astype(int)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 2, cv2.LINE_AA)

    def count_reps(self, image, landmarks):
        self.feedback = ''  # reset eachh frame

        if self.current_action == 'curl':
            shoulder = self.get_coordinates(landmarks, 'left', 'shoulder')
            elbow = self.get_coordinates(landmarks, 'left', 'elbow')
            wrist = self.get_coordinates(landmarks, 'left', 'wrist')
            angle = self.calculate_angle(shoulder, elbow, wrist)
            if angle < 30:
                self.curl_stage = "up" 
                self.feedback = "Good! Lower slowly"
            if angle > 140 and self.curl_stage =='up':
                self.curl_stage="down"  
                self.curl_counter +=1
                self.feedback = "Great rep ✅"
            if angle > 160:
                self.feedback = "Fully extend your arm"
            self.viz_joint_angle(image, angle, elbow)

        elif self.current_action == 'press':
            shoulder = self.get_coordinates(landmarks, 'left', 'shoulder')
            elbow = self.get_coordinates(landmarks, 'left', 'elbow')
            wrist = self.get_coordinates(landmarks, 'left', 'wrist')
            elbow_angle = self.calculate_angle(shoulder, elbow, wrist)
            shoulder2elbow_dist = abs(math.dist(shoulder, elbow))
            shoulder2wrist_dist = abs(math.dist(shoulder, wrist))
            if (elbow_angle > 130) and (shoulder2elbow_dist < shoulder2wrist_dist):
                self.press_stage = "up"
                self.feedback = "Push straight up"
            if (elbow_angle < 50) and (shoulder2elbow_dist > shoulder2wrist_dist) and (self.press_stage =='up'):
                self.press_stage='down'
                self.press_counter += 1
                self.feedback = "Nice press ✅"
            self.viz_joint_angle(image, elbow_angle, elbow)

        elif self.current_action == 'squat':
            left_shoulder = self.get_coordinates(landmarks, 'left', 'shoulder')
            left_hip = self.get_coordinates(landmarks, 'left', 'hip')
            left_knee = self.get_coordinates(landmarks, 'left', 'knee')
            left_ankle = self.get_coordinates(landmarks, 'left', 'ankle')
            right_shoulder = self.get_coordinates(landmarks, 'right', 'shoulder')
            right_hip = self.get_coordinates(landmarks, 'right', 'hip')
            right_knee = self.get_coordinates(landmarks, 'right', 'knee')
            right_ankle = self.get_coordinates(landmarks, 'right', 'ankle')
            left_knee_angle = self.calculate_angle(left_hip, left_knee, left_ankle)
            right_knee_angle = self.calculate_angle(right_hip, right_knee, right_ankle)
            left_hip_angle = self.calculate_angle(left_shoulder, left_hip, left_knee)
            right_hip_angle = self.calculate_angle(right_shoulder, right_hip, right_knee)
            thr = 165
            if (left_knee_angle < thr) and (right_knee_angle < thr):
                self.squat_stage = "down"
                self.feedback = "Go lower!"
            if (left_knee_angle > thr) and (right_knee_angle > thr) and (self.squat_stage =='down'):
                self.squat_stage='up'
                self.squat_counter += 1
                self.feedback = "Solid squat ✅"
            self.viz_joint_angle(image, left_knee_angle, left_knee)
            self.viz_joint_angle(image, left_hip_angle, left_hip)

    def prob_viz(self, res, input_frame):
        output_frame = input_frame.copy()
        for num, prob in enumerate(res):        
            cv2.rectangle(output_frame, (0,60+num*40), (int(prob*100), 90+num*40), self.colors[num], -1)
            cv2.putText(output_frame, self.actions[num], (0, 85+num*40), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
        return output_frame

    def process(self, image):
        image.flags.writeable = False
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = pose.process(image)
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        if results.pose_landmarks:
            self.draw_landmarks(image, results)
            keypoints = self.extract_keypoints(results)        
            self.sequence.append(keypoints.astype('float32', casting='same_kind'))      
            self.sequence = self.sequence[-self.sequence_length:]

            if len(self.sequence) == self.sequence_length:
                res = model.predict(np.expand_dims(self.sequence, axis=0), verbose=0)[0]
                self.current_action = self.actions[np.argmax(res)]
                confidence = np.max(res)
                if confidence < self.threshold:
                    self.current_action = ''
                image = self.prob_viz(res, image)
                try:
                    landmarks = results.pose_landmarks.landmark
                    self.count_reps(image, landmarks)
                except:
                    pass
                # Display counters
                cv2.rectangle(image, (0,0), (640, 40), self.colors[np.argmax(res)], -1)
                cv2.putText(image, f'curl {self.curl_counter}', (3,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
                cv2.putText(image, f'press {self.press_counter}', (240,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
                cv2.putText(image, f'squat {self.squat_counter}', (490,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)

                # Feedback message
                if self.feedback:
                    cv2.putText(image, self.feedback, (10, 460),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,0,255), 2)

        return image

# -------------------------
# Threaded Camera Capture
# -------------------------
class Camera:
    def __init__(self):
        self.cap = cv2.VideoCapture(0)
        self.lock = threading.Lock()
        self.frame = None
        t = threading.Thread(target=self.update, args=())
        t.daemon = True
        t.start()

    def update(self):
        while True:
            ret, frame = self.cap.read()
            if not ret:
                continue
            with self.lock:
                self.frame = frame

    def get_frame(self):
        with self.lock:
            return self.frame.copy() if self.frame is not None else None

camera = Camera()
processor = VideoProcessor()

# -------------------------
# Flask app
# -------------------------
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def gen_frames():
    while True:
        frame = camera.get_frame()
        if frame is None:
            continue
        frame = processor.process(frame)
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)