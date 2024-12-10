import { useSelector, useDispatch, connect } from "react-redux";
import classes from "./Counter.module.css";
import { Component } from "react";
import { counterActions } from "../store/counter";
const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };
  const increament = () => {
    dispatch(counterActions.increament());
  };
  const decreament = () => {
    dispatch(counterActions.decreament());
  };
  const increase = () => {
    dispatch(counterActions.increase(5));
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increament}>Increament</button>
        <button onClick={increase}>Increament by 5</button>
        <button onClick={decreament}>decreament</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

// class Counter extends Component {
//   increament = () => {
//     this.props.increament();
//   };
//   decreament = () => {
//     this.props.decreament();
//   };
//   toggleCounterHandler = () => {};
//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.increament.bind(this)}>Increament</button>
//           <button onClick={this.decreament.bind(this)}>decreament</button>
//         </div>
//         <button onClick={this.toggleCounterHandler.bind(this)}>
//           Toggle Counter
//         </button>
//       </main>
//     );
//   }
// }
// const mapStateProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };
// const mapDispatchProps = (dispatch) => {
//   return {
//     increament: () => {
//       dispatch({ type: "increament" });
//     },
//     decreament: () => {
//       dispatch({ type: "decreament" });
//     },
//   };
// };
// export default connect(mapStateProps, mapDispatchProps)(Counter);
export default Counter;
