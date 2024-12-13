import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import moment from 'moment';
import "./index.scss";
import _ from 'lodash'

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';


function JsonSchema(props, ref) {
    const { jsonString = '' } = props;
    const [jsoneditor, setJsoneditor] = useState(null);


    useImperativeHandle(ref, () => ({
        validate: () => {
            return jsoneditor.validate();
        },
        getValue: () => {
            return jsoneditor.getText();
        },
    }));


    useEffect(() => {
        let jsoneditor = new JSONEditor(document.querySelector('#Json-Schema-container'), {
            mode: 'code'
        });
        jsoneditor.setText(jsonString)
        setJsoneditor(jsoneditor);
    }, [])

    return <div id="Json-Schema-container"></div>
}

export default forwardRef(JsonSchema);