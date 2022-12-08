# my-sukkirisu-bot

[![CodeQL](https://github.com/shiiyan/my-sukkirisu-bot/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/shiiyan/my-sukkirisu-bot/actions/workflows/codeql.yml)
[![Node.js CI](https://github.com/shiiyan/my-sukkirisu-bot/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/shiiyan/my-sukkirisu-bot/actions/workflows/node.js.yml)

A slack bot built with bolt.js and Cloud Functions.

## Packages

[![Node.js Package @shiiyan/sukkirisu-function-core-domain](https://github.com/shiiyan/my-sukkirisu-bot/actions/workflows/release-package-core-domain.yml/badge.svg)](https://github.com/shiiyan/my-sukkirisu-bot/actions/workflows/release-package-core-domain.yml)
[![Node.js Package @shiiyan/sukkirisu-function-error](https://github.com/shiiyan/my-sukkirisu-bot/actions/workflows/release-package-error.yml/badge.svg)](https://github.com/shiiyan/my-sukkirisu-bot/actions/workflows/release-package-error.yml)

Packages are private and hosted on Github Packages.
In order to install them, npm needs to be configured with Github tokens which have permisson to read packages from Github Packages.

```bash
npm config set //npm.pkg.github.com/:_authToken=<token_which_can_read_packages>
```

## Architecture

![architecture_of_my_sukkirisu_bot](https://user-images.githubusercontent.com/36617009/206575260-a00d03ab-e2bc-4e9d-8b0d-c4308506daf4.jpg)
