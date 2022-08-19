import React, { useEffect, useState } from "react";

import {
  Col,
  Row,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";

function OverviewApp() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ): (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )
}
    </div>
  )
}
const OverviewRecognizer = () => {
  return (
    <OverviewApp/>
  );
}

export default OverviewRecognizer;
