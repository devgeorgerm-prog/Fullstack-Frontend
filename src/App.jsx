import { useState } from "react";
const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <>The app is used by pressing the buttons</>;
  }
  return <>button pressed history: {allClicks.join(" ")}</>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  const [total, setTotal] = useState(0);
  const onHandleLeftClick = () => {
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setAllClicks(allClicks.concat("L"));
    setTotal(updatedLeft + right);
  };

  const onHandleRightClick = () => {
    const updatedRight = right + 1;
    setRight(updatedRight);
    setAllClicks(allClicks.concat("R"));
    setTotal(updatedRight + left);
  };

  const Button = ({onClick, text}) => <><button onClick={onClick}>{text}</button></>
  return (
    <>
      {left}

      <Button onClick={onHandleLeftClick} text="Left"/>
      <Button onClick={onHandleRightClick} text="Right"/>
      {right}
      <br />
      <History allClicks={allClicks} />

      <br />
      {total}
    </>
  );
};

export default App;
  