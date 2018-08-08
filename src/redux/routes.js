import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Default,
  UserInfo,
  LoginInfo,
  PurchaseHistory,
  StudyCard,
  BookSelf,
  ErrorInfo,
  DocumentOperation,
  BannerManage,
  TestUeditor
  PushManage
} from './containers';
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
      <Route  path = {`${match.path}/errorInfo/:userId?`}  component = {ErrorInfo}/>

      <Route  path = {`${match.path}/documentsOperation`}  component = {DocumentOperation}/>
      <Route  path = {`${match.path}/bannerManage`}  component = {BannerManage}/>
      <Route  path = {`${match.path}/testUeditor`}  component = {TestUeditor}/>
      <Route  path = {`${match.path}/pushManage`}  component = {PushManage}/>

    </Switch>
  );
};

export default ChildrenRoutes;
