/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-escape */
!(function() {
  var hostname = location.hostname;
  if (
    (hostname === "www.v-hiker.cn" || hostname === "v-hiker.cn") &&
    !document.querySelectorAll(
      "script[data-ad-client='ca-pub-2371377729547805']"
    ).length
  ) {
    var tag = document.createElement("script");
    tag.async = true;
    tag.setAttribute("data-ad-client", "ca-pub-2371377729547805");
    tag.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    document.head.appendChild(tag);
  }
})();
(function() {
  var bp = document.createElement("script");
  var curProtocol = window.location.protocol.split(":")[0];
  if (curProtocol === "https") {
    bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
  } else {
    bp.src = "http://push.zhanzhang.baidu.com/push.js";
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();
(function() {
  var canonicalURL, curProtocol;

  //Get the <link> tag

  var x = document.getElementsByTagName("link");

  //Find the last canonical URL

  if (x.length > 0) {
    for (let i = 0; i < x.length; i++) {
      if (x[i].rel.toLowerCase() === "canonical" && x[i].href) {
        canonicalURL = x[i].href;
      }
    }
  }

  //Get protocol

  if (!canonicalURL) {
    curProtocol = window.location.protocol.split(":")[0];
  } else {
    curProtocol = canonicalURL.split(":")[0];
  }

  //Get current URL if the canonical URL does not exist

  if (!canonicalURL) canonicalURL = window.location.href;

  //Assign script content. Replace current URL with the canonical URL

  !(function() {
    var e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi,
      r = canonicalURL,
      t = document.referrer;
    if (!e.test(r)) {
      var n =
        String(curProtocol).toLowerCase() === "https"
          ? "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif"
          : "//api.share.baidu.com/s.gif";
      t
        ? ((n += "?r=" + encodeURIComponent(document.referrer)),
          r && (n += "&l=" + r))
        : r && (n += "?l=" + r);
      var i = new Image();
      i.src = n;
    }
  })(window);
})();
