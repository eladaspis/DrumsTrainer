import React, { Component, useState, useEffect, CSSProperties } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {
    Container,
    Row, Col
}from 'reactstrap';
import Widget from "../../components/Widget/Widget.js";
import s from "./Exercise.module.scss";
import SheetMusic from 'react-sheet-music';
import {Notation} from 'react-abc';

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import Metronome from './Metronome/Metronome.js';
  
export default function Exercise ({ ...props }) {
    const [exerciseDetails, setExerciseDetails] = useState({});
    let [exerciseId, setExerciseId] = useState(0);
    let [loading, setLoading] = useState(false);
  


    useEffect(() => {
        var url = `/get-exercises`;
        setLoading(true);    
        fetch(url).then(
            res => res.json()
            .then(data => {
                // console.log(data);
                setExerciseDetails(data);
                // console.log(exerciseDetails)
            })
            .catch(err => {
                console.log(err);
            })
        )
        setLoading(false);
    }, []);

    
    function updateExerciseId() {
        if(exerciseId + 1 === exerciseDetails.length){
            setExerciseId(0);
        }
        else {
            setExerciseId(exerciseId+1);
        }
    }
    if (exerciseId === -1) {
        console.log(exerciseId)
        return (
            <Container>
                <Row>
                    <Col class='mx-auto'>
                        <ClipLoader
                        sizeUnit={"px"}
                        size={35}
                        color={'#4c54e4'}
                        loading={true}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }

    else if(loading || exerciseDetails.length === 0 || exerciseDetails[exerciseId] === undefined) {
        console.log(exerciseId)
        return (
            <Container>
                <Row>
                    <Col className={s.sheetCol}>
                        <ClipLoader
                        sizeUnit={"px"}
                        size={35}
                        color={'#4c54e4'}
                        loading={true}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        console.log(exerciseId)
        return (
            <Container>
                     <Row>
                         <Col>
                           <h2>{exerciseDetails[exerciseId].name}</h2>
                         </Col> 
                     </Row>
                     <Row>
                         <Col className={s.sheetCol}>
                             <Notation 
                             notation={exerciseDetails[exerciseId].notation}/>
                         </Col>
                     </Row>
             <Row height='12px'>
                 <Col>
                    {exerciseDetails[exerciseId].categories.map(function(item, i){
                        return <span class='badge badge-primary p-3 mr-2'>{item}</span>;
                    })}
                </Col>
                <Col>
                    <CountdownCircleTimer
                    isPlaying
                    duration={props.duration}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    size={50}
                    strokeWidth={1}
                    onComplete={() => {
                        updateExerciseId();
                        return { shouldRepeat: true} // repeat animation in 1.5 seconds
                    }}
                    >
                       
                    {({ remainingTime }) =>
                     {
                        const minutes = Math.floor(remainingTime / 60)
                        const seconds = remainingTime % 60
                        return `${minutes}:${seconds}`                
                     }
                    }


                    </CountdownCircleTimer>
                </Col>
                <Col>
                    <Metronome exercise={exerciseDetails[exerciseId]}/>
                </Col>
            </Row>
            </Container>
        )
    }
};

