<p align="center">
  <img src="static/svicons.svg" alt="Svicons" height=100>
</p>

<h2 align="center">Popular SVG icon packs as Svelte components</h2>

<h3 align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/0d610e7d-fefe-436a-a871-d6f3e47593a9/deploy-status)](https://app.netlify.com/sites/svicons/deploys)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/janosh/svicons/main.svg)](https://results.pre-commit.ci/latest/github/janosh/svicons/main)
[![Link check](https://github.com/janosh/svicons/actions/workflows/link-check.yml/badge.svg)](https://github.com/janosh/svicons/actions/workflows/link-check.yml)

</h3>

> Big thanks to [@jacobwgillespie](https://github.com/jacobwgillespie) and his project [`svg-icons`](https://github.com/svg-icons/svg-icons) for providing pre-assembled and pre-cleaned SVG icons!

**[Icon Explorer](https://svicons.netlify.app)** (very much WIP)

## Installation

```sh
npm i -D @svicons/{packName}
# or
yarn add -D @svicons/{packName}
```

For example

```sh
yarn add -D @svicons/octicons @svicons/fa-solid @svicons/material-sharp
```

## Usage

```svelte
<script>
  import Alarm from '@svicons/bootstrap/alarm.svelte'
</script>

<Alarm width="3em" color="green" />
```

## Other Svicon Packs

|                           |                    |                     |                     |                          |
| ------------------------- | ------------------ | ------------------- | ------------------- | ------------------------ |
| [bootstrap]               | [boxicons-logos]   | [boxicons-regular]  | [boxicons-solid]    | [crypto]                 |
| [entypo]                  | [entypo-social]    | [evaicons-outline]  | [evaicons-solid]    | [evil]                   |
| [fa-brands]               | [fa-regular]       | [fa-solid]          | [feather]           | [fluentui-system-filled] |
| [fluentui-system-regular] | [foundation]       | [heroicons-outline] | [heroicons-solid]   | [icomoon]                |
| [ionicons-outline]        | [ionicons-sharp]   | [ionicons-solid]    | [material-outlined] | [material-rounded]       |
| [material-sharp]          | [material-twotone] | [octicons]          | [open-iconic]       | [remix-editor]           |
| [remix-fill]              | [remix-line]       | [simple-icons]      | [typicons]          | [zondicons]              |

## To Dos

1. Create a searchable & filterable index page listing all icon packs and all available icons. Similar to <https://styled-icons.dev>. (partially completed)
2. Convert both the site and all icon packages to TypeScript. (partially completed)
3. Automate versioning and publishing with GitHub actions to match <https://github.com/svg-icons/svg-icons> release cycles.
4. Add some `ava` tests to ensure icons can be imported and have expected props.

Contributions towards any of these goals are much appreciated!

## Credit where it's due

Thanks to all these icon packs for their permissive licensing, allowing free use!

- [Bootstrap](https://icons.getbootstrap.com): [MIT License](https://github.com/twbs/icons/blob/main/LICENSE.md)
- [Boxicons](https://boxicons.com): [CC BY 4.0 License](https://boxicons.com/usage#license)
- [Crypto Icons](http://cryptoicons.co): [CC0 1.0 Universal License](https://github.com/atomiclabs)
- [Entypo](http://entypo.com): [CC BY-SA 4.0 License](http://entypo.com)
- [Eva Icons](https://akveo.github.io/eva-icons): [MIT License](https://github.com/akveo/eva-icons/blob/master/LICENSE.txt)
- [Evil Icons](https://evil-icons.io): [MIT License](https://github.com/evil-icons/evil-icons/blob/master/LICENSE.txt)
- [Feather](https://feathericons.com): [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE)
- [FluentUI System](https://github.com/microsoft/fluentui-system-icons): [MIT License](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE)
- [Font Awesome](https://fontawesome.com): [CC BY 4.0 License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt)
- [Foundation](https://zurb.com/playground/foundation-icon-fonts-3): no license info in [repo](https://github.com/thecreation/standard-icons)
- [Heroicons](https://github.com/refactoringui/heroicons): [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)
- [Icomoon](https://icomoon.io): [GPL](http://www.gnu.org/licenses/gpl.html) / [CC BY 4.0 License](http://creativecommons.org/licenses/by/4.0)
- [Ionicons](https://ionicons.com): [MIT License](https://github.com/ionic-team/ionicons/blob/master/LICENSE)
- [Material Design](https://material.io/icons): [Apache License Version 2.0](https://github.com/google)
- [Octicons](https://octicons.github.com): [MIT License](https://github.com/primer/octicons/blob/master/LICENSE)
- [Open Iconic](https://npmjs.com/package/open-iconic): [MIT License](https://github.com/iconic/open-iconic/blob/master/FONT-LICENSE)
- [Remix](https://remixicon.com): [Apache License 2.0](https://github.com/Remix-Design/RemixIcon/blob/master/License)
- [Simple Icons](https://github.com/simple-icons/simple-icons): [CC0 1.0 Universal License](https://github.com/simple-icons/simple-icons/blob/master/LICENSE.md)
- [Typicons](https://s-ings.com/typicons): [CC BY SA 3.0 License](https://github.com/stephenhutchings/typicons.font/blob/master/LICENCE.md)
- [Zondicons](https://www.zondicons.com): [MIT License](https://github.com/dukestreetstudio/zondicons/blob/master/LICENSE)

[bootstrap]: https://npmjs.com/package/@svicons/bootstrap
[boxicons-logos]: https://npmjs.com/package/@svicons/boxicons-logos
[boxicons-regular]: https://npmjs.com/package/@svicons/boxicons-regular
[boxicons-solid]: https://npmjs.com/package/@svicons/boxicons-solid
[crypto]: https://npmjs.com/package/@svicons/crypto
[entypo]: https://npmjs.com/package/@svicons/entypo
[entypo-social]: https://npmjs.com/package/@svicons/entypo-social
[evaicons-outline]: https://npmjs.com/package/@svicons/evaicons-outline
[evaicons-solid]: https://npmjs.com/package/@svicons/evaicons-solid
[evil]: https://npmjs.com/package/@svicons/evil
[fa-brands]: https://npmjs.com/package/@svicons/fa-brands
[fa-regular]: https://npmjs.com/package/@svicons/fa-regular
[fa-solid]: https://npmjs.com/package/@svicons/fa-solid
[feather]: https://npmjs.com/package/@svicons/feather
[fluentui-system-filled]: https://npmjs.com/package/@svicons/fluentui-system-filled
[fluentui-system-regular]: https://npmjs.com/package/@svicons/fluentui-system-regular
[foundation]: https://npmjs.com/package/@svicons/foundation
[heroicons-outline]: https://npmjs.com/package/@svicons/heroicons-outline
[heroicons-solid]: https://npmjs.com/package/@svicons/heroicons-solid
[icomoon]: https://npmjs.com/package/@svicons/icomoon
[ionicons-sharp]: https://npmjs.com/package/@svicons/ionicons-sharp
[ionicons-solid]: https://npmjs.com/package/@svicons/ionicons-solid
[ionicons-outline]: https://npmjs.com/package/@svicons/ionicons-outline
[material]: https://npmjs.com/package/@svicons/material
[material-outlined]: https://npmjs.com/package/@svicons/material-outlined
[material-rounded]: https://npmjs.com/package/@svicons/material-rounded
[material-twotone]: https://npmjs.com/package/@svicons/material-twotone
[material-sharp]: https://npmjs.com/package/@svicons/material-sharp
[octicons]: https://npmjs.com/package/@svicons/octicons
[open-iconic]: https://npmjs.com/package/@svicons/open-iconic
[remix-fill]: https://npmjs.com/package/@svicons/remix-fill
[remix-editor]: https://npmjs.com/package/@svicons/remix-editor
[remix-line]: https://npmjs.com/package/@svicons/remix-line
[simple-icons]: https://npmjs.com/package/@svicons/simple-icons
[typicons]: https://npmjs.com/package/@svicons/typicons
[zondicons]: https://npmjs.com/package/@svicons/zondicons
