##
## Deleta o diretório "build" dentro do workspace do Siorg, se houver.
##

FINAL_DEST=~/siorg/workspace/novosiorg/siorg-gestao/siorg-gestao-webapp/src/main/webapp/public
BUILD_DIR=build

if [ -d "$FINAL_DEST/$BUILD_DIR" ]; then
	echo "-- Removendo diretório de build existente dentro do workspace do Siorg..."
	rm -Rf "$FINAL_DEST/$BUILD_DIR"
else
	echo "-- Não há build dentro do workspace."
fi
