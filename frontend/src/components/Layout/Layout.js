// -- React and related libs
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs
import PropTypes from "prop-types";

// -- Custom Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";
import Dashboard from "../../pages/dashboard/Dashboard";
import Typography from "../../pages/typography/Typography";
import Tables from "../../pages/tables/Tables";

// -- Component Styles
import s from "./Layout.module.scss";
import Upload from "../../pages/recognizer/upload/Upload";
import OverviewRecognizer from "../../pages/recognizer/overview/Overview";
import PadTraining from "../../pages/train/pad-training/PadTraining";
import ReadingTraining from "../../pages/train/reading/ReadingTraining";
import DrumSetTraining from "../../pages/train/drumset/DrumSetTraining";
import UploadFile from "../../pages/upload/Upload";

const Layout = (props) => {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          <Breadcrumbs url={props.location.pathname} />
          <Switch>
            <Route path="/template" exact render={() => <Redirect to="template/dashboard"/>} />
            <Route path="/template/dashboard" exact component={Dashboard}/>
            <Route path="/template/typography" exact component={Typography} />
            <Route path="/template/tables" exact component={Tables} />
            <Route path="/template/upload-file" exact component={UploadFile} />

            <Route path="/template/train" exact render={() => <Redirect to={"/template/train/pad-training"} />} />
            <Route path="/template/train/pad-training" exact component={PadTraining} />
            <Route path="/template/train/reading-training" exact component={ReadingTraining} />
            <Route path="/template/train/drumset-training" exact component={DrumSetTraining} />


            <Route path="/template/recognizer" exact render={() => <Redirect to={"/template/recognizer/overview"} />} />
            <Route path="/template/recognizer/overview" exact component={OverviewRecognizer}/>
            <Route path="/template/recognizer/upload" exact component={Upload}/>

            <Route path='*' exact render={() => <Redirect to="/error" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
