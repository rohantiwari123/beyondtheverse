import cv2
import mediapipe as mp
import time

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Initialize MediaPipe Drawing
mp_drawing = mp.solutions.drawing_utils
drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)

def detect_cheating():
    cap = cv2.VideoCapture(0)
    
    # Cheating counters
    look_away_frames = 0
    multiple_faces_frames = 0
    no_face_frames = 0
    
    print("🚀 AI Proctoring System Started...")
    print("Press 'q' to exit.")

    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            continue

        # Flip the image horizontally for a later selfie-view display
        # Convert the BGR image to RGB.
        image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
        
        # To improve performance, optionally mark the image as not writeable to
        # pass by reference.
        image.flags.writeable = False
        results = face_mesh.process(image)

        # Draw the face mesh annotations on the image.
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        status_text = "Status: Monitoring"
        color = (0, 255, 0) # Green

        if results.multi_face_landmarks:
            num_faces = len(results.multi_face_landmarks)
            
            # 🚨 DETECTION 1: Multiple Faces
            if num_faces > 1:
                multiple_faces_frames += 1
                status_text = f"WARNING: {num_faces} Faces Detected!"
                color = (0, 0, 255) # Red
            else:
                multiple_faces_frames = 0

            for face_landmarks in results.multi_face_landmarks:
                # 🚨 DETECTION 2: Gaze Tracking (Looking Away)
                # We check the relative position of eye landmarks to detect head tilt
                # Index 1: Nose Tip, Index 152: Chin, Index 33: Left Eye, Index 263: Right Eye
                nose = face_landmarks.landmark[1]
                
                # Simple logic: if nose x-coordinate is too far from center
                if nose.x < 0.4 or nose.x > 0.6:
                    look_away_frames += 1
                    status_text = "WARNING: Looking Away!"
                    color = (0, 0, 255)
                else:
                    look_away_frames = 0

                mp_drawing.draw_landmarks(
                    image=image,
                    landmark_list=face_landmarks,
                    connections=mp_face_mesh.FACEMESH_CONTOURS,
                    landmark_drawing_spec=drawing_spec,
                    connection_drawing_spec=drawing_spec)
        else:
            # 🚨 DETECTION 3: No Face Detected
            no_face_frames += 1
            status_text = "WARNING: No Face Detected!"
            color = (0, 165, 255) # Orange

        # Display Status on Screen
        cv2.putText(image, status_text, (30, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv2.LINE_AA)
        
        # Security Log Triggers
        if multiple_faces_frames > 30:
            print("ALERT: Multiple people detected in the frame!")
        if look_away_frames > 45:
            print("ALERT: User is consistently looking away from the screen!")
        if no_face_frames > 60:
            print("ALERT: User has left the camera view!")

        cv2.imshow('Beyond the Verse - AI Proctoring', image)

        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    detect_cheating()
