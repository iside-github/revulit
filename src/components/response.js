import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { resText } from './res';

export class HtmlComponent extends React.Component {
    render() {
        const html = resText;
        return <div>{ReactHtmlParser(html)}</div>;
    }
}
