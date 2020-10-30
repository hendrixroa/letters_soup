.PHONY: lint build clean dev run

################################################################################
# DEVELOP
#
# make dev_app APP=<app_name>
#
################################################################################
dev_app:
	NODE_ENV=development \
    APP=$(APP) \
    TS_NODE_TRANSPILE_ONLY=true \
    yarn nodemon --exec \
    yarn env-cmd --no-override -f ./env/.test.env yarn ts-node -r tsconfig-paths/register src/apps/$(APP)/main.ts | yarn pino-pretty -c -t -l
################################################################################
# BUILD
################################################################################
build: clean
	yarn run build && \
        cp package.json dist/ && \
        cp yarn.lock dist/ && \
        cp tsconfig.json dist/ && \
        for filename in $$(find . -iname '*.json' -a | grep -v '^./dist' | grep -v '^./node_modules' | sed 's/^..//'); do mkdir -p "./dist/$$(dirname $$filename)" && cp $$filename "./dist/$$filename"; done && \
        cd dist && \
        NODE_ENV=${NODE_ENV:-production} yarn

################################################################################
# OTHER
################################################################################
clean:
	rm -rf dist
