import json
import os
from datetime import datetime

# NOTE: This script requires 'firebase-admin' package.
# Install it using: pip install firebase-admin

try:
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import firestore
except ImportError:
    print("Error: 'firebase-admin' package not found.")
    print("Please install it using: pip install firebase-admin")
    exit(1)

def run_backup(service_account_key_path, output_folder="backups"):
    """
    Exports specified Firestore collections to JSON files.
    """
    if not os.path.exists(service_account_key_path):
        print(f"Error: Service account key not found at {service_account_key_path}")
        return

    # Initialize Firebase Admin
    if not firebase_admin._apps:
        cred = credentials.Certificate(service_account_key_path)
        firebase_admin.initialize_app(cred)

    db = firestore.client()
    
    # Collections to backup
    collections = ["users", "posts", "donations", "exams", "exam_results", "notifications"]
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = os.path.join(output_folder, f"backup_{timestamp}")
    
    if not os.path.exists(backup_path):
        os.makedirs(backup_path)

    print(f"--- Starting Firestore Backup: {timestamp} ---")
    
    for coll_name in collections:
        print(f"Backing up collection: {coll_name}...")
        docs = db.collection(coll_name).stream()
        
        data = {}
        for doc in docs:
            data[doc.id] = doc.to_dict()
            
        file_name = f"{coll_name}.json"
        with open(os.path.join(backup_path, file_name), 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, default=str)
            
    print(f"--- Backup Complete! Saved to: {backup_path} ---")

if __name__ == "__main__":
    # Path to your Firebase Service Account Key
    # You can download this from Firebase Console -> Project Settings -> Service Accounts
    KEY_PATH = "serviceAccountKey.json" 
    
    if os.path.exists(KEY_PATH):
        run_backup(KEY_PATH)
    else:
        print("Pre-requisite missing: 'serviceAccountKey.json' not found.")
        print("1. Go to Firebase Console -> Project Settings -> Service Accounts.")
        print("2. Click 'Generate new private key'.")
        print("3. Rename the downloaded file to 'serviceAccountKey.json' and place it in the project root.")
