import os

class TxtToHtml():
    def __init__(self,nome_arquivo):
        self.nome_arquivo = nome_arquivo
        self.tabela = f'''<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/style.css">
        <title>{self.nome_arquivo}</title>
    </head>
    <body>
        <table id="{self.nome_arquivo}">
            <thead>
                <tr>
campo1                </tr>
            </thead>
            <tbody>
campo2            </tbody>
        </table>
    </body>
    </html>
    '''

        self.template_linha = '''                <tr>
campo                </tr>\n'''

        with open(f'{self.nome_arquivo}.txt','r', encoding='utf-8') as arquivo:
            self.conteudo = arquivo.readlines()

        self.formatar_cabecalho()
        self.formatar_corpo()

        with open(f'{self.nome_arquivo}.html','w', encoding='utf-8') as arquivo:
            arquivo.write(self.tabela)


    def formatar_cabecalho(self):
        campos = self.conteudo[0].split('\t')
        codigo_html = ''

        for campo in campos:
            campo = campo.strip()
            codigo_html += f'                    <th>{campo}</th>\n'

        self.tabela = self.tabela.replace('campo1',codigo_html)

    def formatar_corpo(self):
        conjunto_linhas = ''
        for campos in self.conteudo[1:]:
            campos = campos.split('\t')
            linhas = ''
            for campo in campos:
                campo = campo.strip()
                linhas +=  f'                    <td>{campo}</td>\n'
            
            conjunto_linhas += self.template_linha.replace('campo',linhas)

        self.tabela = self.tabela.replace('campo2',conjunto_linhas)

for arquivo in os.listdir():
    if arquivo.endswith('.txt'):
        nome_arquivo = arquivo.replace('.txt','')
        TxtToHtml(nome_arquivo)