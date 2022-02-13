> This package is still in beta and has not yet been tested thoroughly in a production environment.

[![npm version](https://badge.fury.io/js/@plugins.chat%2Fdrift-meta-frame.svg)](https://badge.fury.io/js/@plugins.chat%2Fdrift-meta-frame)

# Drift meta frame

[View next.js demo on StackBlitz ⚡️](https://stackblitz.com/edit/meta-frame-demo)

[View this repo on StackBlitz ⚡️](https://stackblitz.com/edit/drift-meta-frame)

The Drift chat widget usually requires a small snippet to be pasted on your page that essentially stubs out an API on the window, sets up a q to process any API calls made before it has loaded, and pulls in some small initialization code on the host page.

The initialization code generates two iframes (one for the chat window and one for the controller) and sets up a post message communication layer between the host and those iframes.

In some cases, larger organizations (or individuals) have security policies that have a problem pulling in live code directly on their page and require a different strategy to avoid exposing themselves to non-compliance of those policies.

This package aims to help solve some of those issues. Instead of bootstrapping the widget by pulling full-screen on the host at load-time, this package allows you to set up a single iframe that wraps the drift install (a meta frame) - it works by setting up a full-screen iframe that lets drift behave as if it were loaded directly on the host, but maintains separation and can be loaded into any other domain or source. It uses mouse move event handlers to determine whether or not we should focus on the meta frame or the host and pointer-events: none to allow for pass-through back to host.

Because of the use of pointer-events to achieve this, browser support is limited to those that support it (all modern ones as of today 02/22) [see here](https://caniuse.com/pointer-events)

## Table of contents

- [Project Name](#project-name)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Serving the app](#serving-the-app)
    - [Running the tests](#running-the-tests)
    - [Building a distribution version](#building-a-distribution-version)
    - [Serving the distribution version](#serving-the-distribution-version)
  - [API](#api)
    - [initializeHost](#initializeHost)
      - [Options](#options)
    - [initializeMetaFrame](#initializeMetaFrame)
      - [Options](#options)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

To install and set up the library, run:

```sh
$ npm install -S drift-meta-frame
```

or with Yarn:

```sh
$ yarn add --dev drift-meta-frame
```

## Usage

### Setting up your host

```js
  import { initializeHost } from 'drift-meta-frame';

  ...

  initializeHost({
    log: false,
    meta_frame_origin: 'https://mydomain.com/drift'
  });
```

### Setting up your frame

```js
  import { initializeMetaFrame } from 'drift-meta-frame';

  ...

  initializeMetaFrame({
    embed_id: 'your_drift_embed_id'
  });
```

## API

### initializeMetaFrame

```js
  initializeMetaFrame({
    embed_id: 'your_drift_embed_id'
  });
```

#### Options

`embed_id`

| Type   | Default value |
| ------ | ------------- |
| string | ''            |

### initializeHost

```js
  initializeHost({
    log: false,
    meta_frame_origin: 'https://mydomain.com/drift'
  });
```

#### Options

`log`

| Type              | Default value |
| ----------------- | ------------- |
| boolean           | false         |
| meta_frame_origin | ''            |

## License

[MIT License](LICENSE.md) © Dimitrios Kennedy-Kavouras
