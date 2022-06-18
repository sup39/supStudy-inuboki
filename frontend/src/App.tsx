import {useSelector} from './store';
import {ProgressItem, selectProgress} from './reducer';

type Port = ReturnType<typeof chrome.runtime.connect>;

const progressValues = [null, 0, 1, 2] as (null|ProgressItem['progress'])[];
export default function App({itemKey, port}: {itemKey: string, port: Port}) {
  const progress = useSelector(selectProgress)[itemKey]?.progress ?? null;

  return <table className="sidelong__link ProgressItemRoot"><tr>{progressValues.map(val =>
    <td key={val}
      className={'ProgressItem_'+val+(val===progress ? ' selected' : '')}
      onClick={() => port.postMessage({topic: 'setProgress', payload: {
        key: itemKey,
        item: val == null ? null : {progress: val, lastStudy: new Date()},
      }})}
    />,
  )}</tr></table>;
}
