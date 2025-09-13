import { useState } from "react";

// The Button component is correct as is
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad, allFeedback, average, positive }) => {
  if (allFeedback == 0) {
    return <>No feedback given</>;
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={allFeedback} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const App = () => {
  // Use state only for the core data
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Event handler functions
  const goodFeedback = () => {
    setGood(good + 1);
  };

  const neutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const badFeedback = () => {
    setBad(bad + 1);
  };

  // Calculate derived state values directly
  const allFeedback = good + neutral + bad;
  const average = allFeedback > 0 ? (good - bad) / allFeedback : 0;
  const positive = allFeedback > 0 ? (good / allFeedback) * 100 : 0;

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button onClick={goodFeedback} text="Good" />
        <Button onClick={neutralFeedback} text="Neutral" />
        <Button onClick={badFeedback} text="Bad" />
      </div>

      <br />
      <h2>Statistics</h2>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allFeedback={allFeedback}
        average={average.toFixed(2)}
        positive={`${positive.toFixed(2)}%`}
      />
    </div>
  );
};

export default App;
