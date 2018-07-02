import React from 'react';
import './Form.css';

const Form = ({value, onChange, onCreate, onKeyPress}) => {
    return (
        <div className= "form">
            <input
                value = {value} //input contents
                onChange = {onChange} //when input is changed,
                onKeyPress = {onKeyPress} /*input에서 key를 입력할때 실행되는 함수
                함수에 나중에 Enter가 눌렸을 때 onCreate를 한 것 과 동일한 작업을 하기 위해 사용됨*/
                onCreate = {onCreate}/>
            <div className = "create-button" onClick={onCreate}>
                Add
            </div>
        </div>
    );
};

export default Form;
