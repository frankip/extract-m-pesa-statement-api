from io import BytesIO
from io import StringIO

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage

def convert_pdf_to_txt(path, password):
    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)

    fp = path
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    # password = "29281040"
    password = password
    maxpages = 0
    caching = True
    pagenos=set()
    try:
        for page in PDFPage.get_pages(fp, pagenos, maxpages=maxpages, password=password,caching=caching, check_extractable=True):
            interpreter.process_page(page)

            text = retstr.getvalue()
            fp.close()
            device.close()
            retstr.close()

            raw_lines = text.splitlines()[3:84]

            # remove white space
            lines = list(filter(None, raw_lines))
            # extract paid in and paid out
            paid_in = [float(i.replace(',', '')) for i in lines[24:32]]
            paid_out = [float(i.replace(',', '')) for i in lines[33:41]]
            
            return paid_in, paid_out
    except:
        return "sorry check your password again"


