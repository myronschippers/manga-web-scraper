const defaultClosedAlert = {
  show: false,
};

const msgAlertReducer = (state = defaultClosedAlert, action) => {
  const {
    payload,
  } = action;

  switch (action.type) {
    case 'RAISE_ERROR':
      const title = payload.title != null ?
        payload.title :
        'ERROR!';
      const text = payload.msg != null ?
        payload.msg :
        'An error has occurred please try again later';

      return {
        title,
        text,
      };
    case 'CLOSE_ALERT':
      return defaultClosedAlert;
    default:
      return defaultClosedAlert;
  }
};

export default msgAlertReducer;
