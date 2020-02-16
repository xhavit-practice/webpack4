import React from "react";
import ReactDOM from "react-dom";
import imageVscode48 from "./asset/image/vscode-48.png";
import imageVscode600 from "./asset/image/vscode-600.png";
import "./search-header.less";
import "./search.less";

class Search extends React.Component {
  render() {
    return (
      <div>
        <div className="search-text">Search Text - 搜索文字</div>
        <div>
          <img src={imageVscode48} />
        </div>
        <div>
          <img src={imageVscode600} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
