from PyQt5.QtCore import QThread, pyqtSignal, Qt, QRegExp
from PyQt5.QtGui import QTextCharFormat, QFont, QColor, QTextCursor, QSyntaxHighlighter
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit


class pyqtHighlighter(QSyntaxHighlighter):
    def __init__(self, parent=None):
        super(pyqtHighlighter, self).__init__(parent)
        self.highlighting_rules = []

        keyword_format = QTextCharFormat()
        keyword_format.setForeground(QColor("#CC58E7"))
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

        type_format = QTextCharFormat()
        type_format.setForeground(QColor("#52b3c0"))
        type_format.setFontWeight(QFont.Bold)
        types = ['False', 'True', 'bool', 'int', 'str', 'float', 'list', 'tuple', 'range', 'dict', 'set', 'frozenset']
        for word in types:
            pattern = QRegExp(r'\b' + word + r'\b')
            self.highlighting_rules.append((pattern, type_format))

        quotation_format = QTextCharFormat()
        quotation_format.setForeground(QColor("#5FCA7F"))
        pattern = QRegExp(r'\".*\"')
        pattern.setMinimal(True)
        self.highlighting_rules.append((pattern, quotation_format))

        function_format = QTextCharFormat()
        function_format.setForeground(QColor("#FD8A8A"))
        pattern = QRegExp(r'\b[A-Za-z0-9_]+(?=\()')
        self.highlighting_rules.append((pattern, function_format))

        indent_format = QTextCharFormat()
        indent_format.setForeground(QColor('#ffffff'))
        indent_pattern = QRegExp(r'^\s+')
        self.highlighting_rules.append((indent_pattern, indent_format))

    def highlightBlock(self, text):
        for pattern, format in self.highlighting_rules:
            expression = QRegExp(pattern)
            format.setFontPointSize(10)
            index = expression.indexIn(text)
            while index >= 0:
                length = expression.matchedLength()
                self.setFormat(index, length, format)
                index = expression.indexIn(text, index + length)


class pyqtCodeEdit(QTextEdit):
    def __init__(self, parent=None):
        super(pyqtCodeEdit, self).__init__(parent)
        self.setFontPointSize(10)
        # self.setStyle()
        self.setStyleSheet("padding: 10px;")
        self.setTabStopWidth(30)
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

        super(pyqtCodeEdit, self).keyPressEvent(event)
