import React, { Component } from "react";

export class DropdownOptions extends Component {
  state = {
    no_of_options: 8,
    ddItems: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  };

  handle_no_of_options = e => {
    e.stopPropagation();
    this.props.handle_no_of_options(e.target.value);

    if (document.getElementById("myDropdown").classList.contains("show")) {
      document.getElementById("myDropdown").classList.remove("show");
    }
  };

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
  myFunction = e => {
    e.stopPropagation();
    document.getElementById("myDropdown").classList.toggle("show");
  };

  render() {
    const { ddItems } = this.state;
    return (
      <div className="dropdown">
        <button type="button" onClick={this.myFunction} className="dropbtn">
          Number of options{" "}
          <span className="ms-noofoptions">{this.props.no_of_options}</span>
        </button>
        <div id="myDropdown" className="dropdown-content">
          {ddItems.map((elem, index) => (
            <li
              key={index}
              value={elem}
              className="ms-noofoptions-item"
              onClick={this.handle_no_of_options}
            >
              {elem}
            </li>
          ))}
        </div>
      </div>
      // <div className="btn-group">
      //   <br />
      //   <span className="btn btn-secondary">No of options</span>
      //   <button
      //     type="button"
      //     className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
      //     data-toggle="dropdown"
      //     aria-haspopup="true"
      //     aria-expanded="false"
      //   >
      //     <span className="sr-only">Toggle Dropdown</span>
      //   </button>
      //   <div className="dropdown-menu">
      //     {this.state.ddItems.map(sNumber => {
      //       return (
      //         <button
      //           key={sNumber}
      //           type="button"
      //           className="dropdown-item"
      //           onClick={this.onClick}
      //           value={sNumber}
      //         >
      //           {sNumber}
      //         </button>
      //       );
      //     })}
      //   </div>
      // </div>
    );
  }
}

export default DropdownOptions;
