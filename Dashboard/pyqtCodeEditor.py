from PyQt5.QtCore import QThread, pyqtSignal, Qt, QRegExp, QRegularExpression
from PyQt5.QtGui import QTextCharFormat, QFont, QColor, QTextCursor, QSyntaxHighlighter
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit
import re


# class pyqtHighlighter(QSyntaxHighlighter):
#     def __init__(self, document):
#         super().__init__(document)
#         self.highlighting_rules = []
#
#         # Set up highlighting rules
#         self.keyword_format = QTextCharFormat()
#         self.keyword_format.setForeground(QColor(150, 0, 150))
#         self.keyword_format.setFontWeight(QFont.Bold)
#         keywords = ["and", "as", "assert", "break", "class", "continue",
#                     "def", "del", "elif", "else", "except", "False", "finally",
#                     "for", "from", "global", "if", "import", "in", "is", "lambda",
#                     "None", "nonlocal", "not", "or", "pass", "raise", "return",
#                     "True", "try", "while", "with", "yield"]
#         self.highlighting_rules += [(re.compile(r'\b' + keyword + r'\b'), self.keyword_format)
#                                     for keyword in keywords]
#
#         self.comment_format = QTextCharFormat()
#         self.comment_format.setForeground(QColor(128, 128, 128))
#         self.highlighting_rules.append((re.compile(r'#[^\n]*'), self.comment_format))
#
#         self.special_char_format = QTextCharFormat()
#         self.special_char_format.setForeground(QColor(255, 128, 0))
#         self.highlighting_rules.append((re.compile(r'[^_\w\d\s]'), self.special_char_format))
#
#     def highlightBlock(self, text):
#         for pattern, format in self.highlighting_rules:
#             for match in pattern.finditer(text):
#                 self.setFormat(match.start(), match.end() - match.start(), format)
#         self.setCurrentBlockState(0)

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

        self.comment_format = QTextCharFormat()
        self.comment_format.setForeground(QColor(128, 128, 128))
        self.highlighting_rules.append((QRegExp(r'#[^\n]*'), self.comment_format))

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
    #
    # def textHighlightBlock(self, text):
    #     cursor = QTextCursor(self.document())
    #     cursor.movePosition(QTextCursor.Start)
    #     while cursor.position() < (cursor.anchor() + len(text)):
    #         if text[cursor.position() - cursor.anchor()] == 'your_text':
    #             self.setFormat(cursor.position() - cursor.anchor(), len('your_text'), self.highlight_format)
    #         cursor.movePosition(QTextCursor.Right)


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
            print("here")
            cursor = self.textCursor()
            line = cursor.block().text()
            indent = len(line) - len(line.lstrip())
            if cursor.positionInBlock() <= indent:
                indent += 4
            cursor.insertText(' ' * indent)

        super(pyqtCodeEdit, self).keyPressEvent(event)
