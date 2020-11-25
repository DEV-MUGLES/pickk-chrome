# Pickk-Chrome 🤖

expressjs, puppeteer, typescript

Crawl clothes info, option data

## Getting Started 🚀

We use `node` version `14.9.0`

```shell
$ nvm install 14.9.0
```

```shell
$ nvm use 14.9.0
```

Then just start the server with

```shell
$ yarn install
$ yarn dev
```

It uses nodemon for livereloading

## 🔥 How to solve puppeteer loading error in ubuntu

```
  /root/node_modules/puppeteer/.local-chromium/linux-800071/chrome-linux/chrome: error while loading shared libraries: libgbm.so.1: cannot open shared object file: No such file or directory

TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

    at onClose (/root/node_modules/puppeteer/lib/cjs/puppeteer/node/BrowserRunner.js:193:20)
    at Interface.<anonymous> (/root/node_modules/puppeteer/lib/cjs/puppeteer/node/BrowserRunner.js:183:68)
    at Interface.emit (events.js:326:22)
    at Interface.close (readline.js:424:8)
    at Socket.onend (readline.js:202:10)
    at Socket.emit (events.js:326:22)
    at endReadableNT (_stream_readable.js:1252:12)
    at processTicksAndRejections (internal/process/task_queues.js:80:21)

(Use `node --trace-warnings ...` to show where the warning was created)
(node:28207) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:28207) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
^Croot@gcloud-seoul-4157f23167c3094e65f8465be8f65f1e:~# sudo apt-get install libgbm-dev

```

you have to install base librarys

```shell
$ sudo apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev
$ sudo apt-get install libgconf-2-4 libnss3 libxss1
$ sudo apt-get install libasound2 libxtst6 xauth xvfb
$ sudo apt-get install libgbm-dev
```

[ref](https://velog.io/@shelly/ubuntu%EC%97%90%EC%84%9C-puppeteer-%EC%8B%A4%ED%96%89-%EC%98%A4%EB%A5%98)
