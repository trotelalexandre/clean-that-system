# Clean That System 🚀

## What is this?

Do you ever look at your computer and think, "Is everything running smoothly or have I secretly become a hoarder of resources?" Well, **Clean That System** is here to help you clean up your act! 🧹

This nifty little package will inspect your system like an overzealous detective 👀, checking everything from CPU 🧠, memory 💾, and disk storage 💽, to your browser cache 🌐. It even manages your Docker images 🐳. Just sit back, relax, and let the system-cleaning magic happen! ✨

## Features

- 💻 **CPU Check**: Is your processor feeling the heat? We’ll find out!
- 🧠 **Memory Check**: Running out of RAM? Let’s take a look.
- 💽 **Disk Check**: Too many files on your hard drive? We’ll clean that up.
- 🌐 **Network Check**: Does your internet speed need a tune-up? We got you!
- 🧑‍💻 **Browser Cache Cleanup**: Because who doesn’t love clearing cache? 🥳
- 🐳 **Docker Image Management**: Keep your Docker images tidy and efficient!
- 🧹 **Dry Run and Backup Options**: Don't worry, no system changes unless you say so!

## Installation

Install it globally with npm:

```bash
npm install -g clean-that-system
```

## Usage

After installing, just run the following command to start cleaning:

```bash
cts # Normal mode
cts [OPTIONS] # See the options section
```

### Options

- `--dryRun`: Inspect everything without making any changes (because sometimes we just want to know, right?).
- `--backup`: Back up your browser cache before cleaning, because we know you’re sentimental about your web history. 😅

## How it works

1. The script checks **CPU**, **Memory**, **Disk**, **Network**, and **Browser Cache**.
2. If something’s not quite right, it will give you **advice** on how to fix it. Think of it as a virtual cleaning service.
3. You get to choose whether to **act on** that advice or just chill with the knowledge that everything is fine. 😎

## Why should you use this?

Because who likes a slow, cluttered computer? This is the perfect tool for when you just want your system to be running like a well-oiled machine. You wouldn’t live in a dirty house, so why live with a cluttered system? 😰

## Example

```bash
cts --dryRun
```

And that’s it! Your system is now _almost_ clean, and you can inspect how things are running. If you’re feeling brave, run it without the `--dryRun` flag to actually do the cleaning. 🧹

## License

MIT License. Clean responsibly!
