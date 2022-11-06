<p align='center'><img src="src/assets/img/icon-128.png" width="64"/></p>
<h2 align='center'><strong>InkMark</strong></h2>
<br/>
<p align='center'>
InkMark is an <strong>open-source</strong> MIT-licensed <strong>browser extension</strong> designed to help you keep your colors lined up.<br/>InkMark will <strong>store</strong> and help you manage colors you've gathered from across the web, mark them as <strong>favorites</strong>, <strong>order</strong> them by usage or type, and help you <strong>tag</strong> them as you wish.
</p>


## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
6. Happy hacking.


### Packing

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.
