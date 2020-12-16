install:
		npm install

publish:
		npm publish --dry-run

lint:
		npx eslint .

gendiff:
		node bin/gendiff.js

test:
		npx -n --experimental-vm-modules jest