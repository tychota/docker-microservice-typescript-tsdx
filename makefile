help:                   	## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install:                	## Install node modules
	yarn install

reinstall:              	## Clean and reinstall node modules
	yarn clean
	yarn install

update:                 	## Interactively upgrade files
	yarn update

build-images-dev:
	DOCKER_BUILDKIT=1 docker build -t test-ms/$(name):dev -f docker/$(name)/Dockerfile.dev .

build-all-images-dev: install  	## Build the different docker files in dev mode
	$(MAKE) build-images-dev name=api-gateway
	$(MAKE) build-images-dev name=ms-calculation

run-container-dev:
	docker-compose -f docker-compose.dev.yaml up -d