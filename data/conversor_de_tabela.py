tabela_html = '''<table>
    <thead>
        <tr>
cabecalho        </tr>
    </thead>
    <tbody>
corpo    </tbody>
</table>'''

cabecalho_html = ''
corpo_html_template = '''       <tr>
corpo template
        </tr>'''

with open('relacao_de_tubos.txt','r', encoding='utf-8') as arquivo:
    primeira_linha = True
    linhas = arquivo.readlines()

for linha in linhas:
    corpo_html = ''
    campos = linha.split('\t')

    if(primeira_linha):
        for campo in campos:
            campo = campo.strip()
            cabecalho_html += f'\t\t\t<th>{campo}</th>\n'

        tabela_html = tabela_html.replace('cabecalho',cabecalho_html)
        primeira_linha = False
    else:
        for campo in campos:
            corpo_html += f'\t\t\t<td>{campo}</td>\n'
        corpo_html = corpo_html_template.replace('corpo template',corpo_html)
        tabela_html += tabela_html.replace('corpo',corpo_html)

with open('relacao_de_tubos.html','w', encoding='utf-8') as arquivo:
    arquivo.write(tabela_html)
