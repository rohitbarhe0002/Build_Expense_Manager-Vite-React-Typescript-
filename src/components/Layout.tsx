import { FC, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useMode } from '../custom-hooks/useMode';
import Sidebar from './Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  setIsLoggedIn: (data: boolean) => void;
}

const Layout: FC<LayoutProps> = ({ children, isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { selectedMode } = useMode();

  const toggleMenu = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };

  return (
    <div className={`main ${menuOpen ? 'menu-open' : ''} ${selectedMode}`}>
      {isLoggedIn && (
        <div className={`left ${selectedMode}`}>
          <Sidebar setIsLoggedIn={setIsLoggedIn} toggleMenu={toggleMenu} />
        </div>
      )}
      <div className={`right ${selectedMode}`}>{children}</div>
      {isLoggedIn && (
        <>
          {menuOpen ? (
            <GrClose size={25} className='close-menu' onClick={toggleMenu} />
          ) : (
            <RxHamburgerMenu
              size={25}
              className='hamburger-menu'
              onClick={toggleMenu}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Layout;
