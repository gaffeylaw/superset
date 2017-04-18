import React, { PropTypes } from 'react';
import cx from 'classnames';
import URLShortLinkButton from './URLShortLinkButton';
import EmbedCodeButton from './EmbedCodeButton';
import DisplayQueryButton from './DisplayQueryButton';
import DownloadButton from './DownloadButton';
import {chooseMessage} from '../../explorev2/stores/language';
import {en_US} from '../../explorev2/stores/en_US';
import {zh_CN} from '../../explorev2/stores/zh_CN';

const propTypes = {
  canDownload: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  slice: PropTypes.object.isRequired,
};

const localMessage = chooseMessage();

export default function ExploreActionButtons({ canDownload, slice }) {
  const exportToCSVClasses = cx('btn btn-default btn-sm', {
    'disabled disabledButton': !canDownload,
  });
  return (
    <div className="btn-group results" role="group">
      <URLShortLinkButton slice={slice} />

      <EmbedCodeButton slice={slice} />

      <a
        href={slice.data.json_endpoint}
        className="btn btn-default btn-sm"
        title={localMessage.export_to_json}
        target="_blank"
      >
        <i className="fa fa-file-code-o"></i> .json
      </a>

      <a
        href={slice.data.csv_endpoint}
        className={exportToCSVClasses}
        title={localMessage.export_to_csv}
        target="_blank"
      >
        <i className="fa fa-file-text-o"></i> .csv
      </a>

      <DownloadButton slice={slice} />

      <DisplayQueryButton slice={slice} />
    </div>
  );
}

ExploreActionButtons.propTypes = propTypes;
