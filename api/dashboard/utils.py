# from PyPDF2.pdf import PdfFileReader
# from io import StringIO
# import time
# from pprint import pprint

# def getDataUsingPyPdf2(filename):

#     print ('range', filename)
#     pdf = PdfFileReader(filename, "rb")
#     # print('---------------------', pdf)

#     content = ""
#     page = pdf.getPage(0).values
#     # print(dir(page))
#     pprint(page)
#     # info = pdf.getNumPages()
#     # text = page.extractText()
#     # print('txts', text)
   

#     for i in range(0, pdf.getNumPages()):
#         extractedText = pdf.getPage(i).extractText()

#         content +=  extractedText + "\n"

#     # print('loop i', extractedText)
#     content = " ".join(content.replace("\xa0", " ").strip().split())
#     print('content', content.encode("ascii", "ignore"))
#     return content.encode("ascii", "ignore")

from io import BytesIO
from io import StringIO

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage

def convert_pdf_to_txt(path):
    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)

    fp = path
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    password = "29281040"
    maxpages = 0
    caching = True
    pagenos=set()

    for page in PDFPage.get_pages(fp, pagenos, maxpages=maxpages, password=password,caching=caching, check_extractable=True):
        interpreter.process_page(page)

    text = retstr.getvalue()

    # fp.close()
    device.close()
    retstr.close()
    # print('content', text)
    # print('content', text.encode("ascii", "ignore"))
    return text 
