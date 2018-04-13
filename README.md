<p align="center"><a href="https://github.com/cesarferreira/drone" target="_blank"><img width="200"src="extras/logo.png"></a></p>
<h1 align="center">Drone</h1>
<p align="center">The missing library manager for Android Developers</p>
<p align="center">
  <a href="https://travis-ci.org/cesarferreira/drone"><img src="https://travis-ci.org/cesarferreira/drone.svg?branch=master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/drone"><img src="https://img.shields.io/npm/dt/drone.svg" alt="npm"></a>
  <a href="https://www.npmjs.com/package/drone"><img src="https://img.shields.io/npm/v/drone.svg" alt="npm"></a>
  <a href="https://github.com/cesarferreira/drone/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>


### Summary

- :zap: Blazing fast way to add libraries
- :tada: No need to search the web for `that` library
- :rocket: Intuitive, easy-to-learn tool
- :gem: Add multiple dependencies with a one liner
- :v: Automated dependency and package management
- :hammer: Automatic import custom urls (e.g. jitpack)

## Usage
Simple usage:
> drone add `<library>` `<module>`

--------

Single library
> drone add `picasso` app

Multiple
> drone add `picasso` `retrofit` `rxjava` `gson` app

<p align="center">
<img src="extras/add4.gif" width="100%" />
</p>

```
Usage

   $ drone <command> <params>

   $ drone install                            # Downloads the packages
   $ drone test <library>                     # Tests the library by fetching its version
   $ drone add <library> <module>             # Adds a dependency to a module
   $ drone remove <library> <module>          # Removes the dependency from a module
   $ drone info <library>                     # Retrieves the info for this package
   $ drone update                             # Get the latest packages
   $ drone list                               # List all of the packages
   $ drone stats                              # Get some stats regarding the hive
   $ drone hive                               # Opens the hive url
   $ drone open <library>                     # Opens the library's homepage
   $ drone search <library>                   # Searches for the 'library' in the hive

 Examples

   $ drone install                            # Downloads the packages
   $ drone info picasso                       # Shows the info for picasso
   $ drone add retrofit app                   # Adds retrofit to the 'app' module 
   $ drone rm retrofit app                    # removes retrofit from the 'app' module 
   $ drone open gson                          # Opens GSONs homepage
   $ drone search rxjava                      # Searches the hive for 'rxjava'
   $ drone test picasso                       # Tests the library by fetching its version
```

## Install

```sh
npm install -g drone
```

### What is it?

As an android developer I was jealous of the node.js community for their fast and reliable dependency managers, it's so easy to write `yarn add <library>` and a library is imported into the project... So I made `drone` for android!

If you think about it there are like 50 libraries that are used in 95% of the apps (retrofit, rxjava, gson, picasso, roboletric, recyclerview-v7, etc.)

I made this because every time I want to add (lets say) butterknife I need to
1. google butterknife
2. go to the readme
3. find the lines to copy
4. notice that butterknife has 2 dependencies
5. copy and paste in my gradle file
6. OPTIONAL if it was not in jcenter, go to the main build gradle and put the custom URL

OR...

```sh
drone add butterknife
```
and everything will be done for you automatically

# Where are the libraries?

Instead of maintaining a server with all the possible libraries I'm going with a [brew](https://brew.sh/) approach, the community will `create` a library `once` and it will be available to everyone else forever in the [hive](https://github.com/cesarferreira/drone-hive)!


Follow the instructions to create the `<library>.json` file then open the pull request in the [hive](https://github.com/cesarferreira/drone-hive)

## Created by
[Cesar Ferreira](https://cesarferreira.com)

## License
MIT © [Cesar Ferreira](http://cesarferreira.com)

## Logo
by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/free-icon/drone_196493#term=drone&page=1&position=15" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
