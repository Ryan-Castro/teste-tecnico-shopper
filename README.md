# Teste para Shopeer
Nesse projeto, está o Back-end criado para um teste para uma vaga de emprego, utilizando nodeJS, express, API GeminiIA, e mongodb, sendo tudo dentro de containers no docker.

# Objetivo
Esse é um sistema desenvolvido que gerencia a leitura individualizada de consumo de água e gás. Para facilitar a coleta da informação, o serviço utilizará IA para obter a medição através da foto de um medidor.

# Como Utilizar
Para começar, é necessário baixar o pacote e adicionar na raiz do projeto um arquivo .env contendo uma key para API.

	.env
	GEMINI_API_KEY = SUA KEY

Para conseguir essa key, você pode acessar <a href="https://ai.google.dev/gemini-api/docs/api-key">https://ai.google.dev/gemini-api/docs/api-key</a>

Após criado o arquivo com a key, e só colocar o seguinte comando:

	docker-compose up

# Rotas
	url:  "localhost:3000/upload",
	body: {
		"image":  "base64",
		"customer_code":  "string",
		"measure_datetime":  "datetime",
		"measure_type":  "'WATER' ou 'GAS'"
	}
<hr/>

	url:  "localhost:3000/confirm",
	body: {
		"measure_uuid":  "string",
		"confirmed_value":  'integer'
	}
<hr/>

	url:  "localhost:3000/<customer code>/list",
