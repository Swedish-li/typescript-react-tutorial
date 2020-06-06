import { connect } from "react-redux";
import { addTodo } from "../actions";
import Header from "../components/Header";

export default connect(null, { addTodo })(Header);
