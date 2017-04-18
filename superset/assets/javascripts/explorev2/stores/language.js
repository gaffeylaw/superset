
import zh_CN from '../stores/zh_CN';
import en_US from '../stores/en_US';
const $ = window.$ = require('jquery'); // eslint-disable-line

 export function chooseMessage() {
    switch($('.dropdown-toggle .flag').attr('class').split(' ')[1]){
      case 'us':
        return en_US;
        break;
      case 'cn':
        return zh_CN;
        break;
      default:
        return en_US;
        break;
    }
  }

  export function chooseLocale() {
      const lan = $('.dropdown-toggle .flag').attr('class').split(' ')[1] === 'us' ? 'en' : 'zh';
      return lan;
  }