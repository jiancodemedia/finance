import { connect } from "react-redux";
import Component from "./Home";
import { decrement, increment } from "../../components/App/store/slice";
import { RootState } from "../../store";
import { changeName } from "./store/homeSlice";

const mapStateToProps = (state: RootState) => ({
  count: state.app.value,
  name: state.home.name
});

const mapDispatchToProps = {
  increment,
  decrement,
  changeName
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Component);
