from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtCore import QThread, pyqtSignal, Qt, QRegExp
from PyQt5.QtGui import QTextCharFormat, QFont, QColor, QTextCursor, QSyntaxHighlighter, QIntValidator
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QMessageBox
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
import numpy as np
import pyqtgraph as pg
import pygame
import sys
from rewards_ai.Environments.CarRacer.CarTrainer import Game, Agent
from rewards_ai.Model.DQN import Linear_QNet
import time
from pyqtCodeEditor import pyqtHighlighter, pyqtCodeEdit

plt.ion()


class WorkerTraining(QThread):
    ImageUpdate = pyqtSignal(QtGui.QPixmap, list)

    def __init__(self, args):
        super().__init__()
        self.args = args

    def run(self):
        self.ThreadActive = True
        while self.ThreadActive:
            MODE = "training"
            load_last_checkpoint = False
            CONTROL_SPEED = 0.05
            TRAIN_SPEED = 100
            screen = pygame.display.set_mode((800, 700), pygame.HIDDEN)
            pygame.display.iconify()

            # write reward func
            # def reward_func(props):
            #     reward = 0
            #     if props["isAlive"]:
            #         reward = 1
            #     obs = props["obs"]
            #     if obs[0] < obs[-1] and props["dir"] == -1:
            #         reward += 1
            #         if props["rotationVel"] == 7 or props["rotationVel"] == 10:
            #             reward += 1
            #     elif obs[0] > obs[-1] and props["dir"] == 1:
            #         reward += 1
            #         if props["rotationVel"] == 7 or props["rotationVel"] == 10:
            #             reward += 1
            #     else:
            #         reward += 0
            #         if props["rotationVel"] == 15:
            #             reward += 1
            #     return reward

            # create model arch
            linear_net = Linear_QNet([5, 128, 3])

            # initialize game and agent
            agent = Agent.Agent(model=linear_net,
                                load_last_checkpoint=self.args["load_last_checkpoint"],
                                lr=self.args["lr"],
                                epsilon=self.args["epsilon"],
                                gamma=self.args["gamma"])
            game = Game.CarEnv(self.args["reward_function"], screen)

            # training loop
            plot_scores = []
            plot_mean_scores = []
            total_score = 0

            record = 0
            while True:
                time.sleep(0.1)
                pygame.display.update()
                # pixmap_pygame, pixmap_matplotlib = QtGui.QPixmap("./map.jpg"), QtGui.QPixmap("./map.jpg")
                pixmap_pygame = None
                try:
                    x = pygame.surfarray.array3d(screen)
                    x = np.transpose(x, (1, 0, 2))
                    h, w, _ = x.shape
                    bgra = np.empty((h, w, 4), np.uint8, 'C')
                    bgra[..., 0] = x[..., 2]
                    bgra[..., 1] = x[..., 1]
                    bgra[..., 2] = x[..., 0]
                    if x.shape[2] == 3:
                        bgra[..., 3].fill(255)
                        fmt = QtGui.QImage.Format_RGB32
                    else:
                        bgra[..., 3] = x[..., 3]
                        fmt = QtGui.QImage.Format_ARGB32

                    qimage = QtGui.QImage(bgra.data, w, h, fmt)
                    qimage.ndarray = bgra
                    pixmap_pygame = QtGui.QPixmap.fromImage(qimage)

                except Exception as e:
                    print(e)
                if MODE == "human":
                    time.sleep(CONTROL_SPEED)
                    game.play_human()
                else:
                    game.FPS = TRAIN_SPEED
                    reward, done, score = agent.train_step(game)
                    game.timeTicking()

                    if done:
                        game.initialize()
                        agent.n_games += 1
                        agent.train_long_memory()
                        if score > record:
                            record = score
                            agent.model.save()
                        print('Game', agent.n_games, 'Score', score, 'Record:', record)
                        # plot(score, plot_scores, total_score, plot_mean_scores, agent)
                        plot_scores.append(score)
                        total_score += score
                        mean_score = total_score / agent.n_games
                        plot_mean_scores.append(mean_score)
                        QThread.msleep(1)
                self.ImageUpdate.emit(pixmap_pygame, [plot_scores, plot_mean_scores])

    def stop(self):
        self.ThreadActive = False
        self.quit()


