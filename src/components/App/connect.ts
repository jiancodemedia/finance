import { connect } from "react-redux";
import App from "./App";
import { decrement, increment, incrementByAmount } from "./store/appSlice";
import { RootState } from "../../store";

const mapStateToProps = (state: RootState) => ({
  count: state.app.value
});

const mapDispatchToProps = {
  increment,
  decrement,
  incrementByAmount
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
