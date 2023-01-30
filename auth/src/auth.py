from PyQt5 import QtWidgets
from PyQt5.uic import loadUi
from PyQt5.QtWidgets import QDialog

from src.firebase import FireBase
from configs.env_config import EnvConfig as env


# Login Class 

class LoginScreen(QDialog):
    def __init__(self):
        super(LoginScreen, self).__init__()
        self._login_ui = str(env.assets_components / "login.ui")
        loadUi(self._login_ui, self)

        self._firebase_auth = FireBase(env.firebase_json_secret_path)
        self.passwordfield.setEchoMode(QtWidgets.QLineEdit.Password)
        self.login.clicked.connect(self.loginfunction)

    def loginfunction(self):
        user = self.emailfield.text()
        password = self.passwordfield.text()

        if len(user)==0 or len(password)==0:
            self.error.setText("Please input all fields ...")

        else:
            auth_response = self._firebase_auth.auth_login(user, password)
            if auth_response:
                self.error.setText("Successfully logged in...")
                print(auth_response)
            else:
                self.error.setText("Invalid username or password ...")


# Create Account Class 

class CreateAccScreen(QDialog):
    def __init__(self):
        super(CreateAccScreen, self).__init__()
        self._create_acc_ui = str(env.assets_components / "createacc.ui")
        loadUi(self._create_acc_ui,self)

        self._firebase_auth = FireBase(env.firebase_json_secret_path)
        self.passwordfield.setEchoMode(QtWidgets.QLineEdit.Password)
        self.confirmpasswordfield.setEchoMode(QtWidgets.QLineEdit.Password)
        self.signup.clicked.connect(self.signupfunction)

    def signupfunction(self):
        user = self.emailfield.text()
        password = self.passwordfield.text()
        confirmpassword = self.confirmpasswordfield.text()

        if len(user)==0 or len(password)==0 or len(confirmpassword)==0:
            self.error.setText("Please fill in all inputs ...")

        elif password!=confirmpassword:
            self.error.setText("Passwords do not match ...")
        else:
            response = self._firebase_auth.auth_account_create(user, confirmpassword)
            if response:
                self.error.setText("Account created successfully ...")
                print(response)
            else:
                self.error.setText("Account creation failed ...")