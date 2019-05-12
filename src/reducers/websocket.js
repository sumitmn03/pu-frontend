const initialState = {
  message: ""
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case "REDUX_WEBSOCKET::OPEN":
      return { ...state };
    case "REDUX_WEBSOCKET::CLOSED":
      // console.log("ws closed");
      return { ...state };
    case "REDUX_WEBSOCKET::BROKEN":
      return { ...state };
    case "REDUX_WEBSOCKET::BEGIN_RECONNECT":
      return { ...state };
    case "REDUX_WEBSOCKET::RECONNECT_ATTEMPT":
      return { ...state };
    case "REDUX_WEBSOCKET::RECONNECTED":
      return { ...state };
    case "REDUX_WEBSOCKET::ERROR":
      return { ...state };

    default:
      return state;
  }
}
