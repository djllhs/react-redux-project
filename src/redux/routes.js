import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Default,
  UserInfo,
  LoginInfo,
  PurchaseHistory,
  StudyCard,
  BookSelf,
  ErrorInfo,
} from "./containers";
const ChildrenRoutes  = props => {
  const {match} = props;
  return (
    <Switch>
      <Route exact path = {match.path}  component = {Default}/>
      <Route exact path = {`${match.path}/userInfo`}  component = {UserInfo}/>
      <Route  path = {`${match.path}/loginInfo/:userId?`}  component = {LoginInfo}/>
      <Route exact  path = {`${match.path}/purchaseHistory`}  component = {PurchaseHistory}/>
      <Route exact  path = {`${match.path}/studyCards`}  component = {StudyCard}/>
      <Route exact  path = {`${match.path}/bookSelf`}  component = {BookSelf}/>
      <Route  path = {`${match.path}/ErrorInfo/:userId?`}  component = {ErrorInfo}/>

    </Switch>
  )
}

export default ChildrenRoutes;
