// the reducer dispatch
export default function Reducer(state, action)
{
    switch(action.type)
    {
      // timer dispatch
      case 'INCREASE_TIMER':
        return {
          timer: state.timer + 1,
          breaker: state.breaker,
          start_stop: state.start_stop
        };
        case 'DECREASE_TIMER':
          return {
            timer: state.timer - 1,
            breaker: state.breaker,
            start_stop: state.start_stop
          };
      // break timer dispatch
          case 'B_INCREASE_TIMER':
        return {
          timer: state.timer,
          breaker: state.breaker + 1,
          start_stop: state.start_stop
        };
        case 'B_DECREASE_TIMER':
          return {
            timer: state.timer,
            breaker: state.breaker - 1,
            start_stop: state.start_stop
          };
        case 'START_STOP':
            if(!state.start_stop)
            {
              return {
                timer: state.timer,
                breaker: state.breaker,
                start_stop: true
              }
            }
            else
            {
              return {
                timer: state.timer,
                breaker: state.breaker,
                start_stop: false
              }
            }
            case 'RESET':
                return {
                  timer: 25,
                  breaker: 5,
                  start_stop: false
                };
        default: {
            throw Error('Unknown action: ' + action.type);
          };
    }
  }