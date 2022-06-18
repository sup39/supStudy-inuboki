import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {setAllProgress, setProgress} from './reducer';
import './index.sass';
import App from './App';
import Summary from './Summary';

const articles = document.querySelectorAll('.sidelong__article');
if (articles.length) {
  const pageKey = window.location.pathname.replace(/^\/|\/$/g, '');

  const port = chrome.runtime.connect({name: pageKey});
  port.onMessage.addListener(({topic, payload}) => {
    if (topic === 'setAllProgress') {
      store.dispatch(setAllProgress(payload));
    } else if (topic === 'setProgress') {
      store.dispatch(setProgress(payload));
    }
  });
  port.postMessage({topic: 'getAllProgress'});

  /* const port: any = {
    postMessage({topic, payload}: {topic: string, payload: any}) {
      if (topic !== 'setProgress') return;
      setTimeout(() => {
        store.dispatch(setProgress(payload));
      }, 1000);
    },
  }; */

  document.querySelectorAll('.sidelong__article').forEach(p => {
    const href = p.querySelector('a')?.href;
    if (href == null) return;
    const itemKey = href.split('/').slice(-2)[0];

    const div = document.createElement('div');
    p.appendChild(div);

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App itemKey={itemKey} port={port}/>
        </Provider>
      </React.StrictMode>,
      div,
    );
  });

  const summary = document.querySelector('.entry-content > p');
  if (summary) { // TODO
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <Summary totalCount={articles.length} />
        </Provider>
      </React.StrictMode>,
      summary,
    );
  }
}
