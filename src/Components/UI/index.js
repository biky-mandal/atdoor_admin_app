import React from 'react';
import { Form } from 'react-bootstrap';
import './style.css';

/**
* @author
* @function Input
**/

const Input = (props) => {

    return (
        <Form.Group>
            <Form.Label className="frm-lbl">{props.label}</Form.Label>
            <Form.Control
                className="inpt-field"
                type={props.type} 
                value={props.value}
                onChange={props.onChange}
            />
            <Form.Text className="alert-lbl">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    )

}

export default Input