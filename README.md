<p align="center"><a href="http://cesarferreira.com/drone" target="_blank"><img width="100"src="./extras/logo.png"></a></p>
<h1 align="center">Drone</h1>
<p align="center">The missing package manager for Android Developers <sup>(beta)</sup></p>
<p align="center">
  <a href="https://travis-ci.org/cesarferreira/drone"><img src="https://travis-ci.org/cesarferreira/drone.svg?branch=master" alt="Build Status"></a>
  <a href="https://codecov.io/gh/cesarferreira/drone"><img src="https://img.shields.io/npm/dt/drone.svg" alt="npm"></a>
  <a href="https://codecov.io/gh/cesarferreira/drone"><img src="https://img.shields.io/npm/v/drone.svg" alt="npm"></a>
  <a href="https://cesarferreira.com/drone"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>


### Summary

- :tada: Small file size (7kb minified + gzip)
- :zap: Blazing fast performance
- :rocket: Intuitive, easy-to-learn API
- :gem: Powerful directives
- :hammer: Compose with Components

### What is it?

Me, as an android developer was jealous of the nodejs community for their fast and reliable dependency managers, it's so easy to write `yarn add <library>` and the library is imported into the project... So I made `drone` for android!

## Install

```sh
npm install -g drone
```

## Usage
Simple usage:
> `drone` add `creator/library` `module`

<p align="center">
<img src="extras/ss_usage_cropped.png" width="100%" />
</p>

```
Usage

   $ drone <command> <params>

   $ drone install                            # Downloads the packages
   $ drone test <creator/library>             # Tests the library by fetching its version
   $ drone add <creator/library> <module>     # Adds a dependency to a module
   $ drone info <creator/library>             # Retrieves the info for this package
   $ drone update                             # Get the latest packages
   $ drone list                               # List all of the packages
   $ drone stats                              # Get some stats regarding the hive
   $ drone hive                               # Opens the hive url
   $ drone open <creator/library>             # Opens the library's homepage
   $ drone new                                # Creates a new one if it's not in the server yet
   $ drone search <library>                   # Searches for the 'library' in the hive

 Examples

   $ drone install                            # Downloads the packages
   $ drone info square/picasso                # Shows the info for square/picasso
   $ drone add square/retrofit app            # Adds retrofit to the 'app' module 
   $ drone open google/gson                   # Opens GSONs homepage
   $ drone new                                # takes you throught the creation wizard
   $ drone search rxjava                      # Searches the hive for 'rxjava'
   $ drone test square/picasso                # Tests the library by fetching its version
```

# Where are the libraries?

Instead of maintaining a server with all the possible libraries I'm going with a [brew](https://brew.sh/) approach, the community will `create` a library `once` and it will be available to everyone else forever in the [hive](https://github.com/cesarferreira/drone-hive)!

> $ drone new

follow the wizard to generate the `<library>.json` file then open the pull request in the [hive](https://github.com/cesarferreira/drone-hive) with this format: 
> **hive/`<creator/library>`.json**


<p align="center">
<img src="extras/create.png" width="100%" />
</p>

## Created by
[Cesar Ferreira](https://cesarferreira.com)
<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

## License
MIT © [Cesar Ferreira](http://cesarferreira.com)
