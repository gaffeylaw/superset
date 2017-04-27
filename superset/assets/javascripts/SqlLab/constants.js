import { chooseMessage } from '../explorev2/stores/language';
import zh_CN from '../explorev2/stores/zh_CN';
import en_US from '../explorev2/stores/en_US';

const localMessage = chooseMessage();

export const STATE_BSSTYLE_MAP = {
  failed: 'danger',
  pending: 'info',
  fetching: 'info',
  running: 'warning',
  stopped: 'danger',
  success: 'success',
};

export const STATUS_OPTIONS = localMessage.STATUS_OPTIONS;

export const TIME_OPTIONS = localMessage.TIME_OPTIONS;
