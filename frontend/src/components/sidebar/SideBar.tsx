import { NavLink } from 'react-router-dom';
import {
  LoopIcon,
  ProgressIcon,
  UserIcon,
  MenuIcon,
  HomeIcon,
} from '../../components';

import styles from './SideBar.module.css';
import { RUTAS } from '../../router';

export const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.topContainerSidebar}>
        <NavLink to={RUTAS.BASE}>
          <HomeIcon className={styles.logoSidebar} />
        </NavLink>
        <NavLink to={RUTAS.BUSQUEDA}>
          <LoopIcon className={styles.logoSidebar} />
        </NavLink>
        <NavLink to={RUTAS.SIGUIENTE_SEMESTRE}>
          <MenuIcon className={styles.logoSidebar} />
        </NavLink>
        <NavLink to={RUTAS.TRAYECTORIA}>
          <ProgressIcon className={styles.logoSidebar} />
        </NavLink>
      </div>
      <div className={styles.bottomContainerSidebar}>
        <UserIcon className={styles.logoSidebar} />
      </div>
    </aside>
  );
};
