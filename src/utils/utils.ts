import danger from '/images/icon/ico_danger.svg';
import warn from '/images/icon/ico_warn.svg';

function setIcon(status: number | null) {
  switch (status) {
    case null:
      return warn;
    case 2:
      return warn;
    case 0:
      return danger;
    default:
      break;
  }
}
export default { setIcon };
