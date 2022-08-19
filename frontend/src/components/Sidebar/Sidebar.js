import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import DTLogo from "../Icons/DTLogo.js";
import cn from "classnames";

const Sidebar = (props) => {

  const {
    activeItem = '',
    ...restProps
  } = props;

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0);
    }
  }, [props.sidebarOpened])

  return (
    <nav className={cn(s.root, {[s.sidebarOpen]: burgerSidebarOpen})} >
      <header className={s.logo}>
        <DTLogo/>
        <span className={s.title}>DRUMS TRAINER</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Dashboard"
          isHeader
          iconName='ic:outline-space-dashboard'
          link="/template/dashboard"
          index="dashboard"
          badge="9"
        />
        <h5 className={s.navTitle}>TEMPLATE</h5>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Train"
          isHeader
          iconName='cil:speedometer'
          link="/template/typography"
          index="typography"
          childrenLinks={[
            {
              header: 'Pad', link: '/template/train/pad-training',
            },
            {
              header: 'Reading', link: '/template/train/reading-training',
            },
            {
              header: 'Drum Set', link: '/template/train/drumset-training',
            },
          ]}
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="History"
          isHeader
          iconName='ic:round-history'
          link="/template/tables"
          index="tables"
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Upload"
          isHeader
          iconName='carbon:music-add'
          link="/template/upload-file"
          index="upload-file"
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Recognize"
          isHeader
          iconName='ps:music-score'
          link="/template/typography"
          index="typography"
          childrenLinks={[
            {
              header: 'Overview', link: '/template/recognizer/overview',
            },
            {
              header: 'Upload', link: '/template/recognizer/upload',
            },
            // {
            //   header: 'Technique', link: '/template/ui-elements/charts',
            // },
            // {
            //   header: 'Reading', link: '/template/ui-elements/icons',
            // },
            // {
            //   header: 'Drum Set', link: '/template/ui-elements/maps',
            // },
          ]}
        />
      </ul>
      <div className="bg-widget d-flex mt-auto ml-1">
        <Button className="rounded-pill my-3 body-2 d-none d-md-block" type="submit" color="secondary-red">Unlock Full Version</Button>
      </div>
    </nav>
  );
}

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
