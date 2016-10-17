import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';


export default class TableComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      open: false,
      data: '',
      employees: []
    };
  }

  // get the data from api and populate employees in state //
  componentWillMount = () => {
    axios.get(`results.json`)
      .then(res => {
        this.setState({ employees:  res.data.employees});
      });
  }

  handleToggle = (event, toggled) => {
    console.log('handleToggle');
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
    console.log('handleChange');
  };

  rowSelected = (event) => {
    if (this.state.employees[event]) {
      this.openDialogue(event);
    }
  };

  openDialogue = (event) => {
    var index = event[0];
    this.setState({data: this.state.employees[index]});
    this.setState({open: true});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    const actions = [
      /*}
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      */
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]
    return (
      <div>
      <AppBar
        title="Employees DB"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Dialog
        title={this.state.data.name}
        modal={true}
        actions={actions}
        open={this.state.open}
      >
        {this.state.data.status}

      </Dialog>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this.rowSelected}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Employees Data" style={{textAlign: 'left'}}>
                Employees Data
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.employees.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>

        </Table>
      </div>
    );
  }
}
