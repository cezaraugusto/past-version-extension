# Past Version Browser Extension

The "Past Version" browser extension checks for an archived version of a website if a page is not found. It allows users to access historical versions of web pages stored in web archives.

<img width="1374" alt="image" src="https://github.com/extension-create/extension-create/assets/4672033/20272539-be2d-49e2-8345-fededf34c16d">

## Installation

### Local Development

1. Clone the repository:

```shell
   git clone https://github.com/cezaraugusto/past-version-extension.git
```

2. Navigate to the project directory:

```shell
cd past-version-extension
```

3. Install the dependencies:

```shell
npm install
```

4. Build the extension:

```
shell
npm run build
```

## Loading the Extension in Browser

1. Open your browser and go to the Extensions page.
2. Enable Developer Mode.
3. Click on "Load unpacked" or "Load extension" button.
4. Select the `past-version` directory where you manifest file is.
5. The "Past Version" extension should now be loaded and active in your browser.


## Usage
Once the extension is installed and active, it will automatically detect when a web page is not found (HTTP 404 error). It will then check for an archived version of the page and provide a link to access the past version if available.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

MIT (c) Cezar Augusto.