import React from 'react';
import ReactDOM from 'react-dom';
import '@/common/common.less';
import { b } from './b';
import './index.less';

class Index extends React.Component {
    constructor(props) {
        super(props);

        import('@/common/a').then(({ a }) => {
            console.log(a, 'async load a');
        });

        import('@/common/a1').then(({ a1 }) => {
            console.log(a1, 'async load a1');
        });

        import('@/common/a2').then(({ a2 }) => {
            console.log(a2, 'async load a2');
        });

        import('@/common/a3').then(({ a3 }) => {
            console.log(a3, 'async load a3');
        });
    }

    render() {
        return <div>{b}</div>;
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
