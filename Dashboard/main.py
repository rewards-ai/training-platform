from PyQt5 import uic
from PyQt5.QtWidgets import QMainWindow, QApplication
import sys


class UI(QMainWindow):
    def __init__(self):
        super(UI, self).__init__()
        uic.loadUi("gui.ui", self)
        self.show()

        # navbar navigation
        self.nav_env.clicked.connect(self.show_environment_window)
        self.nav_model_create.clicked.connect(self.show_model_create_window)
        self.nav_model_list.clicked.connect(self.show_model_list_window)

    def show_environment_window(self):
        self.env_window.raise_()
        self.navbar.raise_()

    def show_model_create_window(self):
        self.model_creation_window.raise_()
        self.navbar.raise_()

    def show_model_list_window(self):
        self.model_list_window.raise_()
        self.navbar.raise_()

app = QApplication(sys.argv)
window = UI()
app.exec_()