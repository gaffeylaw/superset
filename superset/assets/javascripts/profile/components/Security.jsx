import React from 'react';
import { Badge, Label } from 'react-bootstrap';

const propTypes = {
  user: React.PropTypes.object.isRequired,
  localMessage: React.PropTypes.object.isRequired,
};
export default function Security({ user, localMessage }) {
  return (
    <div>
      <div className="roles">
        <h4>
          {localMessage.roles} <Badge>{Object.keys(user.roles).length}</Badge>
        </h4>
        {Object.keys(user.roles).map(role => <Label key={role}>{role}</Label>)}
        <hr />
      </div>
      <div className="databases">
        {user.permissions.database_access &&
          <div>
            <h4>
              {localMessage.databases}
              <Badge>{user.permissions.database_access.length}</Badge>
            </h4>
            {user.permissions.database_access.map(role => <Label key={role}>{role}</Label>)}
            <hr />
          </div>
        }
      </div>
      <div className="datasources">
        {user.permissions.datasource_access &&
          <div>
            <h4>
              {localMessage.datasources}
              <Badge>{user.permissions.datasource_access.length}</Badge>
            </h4>
            {user.permissions.datasource_access.map(role => <Label key={role}>{role}</Label>)}
          </div>
        }
      </div>
    </div>
  );
}
Security.propTypes = propTypes;
