const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const http = require("https");

GetWallpaper = async () => {
  const url = "https://www.bing.com/";

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const element = $(".hp_top_cover").attr("style");
      const styleStr = element.substring(
        element.indexOf("/"),
        element.indexOf(")")
      );
      const wallpaperUrl = url + styleStr;
      Download(wallpaperUrl);
    } else {
      console.log(error);
    }
  });
};

Download = (url) => {
  const file = fs.createWriteStream("wallpaper.jpg");
  const request = http.get(url, function (response) {
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("Download completed");
    });
  });
};

GetWallpaper();
