##
## Gera a build via NPM e copia para dentro do workspace do Siorg
##

# Altere este caminho para o diretório na sua máquina!
FINAL_DEST=~/siorg/workspace/novosiorg/siorg-gestao/siorg-gestao-webapp/src/main/webapp/public

# Este diretório está amarrado dentro da configuração do Webpack, não mexa.
BUILD_DIR=build

# Checa se o diretório do workspace Siorg está certo.
if [ ! -d "$FINAL_DEST" ]; then
	echo "-- O diretório do workspace do Siorg está errado, corrija-o neste script."
	exit 0
fi

# Checa se estamos no diretório raiz da aplicação.
if [ ! -d ./src ] || [ ! -f ./package.json ]; then
	echo "-- É necessário rodar o script do diretório raiz da aplicação, build abortada."
	exit 0
fi

echo "-- Gerando build via NPM..."
npm run build

# O diretório da build foi gerado?
if [ ! -d "./$BUILD_DIR" ]; then
	echo "-- A geração da build via NPM falhou."
	exit 0
fi

# Se o diretório existe, deleta-o com tudo dentro.
if [ -d "$FINAL_DEST/$BUILD_DIR" ]; then
	echo "-- Removendo diretório de build existente dentro do workspace do Siorg..."
	rm -Rf "$FINAL_DEST/$BUILD_DIR"
fi

echo "-- Copiando diretório de build:"
echo "-- $FINAL_DEST"
cp -r "./$BUILD_DIR" "$FINAL_DEST/."

# Checagem final.
if [ -d "$FINAL_DEST/$BUILD_DIR" ]; then
	echo "-- Script encerrado com sucesso."
else
	echo "-- Diretório não copiado, algo deu errado."
fi
