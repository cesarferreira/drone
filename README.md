# drone
> The missing package manager for Android

 <p align="center">
  <img src="https://raw.githubusercontent.com/cesarferreira/assets/master/images/screenshot_terminal_hello_world.png" width="100%" />
</p> 

Me, as an android developer was envious of yarn for the fast, reliable, and secure dependency management that the nodejs community, it's so easy to write `yarn add request` and get started using this HTTP library... So I made one for android :)

<!-- > `drone` add `username/repository` to `module` -->



<!-- [![Build Status](https://travis-ci.org/cesarferreira/drone.svg?branch=master)](https://travis-ci.org/cesarferreira/drone)
[![npm](https://img.shields.io/npm/dt/drone.svg)](https://www.npmjs.com/package/drone)
[![npm](https://img.shields.io/npm/v/drone.svg)](https://www.npmjs.com/package/drone) -->

## Install

```sh
npm install --global drone
```

## Usage
Simple usage:
> `drone` add `username/repository` to `module`

```bash
 Usage
   $ drone <command> <params>

   $ drone install                          # downloads the packages
   $ drone add <username/repo> <module>     # opens current pull request page
   $ drone info <username/repo>             # retrieves the info for this package
   $ drone create <todo>                    # creates a new one if it's not in the server yet
   
   # Multiline
   $ drone create square/picasso  \
          --homepage http://square.github.io/picasso \
          --description "image downloading and caching library" \
          --dependency com.squareup.picasso:picasso \
          --server jcenter

 Examples
   $ drone info square/picasso to module
   $ drone add reactivex/rxjava to module
   $ drone add square/retrofit to module
   $ drone add support/design to module
   $ drone add google/gson to module
   
   $ drone create square/picasso --dependency com.squareup.picasso:picasso
```

## Created by
[Cesar Ferreira](https://cesarferreira.com)

## License
MIT © [Cesar Ferreira](http://cesarferreira.com)
