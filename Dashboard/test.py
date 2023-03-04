from PyQt5.QtWidgets import QApplication
from PyQt5.Qsci import QsciScintilla

app = QApplication([])
sci = QsciScintilla()
sci.show()
app.exec_()