import React from 'react'
import { Icon, Statistic, Message, Table } from 'semantic-ui-react'
import moment from 'moment';
import './App.css';

class App extends React.Component{

  state = {
    messages : [],
    totalCount : 0,
    lastDayCount: 0,
    lastMonthCount: 0,
    showLoader: true,
  }

  componentDidMount(){
    this.fetchAllMessages();
}

async fetchAllMessages(){
    const messagesResp = (await (await fetch('https://internet-shutdowns-server-host.herokuapp.com/all_messages')).json());
    console.log(messagesResp);
    this.setState({
        messages: messagesResp,
        showLoader: false,
        totalCount: messagesResp.length,
        lastDayCount : messagesResp.length,
        lastMonthCount:messagesResp.length,
    });
}

  render(){
    moment.locale('en');
    return <div className="App">

    <Statistic.Group widths='one' className='statistics'>
      <Statistic>
        <Statistic.Value>
        <Icon name='envelope' />
          {this.state.totalCount}
        </Statistic.Value>
        <Statistic.Label>Total messages</Statistic.Label>
      </Statistic>

      {/* <Statistic>
        <Statistic.Value>
        <Icon name='calendar alternate' />
          {this.state.lastMonthCount}
        </Statistic.Value>
        <Statistic.Label>Messages last month</Statistic.Label>
      </Statistic>

      <Statistic>
        <Statistic.Value>
        <Icon name='clock' />
          {this.state.lastDayCount}
        </Statistic.Value>
        <Statistic.Label>Messages last 24h</Statistic.Label>
      </Statistic> */}
    </Statistic.Group>

    {this.state.showLoader ? 
    <Message icon className="loader-msg">
      <Icon name='circle notched' loading />
      <Message.Content>
        <Message.Header>Loading...</Message.Header>
        Fetching the latest messages from the server.
      </Message.Content>
    </Message> 
    : <div></div>}

      <Table striped className="table-msg">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Time / GMT</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      <Table.Body>
      {
      this.state.messages ? this.state.messages.map(message => 
        <Table.Row key={message.id}>
          <Table.Cell>{moment(message.date).format('DD MMM yyyy')}</Table.Cell>
          <Table.Cell>{moment(message.date).format('HH:MM / Z')}</Table.Cell>
          <Table.Cell>{message.message}</Table.Cell>
        </Table.Row>)
      : null} 
        </Table.Body>
      </Table>
    
  </div>
  }
}

export default App;
