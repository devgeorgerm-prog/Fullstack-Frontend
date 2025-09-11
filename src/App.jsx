import { useState } from "react";

const Button = ({onClick, text}) => <><button onClick={onClick}>{text}</button></>

export default function App() {
  const [value, setValue] = useState(10);
  const setToValue = (newValue) => () => {
    console.log('Value now', newValue);
    setValue(newValue);
  }
  return(
    <>
      {value}
      <Button onClick={setToValue(1000)} text='Thousand'/>
      <Button onClick={setToValue(0)} text='Resest'/>
      <Button onClick={setToValue(value + 1)} text='Increment'/>
    </>
  )
}