# Bibliotheca

Simply a project to store and share all my personal Angular libraries!

## Instructions

All commands and file path assume that you are in the root folder of the project _bibliotheca_

### Generate a new library

`ng g library @<scope>/<library-name>`

### Delete a library

1) Delete its folders in the folder _./projects_
2) Delete its references in the file _./tsconfig.json_
3) Delete its references in the file _./angular.json_
4) Check if there are some unused dependencies in the file _'./package.json'_ 

### Build a library

`ng build --configuration prod @<scope>/<library-name>`

### Publish a library

You need to be registered on [NPMJS](https://www.npmjs.com/), then log in with `npm login` on your terminal.

If your packages are scoped you'll need to register your organization too, check [here](https://docs.npmjs.com/orgs/) for more informations.

```
cd ./dist/<scope>/<library-name>
npm publish     // add '--access public' if you have a free org 
```

### Using a library in local development

By using [`npm link`](https://docs.npmjs.com/cli/v7/commands/npm-link) it's possible to try out a library in a local project, even with watchers and auto-refresh:

```
ng build --watch <scope>/<library-name>
cd ./dist/<scope>/<library-name>
npm link
cd <other-project-path>
npm link <scope>/<library-name>
```

⚠ Remember to set the flag `preserveSymlinks` to true under the host project _angular.json_.
Under `projects.<project-name>.architect.build.options`.



## Authors 

* __Thomas Iommi__ - _Initial work_ - [GitHub](https://github.com/ThomasIommi)
