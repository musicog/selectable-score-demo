import React, { Component } from 'react';
import SelectableScore from 'selectable-score/lib/selectable-score';
import NextPageButton from 'selectable-score/lib/next-page-button.js';
import PrevPageButton from 'selectable-score/lib/prev-page-button.js';
import SubmitButton from 'selectable-score/lib/submit-button.js';

// selectionString: CSS selector for all elements to be selectable (e.g. ".measure", ".note")
const selectorString = ".measure";

export default class SelectableScoreApp extends Component { 
  constructor(props) { 
    super(props);
    this.state = { 
      selection: [],
      uri: this.props.uri /* you can set this dynamically if your app requires dynamic MEI updates */
    };
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectionChange(selection) { 
    this.setState({ selection });
    /* and anything else your app needs to do when the selection changes */
  }

  handleScoreUpdate(scoreElement) { 
    console.log("Received updated score DOM element: ", scoreElement)
  }

  handleSubmit(args) { 
    /* do any app-specific actions and return the object (e.g. a Web Annotation) 
     * to be submitted to the user POD */
    console.log("Received args: ", args);
    return {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "target": this.state.selection.map( (elem) => this.state.uri + "#" + elem.getAttribute("id") ),
      "motivation": "highlighting"
    }
  }

  render() {
    return(
      <div>
        <p>This is a minimal example demonstrating the use of the TROMPA selectable-score component.</p>
        <p>Current selection: { this.state.selection.length > 0
          ? <span> { this.state.selection.map( (elem) => elem.getAttribute("id") ).join(", ") } </span>
          : <span>Nothing selected</span>
        }</p>

        { /* pass anything as buttonContent that you'd like to function as a clickable next page button */ }
        <NextPageButton 
          buttonContent = { <span>Next</span> }
          uri = { this.state.uri }
          
        />

        { /* pass anything as buttonContent that you'd like to function as a clickable prev page button */ }
        <PrevPageButton 
          buttonContent = { <span>Prev</span> }
          uri = { this.state.uri }
        />

        <SubmitButton
          buttonContent = "Submit to Solid POD"
          submitUri = { this.props.submitUri }
          submitHandler = { this.handleSubmit}
          submitHandlerArgs = { { "test": "test" } }
        />

        <SelectableScore 
          uri={ this.state.uri } 
          options={ this.props.vrvOptions } 
          onSelectionChange={ this.handleSelectionChange } 
          selectorString = { selectorString }
          onScoreUpdate = { this.handleScoreUpdate }
        />
      </div>
    )
  }
}

  

