from io import StringIO

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage

def convert_pdf_to_txt(path, password):
    """
        Handles the extracting of the MPESA statements
        for insights
    """
    string_out_put = StringIO()

    # Instantiate PDF resource manager
    rsrcmgr = PDFResourceManager()
    codec = 'utf-8'
    laparams = LAParams()

    # Extract the contents from PDF
    device = TextConverter(rsrcmgr, string_out_put, codec=codec, laparams=laparams)
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    # password = password
    maxpages = 0
    caching = True
    pagenos=set()
   
    try:
        # convert and interprate the extracted text
        for page in PDFPage.get_pages(path, pagenos, maxpages=maxpages, password=password,caching=caching, check_extractable=True):
            interpreter.process_page(page)

            text = string_out_put.getvalue()
            device.close()
            string_out_put.close()
            
            # Split of and remove unused text
            raw_lines = text.splitlines()[3:84]

            # remove white space
            lines = list(filter(None, raw_lines))
            

            # extract paid in and paid out and date period
            date_period = lines[9]
            # remove the coma based integers
            paid_in = [float(i.replace(',', '')) for i in lines[24:32]]
            paid_out = [float(i.replace(',', '')) for i in lines[33:41]]
           
            return paid_in, paid_out, date_period
            
    except:
        return {
            "message":"sorry invlaid password check your password again"
}

