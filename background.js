// Disable custom Azure portal

'use strict';

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
      if( details.url == "https://portal.azure.com/" )
          return {redirectUrl: "https://portal.azure.com/?feature.customportal=false" };
  },
  {urls: ["https://portal.azure.com/*"]},
  ["blocking"]);
  chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      // With a new rule ...
      chrome.declarativeContent.onPageChanged.addRules([
        {
          // That fires when a page's URL contains a 'portal.azure.com' ...
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: 'portal.azure.com' },
            })
          ],
          // And shows the extension's page action.
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
    });
  });
