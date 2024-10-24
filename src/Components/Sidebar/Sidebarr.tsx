import { useContext, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiLogout } from 'react-icons/ci';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaUser, FaUsers } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

interface UserData {
  firstName: string;
  lastName: string;
  image: string;
}

export default function Sidebarr() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { userData } = useContext(AuthContext) as { userData: UserData | null }; // التعامل مع userData التي قد تكون null
  const navigate = useNavigate();

  const logout = (): void => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const toggleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='sideBarContainer vh-100'>
      <Sidebar collapsed={collapsed} className='vh-100'>
        <div className="text-center my-5">
          <div className="">
            {collapsed ? (
              <FaArrowAltCircleRight onClick={toggleCollapsed} size={25} className='my-3' />
            ) : (
              <FaArrowAltCircleLeft onClick={toggleCollapsed} size={25} className='my-3' />
            )}
          </div>
          <img src={userData?.image} alt="imgProfile" className='w-50 my-2 rounded-circle' />
          <h5 className='my-4'>
            {userData?.firstName}, {userData?.lastName}
          </h5>
          <p className='text-warning my-3'>Admin</p>
        </div>
        <Menu>
          <MenuItem icon={<MdHome />} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem icon={<FaUsers />} component={<Link to="/dashboard/user-list" />}>
            Users
          </MenuItem>
          <MenuItem icon={<FaUser />} component={<Link to="/dashboard/user-data" />}>
            Add user
          </MenuItem>
          <MenuItem icon={<CgProfile />} component={<Link to="/dashboard/profile" />}>
            Profile
          </MenuItem>
          <MenuItem onClick={logout} icon={<CiLogout />} component={<Link to="" />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
