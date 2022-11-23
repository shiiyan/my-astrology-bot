# About Packages

Packages and main application are managed under same Github repository using a so called monorepo strategy.
Currently, packages consist of core domains and errors of this application.
They are pure node.js classes and are not depend on other technical components.
They are shared by multiple services (Cloud Functions).

## How to make changes to packages

1. make changes to any of the packages
2. run following commands to bump up version

```bash
cd packages # make sure current directory is /packages before running make command
make patch
```

3. commit and push changes to Github
4. create and publish release using [Github Releases](https://github.com/shiiyan/my-sukkirisu-bot/releases/new), then Github Actions will publish updated packages to Github Packages.

<img width="500" alt="image" src="https://user-images.githubusercontent.com/36617009/203463118-86d71a8c-f8c5-4e9d-a4a5-369491ee156f.png">
