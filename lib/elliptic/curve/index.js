import base from "./base.js";
import short from "./short.js";
import mont from "./mont.js";
import edwards from "./edwards.js";

var curve = { base, short, mont, edwards };
export default curve;
