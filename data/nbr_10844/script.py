import PyPDF2
import os

pdf_file = open('nbr-10844-1989.pdf', 'rb')
read_pdf = PyPDF2.PdfReader(pdf_file)
page = read_pdf.pages[10:12]

for i,pag in enumerate(page):
    content = pag.extract_text()
    with open(f'pag{11+i}.csv', 'w', encoding='utf-8') as file:
        file.writelines(content)