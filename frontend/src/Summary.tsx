import {useSelector} from './store';
import {selectProgress} from './reducer';

export default function Summary({totalCount}: {totalCount: number}) {
  const doneCount = Object.values(useSelector(selectProgress))
    .reduce((a, v)=>a+(v?.progress??0), 0)/2;
  const leftCount = totalCount-doneCount;

  return <p>
    <table className="ProgressSummary">
      <tr>
        <td>完成</td>
        <td><span>{doneCount.toFixed(1)}</span> / <span>{totalCount.toFixed(1)}</span></td>
        <td>=</td>
        <td><span>{(doneCount/totalCount*100).toFixed(2)}%</span></td>
      </tr>
      <tr>
        <td>残り</td>
        <td><span>{leftCount.toFixed(1)}</span> / <span>{totalCount.toFixed(1)}</span></td>
        <td>=</td>
        <td><span>{(leftCount/totalCount*100).toFixed(2)}%</span></td>
      </tr>
    </table>
  </p>;
}
