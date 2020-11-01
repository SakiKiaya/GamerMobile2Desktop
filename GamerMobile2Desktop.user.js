// ==UserScript==
// @name         GamerMobile2Desktop
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Change gamer mobile site to  desktop site
// @author       You
// @match        http*://m.gamer.com.tw/forum/*
// @grant        GM_addStyle
// ==/UserScript==

function getDesktopUrl()
{
    var objUrl, sBsn, sSnA, sUrl, sPathname_M, sPathname_D;
    objUrl = new URL(sUrl = window.location.href);

    // Mobile pathname to Desktop pathname
    sPathname_M = objUrl.pathname;
    sPathname_D = sPathname_M.replace("/forum/","/");
    console.log("[sPathname_M] = " + sPathname_M);
    console.log("[sPathname_D] = " + sPathname_D);

    // Get Item Id
    sBsn = objUrl.searchParams.get('bsn');
    console.log("[bsn] = " + sBsn);

    // sSnA
    sSnA = objUrl.searchParams.get('snA');
    console.log("[snA] = " + sSnA);

    // Combine the target url
    sUrl = objUrl.origin.replace('//m.', '//forum.') + sPathname_D + "?bsn=" + sBsn;
    if (sSnA)
    {
        sUrl = sUrl + sPathname_D + "?bsn=" + sBsn + "&snA=" + sSnA;
    }
    console.log("[sUrl] = " + sUrl);
    return sUrl;
};

function addBtn(str)
{
    var objMainDiv, sItem, sUrl;
    var sSvg;

    // Slect Main Div
    objMainDiv = document.querySelector("body > header > p.trbtn");

    // Append item to share block
    sUrl = getDesktopUrl();
    sSvg = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="28" height="28" viewBox="0 0 172 172"style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M28.66667,22.93333c-6.33533,0 -11.46667,5.13133 -11.46667,11.46667v80.26667c0,6.33533 5.13133,11.46667 11.46667,11.46667h114.66667c6.33533,0 11.46667,-5.13133 11.46667,-11.46667v-80.26667c0,-6.33533 -5.13133,-11.46667 -11.46667,-11.46667zM28.66667,34.4h114.66667v68.8h-114.66667zM86,108.93333c3.1648,0 5.73333,2.56853 5.73333,5.73333c0,3.1648 -2.56853,5.73333 -5.73333,5.73333c-3.1648,0 -5.73333,-2.56853 -5.73333,-5.73333c0,-3.1648 2.56853,-5.73333 5.73333,-5.73333zM57.33333,137.6c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h57.33333c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843z"></path></g></g></svg>';
    sItem = '<a href="'+ sUrl + '"><i id="img_Desktop" class="fa">' + sSvg + '</i></a>';
    objMainDiv.insertAdjacentHTML('beforeend', sItem);
};

var objCheckPage = setInterval(checkPage, 100);
function checkPage()
{
    // var item;
    // item = document.querySelector("#main > div > div.shopee-page-wrapper > div.page-product > div.container > div:nth-child(3) > div._1zBnTu.page-product__shop > div._1Sw6Er > div > div._1jOO4S");
    // if (item != null)
    {
        addBtn();
        clearInterval(objCheckPage);
    }
}