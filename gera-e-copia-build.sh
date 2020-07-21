##
## Gera a build via NPM e copia para dentro do workspace do Siorg.
## A flag "-d" simplesmente deleta a build do workspace, sem gerar uma nova.
##

# Altere este caminho para o seu diretório workspace do Siorg.
WORKSPACE_DIR=~/siorg/workspace

# Destino da build.
FINAL_DEST="$WORKSPACE_DIR/novosiorg/siorg-gestao/siorg-gestao-webapp/src/main/webapp/public"

# O nome do diretório da build deve ser o mesmo que está no final de "baseApp"
# no arquivo "producao.config.json".
BUILD_DIR=build

# Checa se o diretório do workspace Siorg existe.
if [ ! -d "$FINAL_DEST" ]; then
	echo "-- O diretório do workspace do Siorg não existe:"
	echo $WORKSPACE_DIR
	echo "-- Build abortada."
	exit 0
fi

# Verifica argumentos passados ao script.
while [[ "$#" -gt 0 ]]; do
	case $1 in
		# Se foi passado o argumento "-d", deleta a build do workspace e encerra o script.
		-d)
		if [ -d "$FINAL_DEST/$BUILD_DIR" ]; then
			echo "-- Removendo diretório de build existente dentro do workspace do Siorg..."
			rm -Rf "$FINAL_DEST/$BUILD_DIR"
			echo "Script encerrado."
		else
			echo "-- Não há build dentro do workspace. Script encerrado."
		fi
		exit 0
		;;
	esac
done

# Checa se estamos no diretório raiz da aplicação.
if [ ! -d ./src ] || [ ! -f ./package.json ]; then
	echo "-- É necessário rodar o script do diretório raiz da aplicação, build abortada."
	exit 0
fi

# Gera a build com os arquivos HTML, JS e CSS.
echo "-- Gerando build via NPM..."
npm run build

# O diretório da build foi realmente gerado?
if [ ! -d "./$BUILD_DIR" ]; then
	echo "-- A geração da build via NPM falhou."
	exit 0
fi

# Se existe uma build gerada dentro do workspace, deleta com tudo dentro.
if [ -d "$FINAL_DEST/$BUILD_DIR" ]; then
	echo "-- Removendo diretório de build existente dentro do workspace do Siorg..."
	rm -Rf "$FINAL_DEST/$BUILD_DIR"
fi

# Copia a build para dentro do workspace.
echo "-- Copiando diretório de build:"
echo "-- $FINAL_DEST"
cp -r "./$BUILD_DIR" "$FINAL_DEST/."

# Checagem final.
if [ -d "$FINAL_DEST/$BUILD_DIR" ]; then
	echo "-- Script encerrado com sucesso."
else
	echo "-- Diretório não copiado, algo deu errado."
fi
