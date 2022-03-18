import React from "react";
import { useState, useEffect } from "react";

import SoundOne from "./one.ogg";
import SoundTwo from "./two.ogg";
import SoundThree from "./three.ogg";
import SoundFour from "./four.ogg";
import SoundFive from "./five.ogg";
import SoundSix from "./six.ogg";

import "./Repeater.css";

const BasicRepeater = (props) => {

  const [pattern, setPattern] = useState([]);
  const [count, setCount] = useState(0);

  const addToPattern = (button) => {
    setPattern([...pattern, button]);
    playSound(button);
  }

  const playSound = (button) => {
    let one = new Audio(SoundOne);
    let two = new Audio(SoundTwo);
    let three = new Audio(SoundThree);
    let four = new Audio(SoundFour);
    let five = new Audio(SoundFive);
    let six = new Audio(SoundSix);

    switch(button) {
      case "one":
        one.play();
        break;
      case "two":
        two.play();
        break;
      case "three":
        three.play();
        break;
      case "four":
        four.play();
        break;
      case "five":
        five.play();
        break;
      case "six":
        six.play()
        break;
      default: break;
    }

  }

  const generateRepeaterButton = (color, button) => {

    let classes = ["repeater-button", color];

    if(pattern[count] === button) {
      classes = [...classes, "active"];
    }

    return (
      <div 
        className={ classes.join(' ') }
        onClick={ () => addToPattern(button) }
      />
    )
  }

  const resetRepeater = () => {
    setPattern([]);
    setCount(-1);
  }

  useEffect(() => {

    const timer = setTimeout(() => {
      if(pattern.length > 1) {
        playSound(pattern[count]);

        if(count === pattern.length - 1) {
          setCount(0);
        }
        else {
          setCount(count + 1);
        }
        
      } 

      if(pattern.length === 1) {
        playSound(pattern[0]);
      }

    }, 1000)
    return () => clearTimeout(timer);
  }, [pattern, count])

  return (
    <div className="repeater-wrapper">
      <div className="repeater-buttons">
      { generateRepeaterButton("red", "one") }
      { generateRepeaterButton("yellow", "two") }
      { generateRepeaterButton("green", "three") }
      { generateRepeaterButton("cyan", "four") }
      { generateRepeaterButton("blue", "five") }
      { generateRepeaterButton("magenta", "six") }
      </div>
      <div className="repeater-reset" onClick={ () => resetRepeater() }></div>
    </div>
    
  )
}

export default BasicRepeater;