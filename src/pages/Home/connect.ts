import { connect } from "react-redux";
import Component from "./Home";

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Component);
