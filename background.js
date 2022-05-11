// background.js
chrome.runtime.onInstalled.addListener(function (details){
    if(details.reason == "install"){
        // 첫 설치시 실행할 코드
    }
    else if(details.reason == "update"){
        // 버전 업데이트 또는 확장 프로그램에서 새로고침시
    }
});


function copyCookie(url, cookie) {
    let newCookie = {};
    const domainMap = {
        '.src1': '.target1',
        '.src2': '.target2'
    };
    if(domainMap[cookie.domain] === undefined) return;

    newCookie.url = url.replace(cookie.domain, domainMap[cookie.domain]);
    newCookie.name = cookie.name;
    newCookie.domain = domainMap[cookie.domain];
    newCookie.expirationDate = cookie.expirationDate;
    newCookie.httpOnly = cookie.httpOnly;
    newCookie.path = cookie.path;
    newCookie.value = cookie.value;
    chrome.cookies.set(newCookie, function (cookie) {
        console.log(`DEBUG: Cookie Copied. (name=${newCookie.name}, domain=${newCookie.domain}, value=${newCookie.value})`);
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let targetCookie = ['name1', 'name2'];

    targetCookie.forEach((cookieName) => {
        chrome.cookies.get({ url: sender.tab.url, name: cookieName }, (cookie) => {
            if (cookie) {
                copyCookie(sender.tab.url, cookie);
            }
            else {
                console.log('Can\'t get cookie! Check the name!');
            }
        });
    });
      
    // if (request.action === "FINISH") sendResponse({farewell: "goodbye"});
});