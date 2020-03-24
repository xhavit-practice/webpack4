import React from 'react';
import ReactDOM from 'react-dom';
import { a2 } from '@/common/a2';
import imageVscode48 from '@/common/asset/image/vscode-48.png';
import imageVscode550 from '@/common/asset/image/vscode-550.png';
import '@/common/common.less';
import { c } from './c';
import './index.less';

class Search extends React.Component {
    constructor(props) {
        super(props);
        console.log(a2, 'sync load a2');
    }

    render() {
        return (
            <div>
                <div className="search-text">Search Text - 搜索文字</div>
                <div>
                    <img src={imageVscode48} alt="vscode-48" />
                </div>
                <div>
                    <img src={imageVscode550} alt="vscode-550" />
                </div>
                <div>{c}</div>
            </div>
        );
    }
}

ReactDOM.render(<Search />, document.getElementById('root'));
