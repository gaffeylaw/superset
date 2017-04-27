import React from 'react';
import { Col, Row, Tabs, Tab, Panel } from 'react-bootstrap';
import Favorites from './Favorites';
import UserInfo from './UserInfo';
import Security from './Security';
import RecentActivity from './RecentActivity';
import CreatedContent from './CreatedContent';
import { chooseMessage } from '../../explorev2/stores/language';
import zh_CN from '../../explorev2/stores/zh_CN';
import en_US from '../../explorev2/stores/en_US';

const localMessage = chooseMessage();

const propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default function App(props) {
  return (
    <div className="container app">
      <Row>
        <Col md={3}>
          <UserInfo user={props.user} />
        </Col>
        <Col md={9}>
          <Tabs id="options">
            <Tab eventKey={1} title={
              <div><i className="fa fa-star" /> {localMessage.favorites}</div>}>
              <Panel><Favorites user={props.user} localMessage={localMessage} /></Panel>
            </Tab>
            <Tab
              eventKey={2}
              title={
                <div><i className="fa fa-paint-brush" /> {localMessage.created_content}</div>
              }
              >
              <Panel>
                <CreatedContent user={props.user} localMessage={localMessage} />
              </Panel>
            </Tab>
            <Tab eventKey={3} title={
              <div><i className="fa fa-list" /> {localMessage.recent_activity}</div>}>
              <Panel>
                <RecentActivity user={props.user} localMessage={localMessage} />
              </Panel>
            </Tab>
            <Tab eventKey={4} title={
              <div><i className="fa fa-lock" /> {localMessage.security_access}</div>}>
              <Panel>
                <Security user={props.user} localMessage={localMessage} />
              </Panel>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
App.propTypes = propTypes;
