import {
  LoopIcon,
  ProgressIcon,
  UserIcon,
  MenuIcon,
  HomeIcon,
} from '../../components';

import styles from './SideBar.module.css';

export const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.topContainerSidebar}>
        <HomeIcon className={styles.logoSidebar} />
        <LoopIcon className={styles.logoSidebar} />
        <MenuIcon className={styles.logoSidebar} />
        <ProgressIcon className={styles.logoSidebar} />
      </div>
      <div className={styles.bottomContainerSidebar}>
        <UserIcon className={styles.logoSidebar} />
      </div>
    </aside>
  );
};
