import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./login/containers/Login";
import Signup from "./login/containers/Signup";
import { CustomerListPage, CustomerDetailPage, AdditionalContactPage, CustomerDetailNav} from "./customer/pages";
import { ListCustomer, ListProspectApproval, ListRejectedCustomer, EditCustomerSidebar } from "./customer/crud";

import ResetPassword from "./login/containers/ResetPassword";
import ResetPasswordConfirm from "./login/containers/ResetPassword"
import ChangePassword from "./login/containers/ChangePassword";
// import AddCustomerDialog from "./customer/crud/AddCustomerDialog";

import ToastProvider from "./providers/ToastProvider";
import UserProvider from "./providers/UserProvider";
import store from "./store";
import Home from "./login/containers/Home"
import Activate from "./login/containers/Activate";
import { AdditionalContactForm } from "./customer/contact";
import {Navbar} from "./login/containers/navbar";




import './App.css';

// prime react
//import 'primereact/resources/themes/vela-orange/theme.css';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";


// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";





function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <UserProvider>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/navbar" element={<Navbar/>} />
            <Route exact path="/customer" element={<ListCustomer />} />
            <Route exact path="/customer-approval" element={<ListProspectApproval />} />
            <Route exact path="/customer-rejected" element={<ListRejectedCustomer />} />
            <Route exact path="/customer/:customerId" element={<CustomerDetailNav />} />
            <Route exact path="/edit-customer" element={ <EditCustomerSidebar/>} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/password/reset/confirm" element={<ResetPasswordConfirm />} />
            <Route exact path="/change-password" element={<ChangePassword />} />
            {/* <Route exact path="/add-customer" element={<AddCustomerDialog />} /> */}

            <Route exact path="/activate/:uid/:token" component={Activate} />
            <Route exact path="/" component={Home} />
            <Route component={() => <div>404 Not found </div>} />

            <Route exact path="/form/" element={<AdditionalContactForm/>}/>

          </Routes>
        </UserProvider>
      </ToastProvider>
    </Provider>

  );
}

export default App;
