const { parse } = require("path");

function parseUserAgent(userAgent) {
  let browserName = "Unknown Browser";
  let fullVersion = "Unknown Version";

  // Check for various browser signatures in the User-Agent string
  const isChrome = userAgent.indexOf("Chrome") > -1;
  const isFirefox = userAgent.indexOf("Firefox") > -1;
  const isSafari = userAgent.indexOf("Safari") > -1 && !isChrome;
  const isIE = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1;

  if (isChrome) {
    browserName = "Chrome";
    fullVersion = userAgent.split("Chrome/")[1].split(" ")[0];
  } else if (isFirefox) {
    browserName = "Firefox";
    fullVersion = userAgent.split("Firefox/")[1];
  } else if (isSafari) {
    browserName = "Safari";
    fullVersion = userAgent.split("Version/")[1].split(" ")[0];
  } else if (isIE) {
    browserName = "Internet Explorer";
    fullVersion = userAgent.split("MSIE ")[1].split(";")[0] || userAgent.split("rv:")[1].split(")")[0];
  }

  return `${browserName} ${fullVersion}`;
}

module.exports = parseUserAgent