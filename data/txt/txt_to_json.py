import os

class TxtToJson():
    def __init__(self,nome_arquivo):
        self.nome_arquivo = nome_arquivo
        self.json_keys = []
        self.json_content = []
        self.json_text = ''

        with open(f'{self.nome_arquivo}.txt','r', encoding='utf-8') as arquivo:
            self.conteudo = arquivo.readlines()

        self.formatar_cabecalho()
        self.formatar_corpo()
        self.json_text = f'"{str(self.json_content)}"'

        with open(f'{self.nome_arquivo}.json','w', encoding='utf-8') as arquivo:
            arquivo.write(self.json_text)

    
    def substituir_caracteres(self,text_):
        text = ''
        caracteres = {'á': 'a','à': 'a','â': 'a','ã': 'a',
        'é': 'e','è': 'e','ê': 'e','í': 'i','ì': 'i',
        'î': 'i','ó': 'o','ò': 'o','ô': 'o','õ': 'o',
        'ú': 'u','ù': 'u','û': 'u','ç': 'c','.':'',
        '\\':'_','/':'_','(':'',')':'','%':''}

        for caractere in text_:
            try:
                text += caracteres[caractere]
            except:
                text += caractere 

        return text

    def formatar_cabecalho(self):
        headers = ('id\t' + self.conteudo[0]).split('\t')
        
        for head in headers:
            head = head.lower().strip()
            head = self.substituir_caracteres(head).strip().replace(' ','_')
            self.json_keys.append(head)


    def formatar_corpo(self):
        pipe = {}
        i = 0
        for i,line in enumerate(self.conteudo[1:]):
            values = [i] + line.split('\t')

            for k,key in enumerate(self.json_keys):
                try:
                    value = values[k].replace(',','.')
                    int_value = int(value)
                    float_value = float(value)
                    
                except:
                    value = values[k]

                pipe[key] = value

            self.json_content.append(pipe.copy())


for arquivo in os.listdir():
    if arquivo.endswith('.txt'):
        nome_arquivo = arquivo.replace('.txt','')
        TxtToJson(nome_arquivo)
