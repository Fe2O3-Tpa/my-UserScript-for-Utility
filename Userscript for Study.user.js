// ==UserScript==
// @name         勉強のためのUserscript
// @version      1.0.2
// @description  深夜の動画視聴・サイト閲覧を禁止。YouTubeShortsとXも禁止。
// @match        https://*/*
// @match        http://*/*
// @exclude      https://youtube.com
// @exclude      https://google.com
// @run-at       document-start
// ==/UserScript==

// 説明
// URLの変化を察知し、処理を実行する。
// --処理--
// YouTubeShortsであった場合YouTubeのホームに移動。
// 深夜であった場合、問答無用でYouTubeのホームまたはGoogleのホームに移動。
// Xであった場合Googleのホームに移動。

// 初回実行
doAll()

// イベントの処理
addEventListener("urlChange", () => {
    doAll();
})

// --Observer--
let lastUrl = location.href;
const observer = new MutationObserver(() => {
    if (lastUrl !== location.href) {
        lastUrl = location.href;
        window.dispatchEvent(new CustomEvent('urlChange'));
    }
});

observer.observe(document, { subtree: true, childList: true });
// 1. documentの変化を監視
// 2. 変化があるとMutationObserverのコールバックを実行(urlChangeを発火)

const doAll = () => {
    // 1回のリダイレクトをすべてする
    const redirectTarget = redirectTo();
    if (redirectTarget !== lastUrl) {
        location.replace(redirectTarget);
    }
}

function redirectTo() {
    // リダイレクト先を選ぶ
    let date = new Date();
    const isShort = lastUrl.includes("/shorts/") && lastUrl.includes("youtube");
    if (isShort) {
        return "https://www.youtube.com/watch?v=wBf47hGMch0";
    }
    if (lastUrl.includes("x.com")) {
        return "https://www.google.com";
    }
    if (date.getHours() >= 23 | date.getHours() <= 5) {
        if (!lastUrl.includes("youtube.com")) {
            return "https://www.google.com";
        } else {
            return "https://www.youtube.com";
        }
    }
    return lastUrl;
}
