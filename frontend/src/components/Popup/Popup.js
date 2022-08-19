import React from 'react'
import s from './Popup.module.scss';

var cName = "btn btn-primary mx-auto " + s.closeBtn;
function Popup(props) {
  return (props.trigger) ? (
    <div className={s.popup}>
        <div className={s.popupInner}>
            <button className={cName} onClick={() => props.setTrigger(false)}><span className="mr-1">Exit Train !</span></button>
            { props.children }
        </div>
    </div>
  ) : "";
}

export default Popup