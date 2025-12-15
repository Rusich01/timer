import { useEffect, useState } from "react";
import type { InitialStateType } from "./type/type";
import { calculateTime } from "./function/timer";
import { initialState } from "./state/InitialState";

const App = () => {
  const [time, setTime] = useState(initialState);
  const [listItem, setListItem] = useState<InitialStateType[]>([]);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    if (startTimer) {
      const interval = setInterval(() => {
        setTime((pr) => calculateTime(pr));
      }, 10);

      return () => clearInterval(interval);
    }
  }, [startTimer]);

  console.log();
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
          <h1 className="text-xl font-semibold text-center mb-4">⏱ Таймер</h1>

          <div className="text-4xl font-mono text-center mb-6 text-black">
            {`${String(time.minutes).padStart(2, "0")}:
            ${String(time.seconds).padStart(2, "0")}:
            ${String(time.milSeconds).padStart(2, "0")}`}
          </div>

          <div className="flex gap-3 mb-6">
            <button
              disabled={startTimer}
              onClick={() => setStartTimer(true)}
              className={`${
                startTimer
                  ? "flex-1 bg-gray-500 text-white py-2 rounded-xl hover:bg-gray-600 cursor-not-allowed"
                  : "flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
              }`}
            >
              start
            </button>

            <button
              disabled={!startTimer}
              onClick={() => {
                setStartTimer(false);
                setListItem((pr) => [...pr, time]);
              }}
              className={`${
                !startTimer
                  ? "flex-1 bg-gray-500 text-white py-2 rounded-xl hover:bg-gray-600 cursor-not-allowed"
                  : "flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
              }`}
            >
              stop
            </button>
          </div>
          <div>
            {listItem.length > 0 && (
              <p className=" bg-gray-400  w-full pt-0.5 mb-4"></p>
            )}

            <ul className="space-y-1">
              {listItem
                .sort((a, b) => {
                  const timeA: number =
                    a.minutes * 60000 + a.seconds * 1000 + a.milSeconds;
                  const timeB: number =
                    b.minutes * 60000 + b.seconds * 1000 + b.milSeconds;
                  return timeB - timeA;
                })
                .map((item, index) => (
                  <li
                    key={`${item.minutes}${item.seconds}${item.milSeconds}`}
                    className="text-sm text-black bg-gray-100 rounded-lg px-2 py-1"
                  >
                    <span className="pr-1.5">{index + 1}.</span>
                    {`${String(item.minutes).padStart(2, "0")}:${String(
                      item.seconds
                    ).padStart(2, "0")}:${String(
                      Math.floor(item.milSeconds / 10)
                    ).padStart(2, "0")}`}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
