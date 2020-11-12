import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard_Page from './Containers/Dashboard/index';
import Signup_Page from './Containers/Signup';
import Login_Page from './Containers/Login';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_category_action, fetch_product_action, isUserLoggedIn } from './Actions';
import PrivateRoute from './Components/HOC/Private_Route';
import AboutUs from './Containers/Aboutus';
import ContactUs from './Containers/Contactus';
import Create_Category from './Containers/Category/Create_Category';
import Fetch_Category from './Containers/Category/Fetch_Category';
import Create_Product from './Containers/Product/Create_Product';
import Fetch_Product from './Containers/Product/Fetch_Product';



function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);

  useEffect(() => {
    if(!auth.authenticate){
      // whenever a user reload we check for the authentication that
      // he or she signin or not.
      dispatch(isUserLoggedIn());
      dispatch(fetch_category_action());
      dispatch(fetch_product_action());
    }

  },[]); //  the ependency array.

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard_Page} />
        <PrivateRoute path="/category/create" component={Create_Category} />
        <PrivateRoute path="/category/fetch" component={Fetch_Category} />
        <PrivateRoute path="/product/create" component={Create_Product} />
        <PrivateRoute path="/product/fetch" component={Fetch_Product}/>
        <Route path="/aboutus" component={AboutUs}/>
        <Route path="/contactus" component={ContactUs}/>
        <Route path="/signup" component={Signup_Page} />
        <Route path="/login" component={Login_Page} />

      </Switch>
    </div>
  );
}

export default App;
