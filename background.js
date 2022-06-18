/* chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({});
}); */

chrome.runtime.onConnect.addListener(port => {
  const {name: pageKey} = port;
  port.onMessage.addListener(({topic, payload}) => {
    if (topic === 'setProgress') {
      chrome.storage.sync.get(pageKey, ({[pageKey]: data}) => {
        const {key, item} = payload;
        chrome.storage.sync.set({[pageKey]: {...data, [key]: item}});
        port.postMessage({topic, payload});
      });
    } else if (topic === 'getAllProgress') {
      chrome.storage.sync.get(pageKey, ({[pageKey]: data}) => {
        port.postMessage({topic: 'setAllProgress', payload: data ?? {}});
      });
    }
  });
});
