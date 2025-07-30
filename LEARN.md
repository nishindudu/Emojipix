# EmojiPix

## Working
1. User uploads an image which gets loaded onto an HTML5 Canvas
2. The image is then divided into blocks based on the selected block size
3. Each block's average colour is calculated
4. The emoji with the closest average colour is selected
5. This loops until all blocks are processed
6. The final image is displayed and can be downloaded or copied to clipboard

## Adding more emoji sets
- Create a new array of emojis and their average colour like this:
    ```
    const heartsOnly = [
      { emoji: '❤️', color: [220, 20, 60] },
      ...
    ];
    ```
- Add an option for the new set in the HTML file
- Modify the ```findNearestEmoji``` function to check for the new set


## 🔗 Resources
- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [Color difference Wikipedia page](https://en.wikipedia.org/wiki/Color_difference)
