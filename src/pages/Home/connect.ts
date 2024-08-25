import { connect } from "react-redux";
import Component from "./Home";
import { decrement, increment } from "../../components/App/store/slice";
import { RootState } from "../../store";

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Component);
