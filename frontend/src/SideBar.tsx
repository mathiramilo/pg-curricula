import styles from './styles/App.module.css';
import iconLoop from './assets/iconLoop.svg'
import iconProgress from './assets/iconProgress.svg'
import iconUser from './assets/iconUser.svg'
import iconMenu from './assets/iconMenu.svg'
import iconHome from './assets/iconHome.svg'

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.topContainerSidebar}>
        <img src={iconHome} className={styles.logoSidebar} />
        <img src={iconLoop} className={styles.logoSidebar} />
        <img src={iconMenu} className={styles.logoSidebar} />
        <img src={iconProgress} className={styles.logoSidebar} />
      </div>
      <div className={styles.bottomContainerSidebar}>
        <img src={iconUser} className={styles.logoSidebar} />
      </div>
    </aside>
  );
}

export default Sidebar;
