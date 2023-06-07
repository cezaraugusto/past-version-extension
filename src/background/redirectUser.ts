export function isEmpty(obj: object) {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

export function redirectUser(tabId: number, url: string) {
  const waybackMachineURL: string = `https://archive.org/wayback/available?url=${url}`
  window
    .fetch(waybackMachineURL)
    .then((response) => response.json())
    .then((data) => {
      if (!isEmpty(data.archived_snapshots)) {
        const closestArchivedUrl: string = data.archived_snapshots.closest.url
        chrome.tabs.update(tabId, {url: closestArchivedUrl})
      } else {
        // the wayback machine has no records of this website,
        // in this case we redirect to our custom URL
        // TODO: we need a proper spec for this
        chrome.tabs.update(tabId, {
          url: '../src/no-archive.html'
        })
      }
    })
    .catch((error) =>
      console.error(
        'Unable to fetch the archived version of this page. Reason:',
        error
      )
    )
}
