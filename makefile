help:                   				## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install:                				## Install node modules
	yarn install
	yarn bootstrap

install-prod:                		    ## Install node modules
	yarn install --production --frozen-lockfile
	yarn bootstrap-prod

reinstall:              				## Clean and reinstall node modules
	yarn clean
	yarn install

update:                 				## Interactively upgrade files
	yarn update

build-images-dev:
	DOCKER_BUILDKIT=1 docker build --progress plain -t test-ms/$(name):dev -f docker/$(name)/Dockerfile.dev .

build-all-images-dev:		  			## Build the different docker files in dev mode
	$(MAKE) build-images-dev name=api-gateway
	$(MAKE) build-images-dev name=ms-calculation

stop-container-dev:						## Stop the containers dev mode
	docker-compose -f docker-compose.dev.yaml stop

run-container-dev: stop-container-dev	## Run the containers dev mode
	docker-compose -f docker-compose.dev.yaml up -d --force-recreate
	docker-compose -f docker-compose.dev.yaml logs -f

start-packager-dev:						## Start the packager in dev mode
	yarn start