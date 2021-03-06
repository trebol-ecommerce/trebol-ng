# Trébol (Spanish Clover), The Virtual Web Store
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![Build Status](https://travis-ci.com/trebol-ecommerce/trebol-ng.svg?branch=source)](https://travis-ci.com/trebol-ecommerce/trebol-ng)

Trébol was born from a career project, a hardware store web system called 'FERME Web'. It was an Angular dashboard application that communicated by a REST API to a backend service. Then it could list all product data stored in a MySQL database, add products to a cart and create fake selling transactions.
Trébol pushes the idea forward and aims to become an industry-standard online shop application that is easy to use and manage.
Any bussinesses selling products or services may use Trébol to bring their public presence to the Internet through a friendly interface, and learning how to use it in a short time.
Developers can learn how Trébol works and improve on it, or take components from it for use in their own systems. Trébol tries to follow the Angular philosophy of decoupling components and services for maximum reusability.

## Infrastructure

The application code itself lives in `/src/app/`, and is divided by domains:
* `models/` contains the data types (TS classes) used both for APIs and templates.
* `api/` contains modules that provide service clients used to consume [the backend APIs](https://github.com/trebol-ecommerce/trebol-api), and the Angular dependency injection tokens used to interchange implementations
  * `store/` provides service clients for the Store API. This includes operations like fetching storefront products, categories, specific product details, info about the selling company, and cart checking out.
  * `data/` provides calls for querying and working with data and authorization accesses based on data contexts.
  * `session/` provides calls for creating accounts, logging in and out, and review personal profile data.
* `management/` has all components, services and directives for administrating data; register, update and categorize products, create users, etcetera.
* `shared/` has components used by other modules.
  * It also brings a `angular-material.module` to clearly state all the imports used, application-wide.
* `store/` has all components, services and directives for shopping; viewing the product catalog, logging in, signing up for a customer account, reviewing cart before checking out, and more.

## Requirements

* An [Angular CLI](https://cli.angular.io/) 10-compatible [Node.js/NPM](https://nodejs.org/) installation.

## Getting the code

* First, `git clone` the repository.
* Then, in the root directory, do `npm install` to fetch all node modules and have it.

## Configuration

If you plan to use [an external backend](https://github.com/trebol-ecommerce/trebol-jee) (or more than one) for the APIs, you must create production environment files. Trébol is set to replace several files when launching a production build; see the `production` configuration in the `/angular.json` file for the exact `fileReplacement` strategies.

If you happen to run a server in the same machine (aka localhost), [you can test it quickly with a proxy](https://angular.io/guide/build#proxying-to-a-backend-server) to avoid CORS errors. Use the `/localhost.proxy.conf.json` file as example (edit it if necessary).

### Steps to connect to a backend
* Copy-and-paste every file in `/src/environments`, add a `*.prod.ts` suffix.
  * Your resulting `environment.prod.ts` file must import the `http` API implementation modules (for example, `import { HttpStoreApiModule } from 'src/app/api/store/http/http-store-api.module'`).
  * If you use localhost, you can leave the API URLs as-is in every `*-api.environment.prod.ts` file and use a proxy (read "Building / Running").
  * If you're not using localhost, assign those API URLs. You can use the same URL in all files if you only have one backend application/endpoint.

## Testing

Jasmine tests are providing about 60% code coverage, you can give them a try using `ng test` in the root directory. Travis runs these on every push to `source` or any pull request.

## Building / Running

In the repo root directory you may:
* Serve the application locally, by doing `ng serve` (this uses mock API modules)
* Create the static site files, with `ng build` (a `/dist/` folder will be created with its contents)

In both cases, add the `--prod` flag if you configured a production environment as described above in the ``Configuration`` section.
If you are using localhost, you can then add the `--proxy-config [file]` flag. This is mentioned above as well.


* To deploy it somewhere else, do `ng deploy`. Inspect [the angular-cli-ghpages repo](https://github.com/angular-schule/angular-cli-ghpages#options) for more info on this.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/eLeontev"><img src="https://avatars1.githubusercontent.com/u/15786916?v=4" width="100px;" alt=""/><br /><sub><b>eLeontev</b></sub></a><br /><a href="https://github.com/bglamadrid/trebol-ng/commits?author=eLeontev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dmodena"><img src="https://avatars3.githubusercontent.com/u/11446011?v=4" width="100px;" alt=""/><br /><sub><b>Douglas Modena</b></sub></a><br /><a href="#example-dmodena" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