class Ui_MainWindow:

    def __init__(self):
        self.args = {
            "reward_function_initial":
                '''def reward_function(params):\n\tif not params["isAlive"]:\n\t\treturn 1\n\telse:\n\t\treturn 0''',
            "load_last_checkpoint": False
        }

        # to be returned from environment
        self.test_params = {
            "isAlive": True,
            "list": []
        }

    def PixMapUpdate(self, pixmap_pygame, pixmap_matplotlib):
        self.pygame_win.setScaledContents(True)
        self.pygame_win.setPixmap(
            pixmap_pygame.scaled(self.pygame_win.width(), self.pygame_win.height(), QtCore.Qt.KeepAspectRatio))
        self.pygame_win.setPixmap(pixmap_pygame.scaled(self.pygame_win.width(), self.pygame_win.height()))
        self.pygame_win.adjustSize()

        self.dataplot1.setData(pixmap_matplotlib[0])
        self.dataplot2.setData(pixmap_matplotlib[1])

    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1297, 847)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.navbar = QtWidgets.QWidget(self.centralwidget)
        self.navbar.setGeometry(QtCore.QRect(0, 0, 1301, 91))
        self.navbar.setObjectName("navbar")
        self.navbar_background = QtWidgets.QLabel(self.navbar)
        self.navbar_background.setGeometry(QtCore.QRect(-10, -10, 1321, 101))
        self.navbar_background.setStyleSheet("background: lightgrey;\n"
                                             "border: 1px solid grey;")
        self.navbar_background.setText("")
        self.navbar_background.setObjectName("navbar_background")
        self.navbar_profile = QtWidgets.QLabel(self.navbar)
        self.navbar_profile.setGeometry(QtCore.QRect(1230, 20, 50, 50))
        self.navbar_profile.setStyleSheet("background: grey;\n"
                                          "border-radius: 25px;\n"
                                          "border: 1px solid black;")
        self.navbar_profile.setText("")
        self.navbar_profile.setObjectName("navbar_profile")
        self.horizontalLayoutWidget = QtWidgets.QWidget(self.navbar)
        self.horizontalLayoutWidget.setGeometry(QtCore.QRect(30, 20, 571, 41))
        self.horizontalLayoutWidget.setObjectName("horizontalLayoutWidget")
        self.horizontalLayout = QtWidgets.QHBoxLayout(self.horizontalLayoutWidget)
        self.horizontalLayout.setContentsMargins(0, 0, 0, 0)
        self.horizontalLayout.setSpacing(40)
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.nav_env = QtWidgets.QPushButton(self.horizontalLayoutWidget)
        self.nav_env.setStyleSheet("border: 1px solid grey;\n"
                                   "border-radius: 10px;\n"
                                   "text-align: center;\n"
                                   "font-weight: bold; height: auto;")
        self.nav_env.setObjectName("nav_env")
        self.horizontalLayout.addWidget(self.nav_env)
        self.nav_model_list = QtWidgets.QPushButton(self.horizontalLayoutWidget)
        self.nav_model_list.setStyleSheet("border: 1px solid grey;\n"
                                          "border-radius: 10px;\n"
                                          "text-align: center;\n"
                                          "font-weight: bold; height: auto;")
        self.nav_model_list.setObjectName("nav_model_list")
        self.horizontalLayout.addWidget(self.nav_model_list)
        self.nav_model_create = QtWidgets.QPushButton(self.horizontalLayoutWidget)
        self.nav_model_create.setStyleSheet("border: 1px solid grey;\n"
                                            "border-radius: 10px;\n"
                                            "text-align: center;\n"
                                            "font-weight: bold; height: auto;")
        self.nav_model_create.setObjectName("nav_model_create")
        self.horizontalLayout.addWidget(self.nav_model_create)
        self.loading = QtWidgets.QWidget(self.centralwidget)
        self.loading.setEnabled(False)
        self.loading.setGeometry(QtCore.QRect(0, 0, 1311, 851))
        self.loading.setObjectName("loading")
        self.logo_cont = QtWidgets.QLabel(self.loading)
        self.logo_cont.setGeometry(QtCore.QRect(0, -10, 1311, 861))
        self.logo_cont.setStyleSheet("background: white")
        self.logo_cont.setText("")
        self.logo_cont.setObjectName("logo_cont")
        self.content_window = QtWidgets.QWidget(self.centralwidget)
        self.content_window.setGeometry(QtCore.QRect(-1, 90, 1301, 761))
        self.content_window.setObjectName("content_window")
        self.content_background = QtWidgets.QLabel(self.content_window)
        self.content_background.setGeometry(QtCore.QRect(-6, 5, 1311, 751))
        self.content_background.setStyleSheet("background: white;")
        self.content_background.setText("")
        self.content_background.setObjectName("content_background")
        self.model_creation_window = QtWidgets.QWidget(self.content_window)
        self.model_creation_window.setGeometry(QtCore.QRect(-1, 0, 1301, 751))
        self.model_creation_window.setStyleSheet("background: white;")
        self.model_creation_window.setObjectName("model_creation_window")
        self.steps_window = QtWidgets.QWidget(self.model_creation_window)
        self.steps_window.setGeometry(QtCore.QRect(20, 20, 301, 721))
        self.steps_window.setStyleSheet("background: whitesmoke; border-radius: 20px; border: 1px solid lightgrey;")
        self.steps_window.setObjectName("steps_window")
        self.step1_button = QtWidgets.QPushButton(self.steps_window)
        self.step1_button.setGeometry(QtCore.QRect(20, 30, 259, 41))
        self.step1_button.setObjectName("step1_button")
        self.step2_button = QtWidgets.QPushButton(self.steps_window)
        self.step2_button.setGeometry(QtCore.QRect(20, 90, 259, 41))
        self.step2_button.setObjectName("step2_button")
        self.step3_button = QtWidgets.QPushButton(self.steps_window)
        self.step3_button.setGeometry(QtCore.QRect(20, 150, 259, 41))
        self.step3_button.setObjectName("step3_button")
        self.steps_desc_window = QtWidgets.QWidget(self.model_creation_window)
        self.steps_desc_window.setGeometry(QtCore.QRect(340, 20, 941, 721))
        self.steps_desc_window.setStyleSheet(
            "background: whitesmoke; border-radius: 20px; border: 1px solid lightgrey;")
        self.steps_desc_window.setObjectName("steps_desc_window")
        self.steps_1 = QtWidgets.QWidget(self.steps_desc_window)
        self.steps_1.setGeometry(QtCore.QRect(20, 20, 901, 681))
        self.steps_1.setStyleSheet("border: none;")
        self.steps_1.setObjectName("steps_1")
        self.step1_model_name = QtWidgets.QLabel(self.steps_1)
        self.step1_model_name.setGeometry(QtCore.QRect(32, 40, 200, 31))
        self.step1_model_name.setObjectName("step1_model_name")
        self.step1_model_name_enter = QtWidgets.QLineEdit(self.steps_1)
        self.step1_model_name_enter.setGeometry(QtCore.QRect(30, 80, 551, 31))
        self.step1_model_name_enter.setStyleSheet("border: 1px grey solid;\n"
                                                  "background: white;")
        self.step1_model_name_enter.setObjectName("step1_model_name_enter")
        self.step1_model_desc = QtWidgets.QLabel(self.steps_1)
        self.step1_model_desc.setGeometry(QtCore.QRect(32, 150, 200, 31))
        self.step1_model_desc.setObjectName("step1_model_desc")
        self.step1_model_desc_enter = QtWidgets.QTextEdit(self.steps_1)
        self.step1_model_desc_enter.setGeometry(QtCore.QRect(30, 190, 551, 151))
        self.step1_model_desc_enter.setStyleSheet("background: white; border-radius: 0px;")
        self.step1_model_desc_enter.setObjectName("step1_model_desc_enter")
        self.scrollArea = QtWidgets.QScrollArea(self.steps_1)
        self.scrollArea.setGeometry(QtCore.QRect(30, 430, 841, 211))
        self.scrollArea.setWidgetResizable(True)
        self.scrollArea.setObjectName("scrollArea")
        self.scrollAreaWidgetContents = QtWidgets.QWidget()
        self.scrollAreaWidgetContents.setGeometry(QtCore.QRect(0, 0, 841, 211))
        self.scrollAreaWidgetContents.setObjectName("scrollAreaWidgetContents")
        self.scrollArea.setWidget(self.scrollAreaWidgetContents)
        self.step1_env_choose = QtWidgets.QLabel(self.steps_1)
        self.step1_env_choose.setGeometry(QtCore.QRect(31, 381, 200, 30))
        self.step1_env_choose.setObjectName("step1_env_choose")
        self.steps_2 = QtWidgets.QWidget(self.steps_desc_window)
        self.steps_2.setGeometry(QtCore.QRect(19, 19, 901, 681))
        self.steps_2.setStyleSheet("border: none;")
        self.steps_2.setObjectName("steps_2")
        self.step2_head = QtWidgets.QLabel(self.steps_2)
        self.step2_head.setGeometry(QtCore.QRect(33, 41, 200, 31))
        self.step2_head.setObjectName("step2_head")
        self.verticalLayoutWidget = QtWidgets.QWidget(self.steps_2)
        self.verticalLayoutWidget.setGeometry(QtCore.QRect(60, 90, 451, 391))
        self.verticalLayoutWidget.setObjectName("verticalLayoutWidget")
        self.hyperparams_layout = QtWidgets.QVBoxLayout(self.verticalLayoutWidget)
        self.hyperparams_layout.setContentsMargins(0, 0, 0, 0)
        self.hyperparams_layout.setObjectName("hyperparams_layout")
        self.hyperparam_1 = QtWidgets.QWidget(self.verticalLayoutWidget)
        self.hyperparam_1.setObjectName("hyperparam_1")
        self.hyperparam_label_1 = QtWidgets.QLabel(self.hyperparam_1)
        self.hyperparam_label_1.setGeometry(QtCore.QRect(10, 10, 161, 31))
        self.hyperparam_label_1.setObjectName("hyperparam_label_1")
        self.hyperparam_value_1 = QtWidgets.QLineEdit(self.hyperparam_1)
        self.hyperparam_value_1.setGeometry(QtCore.QRect(10, 40, 241, 31))
        self.hyperparam_value_1.setObjectName("hyperparam_value_1")
        self.hyperparam_info_1 = QtWidgets.QPushButton(self.hyperparam_1)
        self.hyperparam_info_1.setGeometry(QtCore.QRect(410, 10, 31, 28))
        self.hyperparam_info_1.setObjectName("hyperparam_info_1")
        self.hyperparams_layout.addWidget(self.hyperparam_1)
        self.hyperparam_value_1.setStyleSheet("background: white;")
        self.hyperparam_info_1.setStyleSheet("border: 1px solid black; border-radius: 7px;")
        self.hyperparam_2 = QtWidgets.QWidget(self.verticalLayoutWidget)
        self.hyperparam_2.setObjectName("hyperparam_2")
        self.hyperparam_label_2 = QtWidgets.QLabel(self.hyperparam_2)
        self.hyperparam_label_2.setGeometry(QtCore.QRect(10, 10, 161, 31))
        self.hyperparam_label_2.setObjectName("hyperparam_label_2")
        self.hyperparam_value_2 = QtWidgets.QLineEdit(self.hyperparam_2)
        self.hyperparam_value_2.setGeometry(QtCore.QRect(10, 40, 241, 31))
        self.hyperparam_value_2.setObjectName("hyperparam_value_2")
        self.hyperparam_value_2_valid = QIntValidator().setRange(0, 5)
        self.hyperparam_value_2.setValidator(QIntValidator())
        self.hyperparam_value_2.setMaxLength(2)
        # self.hyperparam_value_2.setIn
        self.hyperparam_info_2 = QtWidgets.QPushButton(self.hyperparam_2)
        self.hyperparam_info_2.setGeometry(QtCore.QRect(410, 10, 31, 28))
        self.hyperparam_info_2.setObjectName("hyperparam_info_2")
        self.hyperparams_layout.addWidget(self.hyperparam_2)
        self.hyperparam_value_2.setStyleSheet("background: white;")
        self.hyperparam_info_2.setStyleSheet("border: 1px solid black; border-radius: 7px;")
        self.hyperparam_3 = QtWidgets.QWidget(self.verticalLayoutWidget)
        self.hyperparam_3.setObjectName("hyperparam_3")
        self.hyperparam_label_3 = QtWidgets.QLabel(self.hyperparam_3)
        self.hyperparam_label_3.setGeometry(QtCore.QRect(10, 10, 161, 31))
        self.hyperparam_label_3.setObjectName("hyperparam_label_3")
        self.hyperparam_value_3 = QtWidgets.QLineEdit(self.hyperparam_3)
        self.hyperparam_value_3.setGeometry(QtCore.QRect(10, 40, 241, 31))
        self.hyperparam_value_3.setObjectName("hyperparam_value_3")
        self.hyperparam_value_3_valid = QIntValidator().setRange(0, 5)
        self.hyperparam_value_3.setValidator(QIntValidator())
        self.hyperparam_value_3.setMaxLength(2)
        # self.hyperparam_value_3.setIn
        self.hyperparam_info_3 = QtWidgets.QPushButton(self.hyperparam_3)
        self.hyperparam_info_3.setGeometry(QtCore.QRect(410, 10, 31, 28))
        self.hyperparam_info_3.setObjectName("hyperparam_info_3")
        self.hyperparams_layout.addWidget(self.hyperparam_3)
        self.hyperparam_value_3.setStyleSheet("background: white;")
        self.hyperparam_info_3.setStyleSheet("border: 1px solid black; border-radius: 7px;")
        self.hyperparam_4 = QtWidgets.QWidget(self.verticalLayoutWidget)
        self.hyperparam_4.setObjectName("hyperparam_4")
        self.hyperparam_label_4 = QtWidgets.QLabel(self.hyperparam_4)
        self.hyperparam_label_4.setGeometry(QtCore.QRect(10, 10, 161, 31))
        self.hyperparam_label_4.setObjectName("hyperparam_label_4")
        self.hyperparam_value_4 = QtWidgets.QLineEdit(self.hyperparam_4)
        self.hyperparam_value_4.setGeometry(QtCore.QRect(10, 40, 241, 31))
        self.hyperparam_value_4.setObjectName("hyperparam_value_4")
        self.hyperparam_value_4_valid = QIntValidator().setRange(0, 5)
        self.hyperparam_value_4.setValidator(QIntValidator())
        self.hyperparam_value_4.setMaxLength(2)
        # self.hyperparam_value_4.setIn
        self.hyperparam_info_4 = QtWidgets.QPushButton(self.hyperparam_4)
        self.hyperparam_info_4.setGeometry(QtCore.QRect(410, 10, 31, 28))
        self.hyperparam_info_4.setObjectName("hyperparam_info_4")
        self.hyperparams_layout.addWidget(self.hyperparam_4)
        self.hyperparam_value_4.setStyleSheet("background: white;")
        self.hyperparam_info_4.setStyleSheet("border: 1px solid black; border-radius: 7px;")
        self.hyperparams_save_bt = QtWidgets.QPushButton(self.steps_2)
        self.hyperparams_save_bt.setGeometry(QtCore.QRect(362, 510, 151, 41))
        self.hyperparams_save_bt.setStyleSheet("border: 1px solid grey;\n"
                                               "border-radius: 10px;;\n"
                                               "text-align: center;\n"
                                               "height: 30px;\n"
                                               "width: 100px;")
        self.hyperparams_save_bt.setObjectName("hyperparams_save_bt")
        self.step2_head = QtWidgets.QLabel(self.steps_2)
        self.step2_head.setGeometry(QtCore.QRect(33, 41, 200, 31))
        self.step2_head.setObjectName("step2_head")
        self.steps_3 = QtWidgets.QWidget(self.steps_desc_window)
        self.steps_3.setGeometry(QtCore.QRect(19, 19, 901, 681))
        self.steps_3.setStyleSheet("border: none;")
        self.steps_3.setObjectName("steps_3")
        self.step3_model_name = QtWidgets.QLabel(self.steps_3)
        self.step3_model_name.setGeometry(QtCore.QRect(33, 41, 200, 31))
        self.step3_model_name.setObjectName("step3_model_name")
        # self.step3_code_editor = QtWidgets.QTextEdit(self.steps_3)
        self.step3_code_editor = pyqtCodeEdit(self.steps_3)
        self.highlighter = pyqtHighlighter(self.step3_code_editor.document())
        self.step3_code_editor.setGeometry(QtCore.QRect(30, 84, 791, 441))
        self.step3_code_editor.setStyleSheet("border: 1px solid grey;\n"
                                             "border-radius: 10px;\n"
                                             "background: #282c34\n;"
                                             "padding: 20px;\n"
                                             "color: white;")
        font = QtGui.QFont("monospace")
        font.setPointSize(10)
        self.step3_code_editor.setFont(font)
        self.step3_code_editor.setObjectName("step3_code_editor")
        self.step_3_training = QtWidgets.QPushButton(self.steps_3)
        self.step_3_training.setGeometry(QtCore.QRect(682, 550, 141, 31))
        self.step_3_training.setStyleSheet("border: 1px solid black;")
        self.step_3_training.setObjectName("step_3_training")
        self.step_3_validate = QtWidgets.QPushButton(self.steps_3)
        self.step_3_validate.setGeometry(QtCore.QRect(532, 550, 131, 31))
        self.step_3_validate.setStyleSheet("border: 1px solid black;")
        self.step_3_validate.setObjectName("step_3_validate")
        self.steps_2.raise_()
        self.steps_3.raise_()
        self.steps_1.raise_()
        self.steps_desc_window.raise_()
        self.steps_window.raise_()
        self.model_training_window = QtWidgets.QWidget(self.content_window)
        self.model_training_window.setGeometry(QtCore.QRect(-11, -1, 1311, 761))
        self.model_training_window.setObjectName("model_training_window")
        self.mode_training_Cont = QtWidgets.QWidget(self.model_training_window)
        self.mode_training_Cont.setGeometry(QtCore.QRect(30, 20, 1261, 721))
        self.mode_training_Cont.setStyleSheet("background: whitesmoke; border: 1px grey solid;")
        self.mode_training_Cont.setObjectName("mode_training_Cont")
        self.pygame_win = QtWidgets.QLabel(self.mode_training_Cont)
        self.pygame_win.setGeometry(QtCore.QRect(10, 10, 611, 441))
        self.pygame_win.setStyleSheet("background: lightgrey; border: 1px grey solid;")
        self.pygame_win.setText("")
        self.pygame_win.setObjectName("pygame_win")

        # self.matplotlib_win = QtWidgets.QLabel(self.mode_training_Cont)
        self.matplotlib_win = pg.PlotWidget(self.mode_training_Cont)
        self.matplotlib_win.setGeometry(QtCore.QRect(639, 10, 611, 441))
        self.matplotlib_win.setStyleSheet("background: lightgrey; border: 1px grey solid;")
        # self.matplotlib_win.setText("")
        self.matplotlib_win.setObjectName("matplotlib_win")
        self.matplotlib_win.setBackground('w')
        self.matplotlib_win.setLabel("left", "scores")
        self.matplotlib_win.setLabel("bottom", "no. of games")
        self.matplotlib_win.showGrid(x=True, y=True)
        self.matplotlib_win.addLegend()

        self.dataplot1 = self.matplotlib_win.plot([0], name="score", pen=pg.mkPen(color=(255, 184, 76), width=2))
        self.dataplot2 = self.matplotlib_win.plot([0], name="mean score", pen=pg.mkPen(color=(184, 232, 252), width=2))

        self.stop_training_button = QtWidgets.QPushButton(self.mode_training_Cont)
        self.stop_training_button.setGeometry(QtCore.QRect(526, 480, 211, 61))
        self.stop_training_button.setObjectName("stop_training_button")
        self.stop_training_button.setStyleSheet("background: lightgrey;")
        self.content_background.raise_()
        self.model_training_window.raise_()
        self.model_creation_window.raise_()
        self.loading.raise_()
        self.navbar.raise_()
        self.content_window.raise_()
        MainWindow.setCentralWidget(self.centralwidget)

        self.initial_updates()
        self.retranslateUi(MainWindow)
        self.control_buttons()
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def initial_updates(self):
        # text_option = QtGui.QTextOption()
        # text_option.setFlags(QtGui.QTextOption.)
        # self.step3_code_editor.document().setDefaultTextOption(text_option)
        self.step3_code_editor.setPlainText(self.args["reward_function_initial"])

    def control_buttons(self):
        self.step1_button.clicked.connect(self.handle_step1)
        self.step2_button.clicked.connect(self.handle_step2)
        self.step3_button.clicked.connect(self.handle_step3)
        self.step_3_training.clicked.connect(self.handle_training_button)
        self.step_3_validate.clicked.connect(self.handle_code_validation)
        self.stop_training_button.clicked.connect(self.handle_stop_training_button)

    def validate_code(self, func_string, params):
        global_vars = {}
        message_box = QMessageBox()
        message_box.setMaximumWidth(600)
        message_box.setWindowTitle("Code Validation Check")
        try:
            compiled_func = compile(func_string, "<string>", "exec")
            exec(compiled_func, global_vars)
            func = global_vars["reward_function"]
            func(params)
            self.args["reward_function"] = func

            message_box.setIcon(QMessageBox.Information)
            message_box.setText("Correct! Continue Training...")
            message_box.exec_()

        except Exception as e:
            import traceback
            error_lines = traceback.format_exc().strip().split('\n')
            message_box.setIcon(QMessageBox.Critical)
            message_box.setText("Error!")
            message_box.setInformativeText('\n'.join(error_lines[3:]))
            message_box.exec_()

    def handle_code_validation(self):
        code = self.step3_code_editor.toPlainText()
        params = Game.get_test_params()
        print(params)
        self.validate_code(code, params)

    def handle_step1(self):
        self.steps_1.raise_()

    def handle_step2(self):
        self.steps_2.raise_()

    def handle_step3(self):
        self.steps_3.raise_()

    def handle_training_button(self):
        self.model_training_window.raise_()

        self.args["lr"] = 0.001
        self.args["epsilon"] = int(self.hyperparam_value_3.text()) / 100
        self.args["gamma"] = int(self.hyperparam_value_4.text()) / 100

        self.worker_trainer = WorkerTraining(self.args)
        self.worker_trainer.start()
        self.worker_trainer.ImageUpdate.connect(self.PixMapUpdate)

    def handle_stop_training_button(self):
        self.model_creation_window.raise_()
        self.steps_3.raise_()
        self.worker_trainer.terminate()

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.nav_env.setText(_translate("MainWindow", "Environments"))
        self.nav_model_list.setText(_translate("MainWindow", "Your Models"))
        self.nav_model_create.setText(_translate("MainWindow", "Create Models"))
        self.step1_button.setText(_translate("MainWindow", "Step1"))
        self.step2_button.setText(_translate("MainWindow", "Step2"))
        self.step3_button.setText(_translate("MainWindow", "Step3"))
        self.step1_model_name.setText(_translate("MainWindow", "Enter Model Name"))
        self.step1_model_desc.setText(_translate("MainWindow", "Enter Model Description"))
        self.step1_env_choose.setText(_translate("MainWindow", "Select a track"))
        self.step2_head.setText(_translate("MainWindow", "Hyperparameters"))
        self.hyperparam_label_1.setText(_translate("MainWindow", "Learning rate (LR)"))
        self.hyperparam_info_1.setText(_translate("MainWindow", "i"))
        self.hyperparam_label_2.setText(_translate("MainWindow", "Hidden Layer Size"))
        self.hyperparam_info_2.setText(_translate("MainWindow", "i"))
        self.hyperparam_label_3.setText(_translate("MainWindow", "epsilon"))
        self.hyperparam_info_3.setText(_translate("MainWindow", "i"))
        self.hyperparam_label_4.setText(_translate("MainWindow", "gamma"))
        self.hyperparam_info_4.setText(_translate("MainWindow", "i"))
        self.step3_model_name.setText(_translate("MainWindow", "Customize Reward Function"))
        self.step_3_training.setText(_translate("MainWindow", "Begin Training"))
        self.step_3_validate.setText(_translate("MainWindow", "Validate"))
        self.stop_training_button.setText(_translate("MainWindow", "STOP TRAINING"))
        self.hyperparams_save_bt.setText(_translate("MainWindow", "Save"))

    # def train(self):
    #     self.args = {}
    #     MODE = "training"
    #     load_last_checkpoint = False
    #     CONTROL_SPEED = 0.05
    #     TRAIN_SPEED = 100
    #     screen = pygame.display.set_mode((800, 700), pygame.HIDDEN)
    #     pygame.display.iconify()

    # write reward func
    # def reward_func(props):
    #     reward = 0
    #     if props["isAlive"]:
    #         reward = 1
    #     obs = props["obs"]
    #     if obs[0] < obs[-1] and props["dir"] == -1:
    #         reward += 1
    #         if props["rotationVel"] == 7 or props["rotationVel"] == 10:
    #             reward += 1
    #     elif obs[0] > obs[-1] and props["dir"] == 1:
    #         reward += 1
    #         if props["rotationVel"] == 7 or props["rotationVel"] == 10:
    #             reward += 1
    #     else:
    #         reward += 0
    #         if props["rotationVel"] == 15:
    #             reward += 1
    #     return reward

    # create model arch
    # linear_net = Linear_QNet([5, 128, 3])

    # initialize game and agent
    # agent = Agent.Agent(linear_net, load_last_checkpoint)
    # print(self.reward_function)
    # game = Game.CarEnv(self.reward_function, screen)
    #
    # # training loop
    # plot_scores = []
    # plot_mean_scores = []
    # total_score = 0
    #
    # record = 0
    # while True:
    #     pygame.display.update()
    #     try:
    #         x = pygame.surfarray.array3d(screen)
    #         x = np.transpose(x, (1, 0, 2))
    #         h, w, _ = x.shape
    #         bgra = np.empty((h, w, 4), np.uint8, 'C')
    #         bgra[..., 0] = x[..., 2]
    #         bgra[..., 1] = x[..., 1]
    #         bgra[..., 2] = x[..., 0]
    #         if x.shape[2] == 3:
    #             bgra[..., 3].fill(255)
    #             fmt = QtGui.QImage.Format_RGB32
    #         else:
    #             bgra[..., 3] = x[..., 3]
    #             fmt = QtGui.QImage.Format_ARGB32
    #
    #         qimage = QtGui.QImage(bgra.data, w, h, fmt)
    #         qimage.ndarray = bgra
    #         pixmap = QtGui.QPixmap.fromImage(qimage)
    #
    #         self.pygame_win.setScaledContents(True)
    #         self.pygame_win.setPixmap(
    #             pixmap.scaled(self.pygame_win.width(), self.pygame_win.height(), QtCore.Qt.KeepAspectRatio))
    #         self.pygame_win.setPixmap(pixmap.scaled(self.pygame_win.width(), self.pygame_win.height()))
    #         self.pygame_win.adjustSize()
    #
    #     except Exception as e:
    #         print(e)
    #     if MODE == "human":
    #         time.sleep(CONTROL_SPEED)
    #         game.play_human()
    #     else:
    #         game.FPS = TRAIN_SPEED
    #         reward, done, score = agent.train_step(game)
    #         game.timeTicking()
    #
    #         if done:
    #             game.initialize()
    #             agent.n_games += 1
    #             agent.train_long_memory()
    #             if score > record:
    #                 record = score
    #                 agent.model.save()
    #             print('Game', agent.n_games, 'Score', score, 'Record:', record)
    #             # plot(score, plot_scores, total_score, plot_mean_scores, agent)
    #             plot_scores.append(score)
    #             total_score += score
    #             mean_score = total_score / agent.n_games
    #             plot_mean_scores.append(mean_score)
    #             try:
    #                 fig = Figure()
    #                 canvas = FigureCanvas(fig)
    #                 ax = fig.add_subplot(111)
    #                 # ax.set_title('Training...')
    #                 ax.set_xlabel('Number of Games')
    #                 ax.set_ylabel('Score')
    #
    #                 ax.plot(plot_scores)
    #                 ax.plot(plot_mean_scores)
    #                 # ax.ylim(ymin=0)
    #                 canvas.draw()
    #
    #                 x = canvas.buffer_rgba()
    #                 x = np.transpose(x, (1, 0, 2))
    #                 x = np.transpose(x, (1, 0, 2))
    #                 h, w, _ = x.shape
    #                 bgra = np.empty((h, w, 4), np.uint8, 'C')
    #                 bgra[..., 0] = x[..., 2]
    #                 bgra[..., 1] = x[..., 1]
    #                 bgra[..., 2] = x[..., 0]
    #                 if x.shape[2] == 3:
    #                     bgra[..., 3].fill(255)
    #                     fmt = QtGui.QImage.Format_RGB32
    #                 else:
    #                     bgra[..., 3] = x[..., 3]
    #                     fmt = QtGui.QImage.Format_ARGB32
    #
    #                 qimage = QtGui.QImage(bgra.data, w, h, fmt)
    #                 qimage.ndarray = bgra
    #                 pixmap = QtGui.QPixmap.fromImage(qimage)
    #                 self.matplotlib_win.setScaledContents(True)
    #                 self.matplotlib_win.setPixmap(pixmap)
    #                 plt.pause(.1)
    #             except Exception as e:
    #                 print(e)


if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    w = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(w)
    w.show()
    sys.exit(app.exec_())
