import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit
from PyQt5.QtGui import QTextCharFormat, QFont, QSyntaxHighlighter, QColor, QTextCursor
from PyQt5.QtCore import Qt, QRegExp


class PythonHighlighter(QSyntaxHighlighter):
    def __init__(self, parent=None):
        super(PythonHighlighter, self).__init__(parent)
        self.highlighting_rules = []

        keyword_format = QTextCharFormat()
        keyword_format.setForeground(Qt.darkBlue)
        keyword_format.setFontWeight(QFont.Bold)
        keywords = ['and', 'as', 'assert', 'break', 'class', 'continue',
                    'def', 'del', 'elif', 'else', 'except', 'False',
                    'finally', 'for', 'from', 'global', 'if', 'import',
                    'in', 'is', 'lambda', 'None', 'nonlocal', 'not',
                    'or', 'pass', 'raise', 'return', 'True', 'try',
                    'while', 'with', 'yield']
        for word in keywords:
            pattern = QRegExp(r'\b' + word + r'\b')
            self.highlighting_rules.append((pattern, keyword_format))

        quotation_format = QTextCharFormat()
        quotation_format.setForeground(Qt.darkGreen)
        pattern = QRegExp(r'\".*\"')
        pattern.setMinimal(True)
        self.highlighting_rules.append((pattern, quotation_format))

        function_format = QTextCharFormat()
        function_format.setFontItalic(True)
        function_format.setForeground(Qt.blue)
        pattern = QRegExp(r'\b[A-Za-z0-9_]+(?=\()')
        self.highlighting_rules.append((pattern, function_format))

        indent_format = QTextCharFormat()
        indent_format.setForeground(QColor('#444444'))
        indent_pattern = QRegExp(r'^\s+')
        self.highlighting_rules.append((indent_pattern, indent_format))

    def highlightBlock(self, text):
        for pattern, format in self.highlighting_rules:
            expression = QRegExp(pattern)
            index = expression.indexIn(text)
            while index >= 0:
                length = expression.matchedLength()
                self.setFormat(index, length, format)
                index = expression.indexIn(text, index + length)


class IndentTextEdit(QTextEdit):
    def __init__(self, parent=None):
        super(IndentTextEdit, self).__init__(parent)
        self.setStyleSheet("font-size: 18px;")
        self.setTabStopWidth(20)
        self.previous_indent = ''

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Backtab:
            cursor = self.textCursor()
            cursor.movePosition(QTextCursor.StartOfLine)
            cursor.movePosition(QTextCursor.Right, QTextCursor.KeepAnchor, 4)
            if cursor.selectedText() == ' ' * 4:
                cursor.removeSelectedText()
                return

        elif event.key() == Qt.Key_Return:
            cursor = self.textCursor()
            line = cursor.block().text()
            indent = len(line) - len(line.lstrip())
            if cursor.positionInBlock() <= indent:
                indent += 4
            cursor.insertText(' ' * indent)

        super(IndentTextEdit, self).keyPressEvent(event)


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.editor = IndentTextEdit()
        self.setCentralWidget(self.editor)

        self.highlighter = PythonHighlighter(self.editor.document())

        self.setWindowTitle('Python Code Editor')
        self.setGeometry(100, 100, 800, 600)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    main_window = MainWindow()
    main_window.show()
    sys.exit(app.exec_())
