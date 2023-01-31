import json 
import pyrebase

class FireBase:
    def __init__(self, config_json : str) -> None:
        self._firebase_app_config = json.load(open(config_json))
        try:
            self._firebase = pyrebase.initialize_app(self._firebase_app_config)
            self._firebase_auth = self._firebase.auth()
            print("=> App initialized successfully ...")
        except:
            print("Failed to initialize app ...")
            return 
    
    def auth_login(self, email : str, password : str) -> None:
        try:
            auth_response = self._firebase_auth.sign_in_with_email_and_password(email, password)
        except Exception as e:
            print("Failed to login")
            print(f"Log: {e}")
            return None 
        return auth_response
    
    def auth_account_create(self, email : str, password : str) -> None:
        # TODO implement internal password checker 
        try:
            response = self._firebase_auth.create_user_with_email_and_password(email,password)
            print("=> Account created successfully ...")
            return response 
        except Exception as e:
            print(f"Failed to create account ... Log: {e}")
            return None  