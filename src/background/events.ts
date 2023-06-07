import {redirectUser} from './redirectUser'

const statusCode = [
  404, 408, 410, 451, 500, 502, 503, 504, 509, 520, 521, 523, 524, 525, 526
]

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    // only proceed this call if header response is something
    // we care about
    if (!statusCode.includes(details.statusCode)) {
      return
    }

    chrome.runtime.onMessage.addListener((message) => {
      if (message.authorizeRedirect) {
        return redirectUser(details.tabId, details.url)
      }
    })
  },
  {
    urls: ['<all_urls>'],
    types: ['main_frame']
  },
  ['blocking']
)
