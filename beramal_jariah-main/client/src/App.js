import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

import { UserContext } from "./contexts/userContext";
import { TransactionContextProvider } from "./contexts/transactionContext";

import AuthRoute from "./private/AuthRoute";

import "react-dropdown/style.css";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import CallCenter from "./components/buttons/CallCenter";
import Landing from "./pages/Landing";
import Pengelola from "./pages/Pengelola";
import Infak from "./pages/Infak";
import Wakaf from "./pages/Wakaf";
import Zakat from "./pages/Zakat";
import Tentang from "./pages/Tentang";
import DetailProgram from "./pages/DetailProgram";
import PengelolaDetail from "./pages/PengelolaDetail";
import LaporanDetail from "./pages/LaporanDetail";
import Auth from "./pages/Auth";
import Transactions from "./pages/Transactions";
import TransactionReport from "./pages/TransactionReport";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import PendingTransactionReport from "./pages/PendingTransactionReport";
import TransactionSuccess from "./pages/TransactionSuccess";
import TransactionSuccessReport from "./pages/TransactionSuccessReport";
import Search from "./pages/Search";
import AllPrograms from "./pages/AllPrograms";
import AllLaporan from "./pages/AllLaporan";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const checkAuth = async () => {
    try {
      if (localStorage.token === undefined) {
        return setUserContext({ type: "AUTH_ERROR" });
      }

      const getUser = await axios
        .get(`http://localhost:5000/users/${localStorage.token}`)
        .then((result) => result.data);

      if (getUser === undefined) {
        return setUserContext({ type: "AUTH_ERROR" });
      }

      let payload = getUser;
      payload.id = localStorage.token;

      setUserContext({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      setUserContext({ type: "AUTH_ERROR" });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <Router>
      <Navbar />
      <CallCenter />
      <Switch>
        <AnimatePresence exitBeforeEnter>
          <TransactionContextProvider>
            <Route exact path="/" component={Landing} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/pengelola" component={Pengelola} />
            <Route exact path="/infak" component={Infak} />
            <Route exact path="/wakaf" component={Wakaf} />
            <Route exact path="/zakat" component={Zakat} />
            <Route exact path="/tentang" component={Tentang} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/all-programs" component={AllPrograms} />
            <Route exact path="/all-laporan" component={AllLaporan} />
            <AuthRoute exact path="/profile" component={Profile} />
            <AuthRoute exact path="/edit-profile" component={EditProfile} />
            <AuthRoute
              exact
              path="/pending-transaction"
              component={PendingTransactionReport}
            />
            <AuthRoute
              exact
              path="/success-transaction"
              component={TransactionSuccess}
            />
            <AuthRoute
              exact
              path="/profile/transaction/:id/detail/report"
              component={TransactionSuccessReport}
            />
            <Route
              exact
              path="/transaction-report"
              component={TransactionReport}
            />
            <Route
              exact
              path="/pengelola/detail/:id"
              component={PengelolaDetail}
            />
            <Route
              exact
              path="/:program/:idProgram"
              component={DetailProgram}
            />
            <Route
              exact
              path="/:program/:idProgram/transaction"
              component={Transactions}
            />
            <Route
              exact
              path="/:program/:idProgram/laporan-detail/:idLaporan"
              component={LaporanDetail}
            />
          </TransactionContextProvider>
        </AnimatePresence>
      </Switch>
    </Router>
  );
}

export default App;
