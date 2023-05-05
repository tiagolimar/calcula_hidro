import PyPDF2
import os

fator_falha = 0
n_total_anterior = 0
dados = {'Fator de Falha (%)':[],
         'Tempo Entre Descargas (min)':[],
         'Duração de Descarga (s)':[],
         'Nº de Peças Total':[],
         'Nº de Peças Simultâneas':[]}

with open('tabela geral.csv','w', encoding='utf-8') as f:
    cabecalho = list(dados.keys())
    f.writelines('\t'.join(cabecalho)+'\n')

pdf_file = open('NBR 8160.pdf', 'rb')
read_pdf = PyPDF2.PdfReader(pdf_file)
page = read_pdf.pages[24:51]

def formatar_dados(text_):
    text = text.replace('n = ','')
    text = text.strip()
    text = text.split(' ')

    return(text[0],text[1:])

def formatar(text):
    global dados
    global fator_falha

    intervalos = ['10', '20', '30', '40', '50', '75', '100', '300', '350', '400', '450', '500']
    text = text.strip().replace('\n\n','\n')
    text = text.split('\n')
    text = text[1:-1]
 
    mudanca_no_fator_falha = 'Tabela ' in text[0]

    if mudanca_no_fator_falha:
        fator_falha = text[0][-4:-1]
        tempo_descarga = text[1][-6:-4]
        dados_limpos = text[4:]
    else:
        tempo_descarga = text[0][-6:-4]
        dados_limpos = text[3:]

    with open('8160-anexo-b.csv','a',encoding='utf8') as file_csv:
        for line in dados_limpos:
            line = line.replace('n = ','')
            line = line.strip()
            line = line.split(' ')

            n_peca_total = line[0]
            n_peca_simultanea = line[1:]

            for n_peca,intervalo in zip(n_peca_simultanea,intervalos):
                file_csv.writelines(f'{fator_falha}\t{tempo_descarga}\t{intervalo}\t{n_peca_total}\t{n_peca}\n')
                dados['Fator de Falha (%)'].append(fator_falha)
                dados['Tempo Entre Descargas (min)'].append(tempo_descarga)
                dados['Duração de Descarga (s)'].append(intervalo)
                dados['Nº de Peças Total'].append(n_peca_total)
                dados['Nº de Peças Simultâneas'].append(n_peca)

for arquivo in os.listdir():
    if arquivo.endswith('.txt'):
        with open(arquivo,'r',encoding='utf-8') as file:
            content = file.readlines()
            formatar('\n'.join(content))

# for i,pag in enumerate(page):
#     content = pag.extract_text()
#     with open(f'pag{24+i}.csv', 'w', encoding='utf-8') as file:
#         file.writelines(content)