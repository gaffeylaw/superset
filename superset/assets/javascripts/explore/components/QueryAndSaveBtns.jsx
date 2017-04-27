import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { chooseMessage } from '../../explorev2/stores/language';
import  zh_CN  from '../../explorev2/stores/zh_CN';
import en_US from '../../explorev2/stores/en_US';


const propTypes = {
  canAdd: PropTypes.string.isRequired,
  onQuery: PropTypes.func.isRequired,
  onSave: PropTypes.func,
};

const localMessage = chooseMessage();

const defaultProps = {
  onSave: () => {},
};

export default function QueryAndSaveBtns({ canAdd, onQuery, onSave }) {
  const saveClasses = classnames('btn btn-default btn-sm', {
    'disabled disabledButton': canAdd !== 'True',
  });

  return (
    <div className="btn-group query-and-save">
      <button id="query_button" type="button" className="btn btn-primary btn-sm" onClick={onQuery}>
        <i className="fa fa-bolt"></i> {localMessage.query}
      </button>
      <button
        type="button"
        className={saveClasses}
        data-target="#save_modal"
        data-toggle="modal"
        onClick={onSave}
      >
        <i className="fa fa-plus-circle"></i> {localMessage.save_as}
      </button>
    </div>
  );
}

QueryAndSaveBtns.propTypes = propTypes;
QueryAndSaveBtns.defaultProps = defaultProps;
