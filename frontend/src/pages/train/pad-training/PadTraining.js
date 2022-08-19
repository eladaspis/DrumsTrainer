import React, { Component , useState} from "react";

import {
  Col,
  Row,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";

import {ScoreEditor} from 'react-music-score';
import 'react-music-score/dist/index.css';
import CardExercise from "../../../components/CardExercise/CardExercise";
import Popup from "../../../components/Popup/Popup";
import Exercise from "../../../components/Exercise/Exercise";
const PadTraining = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div>
      <Row>
        {/* <Col className="pr-grid-col" xs={12} lg={6}>
          <Row className="gutter mb-4">
            <Col> */}
            <CardExercise onClick={() => setButtonPopup(true)}
                          className="p-md" header_image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553128/shop-talk-show.jpg" show_title="Basic Training" show_description="-"/>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <Exercise duration={10}/>
            </Popup>
            {/* </Col> */}
            {/* <Col>
            <CardExercise header_image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553128/shop-talk-show.jpg" show_title="Advanced Training" show_description="-"/>
            </Col>
            <Col>
            <CardExercise header_image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553128/shop-talk-show.jpg" show_title="Custom Training" show_description="-"/>
            </Col> */}
          {/* </Row> */}
          {/* <Row className="gutter mb-4">
            <Col>
              <Widget className="widget-p-md">
                <div className="headline-2 mb-3">Basic Pad Training</div>
                <li margin-left="10">
                  Single Stroke Roll
                </li>
                <li>
                  Double Stroke Roll
                </li>
              </Widget>
            </Col>
          </Row> */}
        {/* </Col> */}
        {/* <Col className="pr-grid-col" xs={12} lg={6}>
          <Row className="gutter mb-4">
            <Col>
              <Widget className="widget-p-md">
                <div className="headline-2 mb-3">Choose Your Own Exercises</div>
              </Widget>
            </Col>
          </Row>
        // </Col> */}
      </Row>
    </div>
  );
}

export default PadTraining;
