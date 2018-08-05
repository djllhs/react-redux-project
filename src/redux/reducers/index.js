import { combineReducers } from 'redux';
import { counter } from './counter';
import { login } from './login';
import { other } from './other';
import userBasicInfo from './userBasicInfo';
import userLoginInfo from './userLoginInfo';
import userPurchaseHistory from './userPurchaseHistory';
import userStudyCard from './userStudyCard';
import userBookSelf from './userBookSelf';
import userErrorInfo from './userErrorInfo';
import documentOperation from './documentOperation';
import pushManage from './pushManage';


const reducer = combineReducers({
  counter,
  login,
  other,
  userBasicInfo,
  userLoginInfo,
  userPurchaseHistory,
  userStudyCard,
  userBookSelf,
  userErrorInfo,
  documentOperation,
  pushManage
});

export default reducer;
