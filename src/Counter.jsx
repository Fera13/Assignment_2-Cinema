import { Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { returnNames } from "../js/server";

export function Counter({ name }) {
  const [counter, setCounter] = useState(0);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    returnNames().then((names) => setNames(names));
  }, []);
  console.log(names);
  useEffect(() => {
    console.log(counter);
  }, [counter]);
  return (
    <Card className="" bg="black">
      <h1>{name}</h1>
      <button onClick={() => setCounter((counter) => counter + 1)}>
        count is {counter}
      </button>
      {numbers.map((number) => {
        return <a>{number}</a>;
      })}
    </Card>
  );
}
