tabela = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style.css">
    <title>Document</title>
</head>
<body>
    <table id="tabela_tubos">
        <thead>
            <tr>
campo1            </tr>
        </thead>
        <tbody>
campo2        </tbody>
    </table>
    <script src="tubos.js"></script>
</body>
</html>
'''

template_linha = '''            <tr>
campo            </tr>\n'''

with open('tubos.txt','r', encoding='utf-8') as arquivo:
    conteudo = arquivo.readlines()

def formatar_cabecalho():
    global tabela
    campos = conteudo[0].split('\t')
    codigo_html = ''

    for campo in campos:
        campo = campo.strip()
        codigo_html += f'                <th>{campo}</th>\n'

    tabela = tabela.replace('campo1',codigo_html)

def formatar_corpo():
    global tabela
    conjunto_linhas = ''
    for campos in conteudo[1:]:
        campos = campos.split('\t')
        linhas = ''
        for campo in campos:
            campo = campo.strip()
            linhas +=  f'                <td>{campo}</td>\n'
        
        conjunto_linhas += template_linha.replace('campo',linhas)

    tabela = tabela.replace('campo2',conjunto_linhas)

formatar_cabecalho()
formatar_corpo()

with open('tubos.html','w', encoding='utf-8') as arquivo:
    arquivo.write(tabela)
