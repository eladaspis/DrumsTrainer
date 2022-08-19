import React from "react";

import {
  Col,
  Row,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Exercise from "../../../components/Exercise/Exercise";
const ReadingTraining = () => {
  return (
    <div>
      <Row>
        <Col className="pr-grid-col" xs={12} lg={6}>
          <Row className="gutter mb-4">
            <Col>
              <Widget className="widget-p-md">
              <div className="headline-2 mb-3">Basic Pad Training</div>
                <Exercise duration={20}/>
              </Widget>
            </Col>
          </Row>
          <Row className="gutter mb-4">
            <Col>
              <Widget className="widget-p-md">
                <div className="headline-2 mb-3">Basic Pad Training</div>
              </Widget>
            </Col>
          </Row>
        </Col>
        <Col className="pr-grid-col" xs={12} lg={6}>
          <Row className="gutter mb-4">
            <Col>
              <Widget className="widget-p-md">
                <div className="headline-2 mb-3">Choose Your Own Exercises</div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ReadingTraining;
