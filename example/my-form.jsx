import React, {Component} from 'react';
import {BlackBoxType} from './garphq-schema'
import Form from '../src/Form.jsx'

const FIELDS_OPTIONS = {
  id: {
    _hidden: true
  },
  name: {
    ofType: {
      _label: 'The Label of Name',
      _helpText: 'Helper for name',
      _placeholder: 'Placeholder for name...',
      _textType: 'select',
      _enum: ['John','James', 'David']
    }
  },
  description: {
    _textType: 'textarea'
  },
  nestedExample: {
    ofType: {
      _inline: true,
      color: {
      }
    }
  }
}

const FORM_OPTIONS = {
  nestedLevels: 10
}

const DATA = {
  name: "Prefilled name",
  nestedExample: {
    color: 1,
    description: 'The green color is selected.'
  },
  listWithNestedObjectExample: [
    {
      color: 2,
      description: 'The blue color is selected.'
    },
    {
      color: 0,
      description: 'The red color is selected.'
    }
  ]
}

export default class MyForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      formValue: {}
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Form object={BlackBoxType} formOptions={FORM_OPTIONS} fieldsOptions={FIELDS_OPTIONS} data={DATA} onChange={(...args) => this.onChange(...args)} onSubmit={(...args) => this.onSubmit(...args)}/>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading"> Form Value </div>
              <div className="panel-body">
                <textarea style={{width:'100%'}} rows={20} readOnly value={JSON.stringify(this.state.formValue, null, '\t')}></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h5>Fields Options Being Used:</h5>
            <textarea style={{width:'100%'}} rows={10} readOnly value={JSON.stringify(FIELDS_OPTIONS, null, 4)}></textarea>
          </div>
        </div>
      </div>
    )
  }

  onChange(path, value, formValue) {
    console.log(`Form has changed ${path}=${value}. Form value:`,formValue)
    this.setState({formValue});
  }

  onSubmit(formValue) {
   console.log(`Submit the form with value:`,formValue)
    alert('Form was submitted. See console for form values.')
  }
}

