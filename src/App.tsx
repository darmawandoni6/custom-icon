import { useCallback, useEffect, useState } from 'react';

import cx from 'classnames';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';

import { apilist } from './Element/API/myFile';
import { document, favorite, file, myFiles, plussCircle, recent } from './assets/svg';
import CIcon from './components/CIcon';
import UploadFile from './components/Modal/UploadFile';
import useStateApi from './helpers/hooks/useStateApi';

const list = [
  {
    name: 'My Files',
    icon: myFiles,
    to: '/',
  },
  {
    name: 'Document',
    icon: document,
    to: '/document',
  },
  {
    name: 'Recent',
    icon: recent,
    to: '/recent',
  },
  {
    name: 'Favorites',
    icon: favorite,
    to: '/favorite',
  },
  {
    name: 'Archived',
    icon: <i className="fa-solid fa-box-archive me-2 text-[23px]"></i>,
    to: '/archived',
  },
];

const App = () => {
  const [show, setShow] = useState<boolean>(false);
  const location = useLocation();
  const { setValue } = useStateApi();
  const [searchParams] = useSearchParams();
  const open = searchParams.get('open') as string;

  useEffect(() => {
    const { pathname } = location;
    const fetch = async (params?: Partial<ParamsList>) => {
      const list = await apilist(params);
      setValue({ list });
    };
    if (pathname === '/document') {
      fetch({ filter: 'document' });
    }

    if (pathname === '/archived') {
      fetch({ archived: true, open });
    }
    if (pathname === '/recent') {
      fetch({ recent: true });
    }
    if (pathname === '/favorite') {
      fetch({ star: true, open });
    }
  }, [location]);

  const active = useCallback(
    (to: string) => {
      if (to === '/') {
        return location.pathname === '/';
      }
      return location.pathname.includes(to);
    },
    [location.pathname],
  );

  return (
    <div className="min-h-screen max-w-[1440px] flex m-auto">
      <div className="flex h-full w-full p-3">
        <aside className="flex-none w-[250px] h-fit bg-white p-6  border border-[#dbe0e6] rounded-lg shadow-card sticky top-3">
          <h5 className="flex al font-bold border-b border-gray-300 mb-4 pb-4">
            <CIcon
              icon={file}
              height={24}
              width={24}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            />
            Files
          </h5>
          <button
            className="bg-[#FF9F43] border border-[#FF9F43] rounded-lg p-2 w-full text-white cursor-pointer mb-4"
            onClick={() => setShow(true)}
          >
            <CIcon
              icon={plussCircle}
              height={24}
              width={24}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            />
            New
          </button>
          <ul className="mb-5">
            {list.map((item, i) => (
              <Link to={item.to} key={i}>
                <li
                  className={cx(
                    'flex items-center font-semibold text-[#5B6670] mb-[5px] py-2 px-3 rounded-md cursor-pointer hover:bg-[#092C4C] hover:text-[#fff] text-sm',
                    {
                      ['bg-[#092C4C]']: active(item.to),
                      'text-white': active(item.to),
                    },
                  )}
                >
                  <CIcon
                    icon={item.icon}
                    height={24}
                    width={24}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="me-2"
                  />

                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </aside>
        <Outlet />
      </div>
      <UploadFile show={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default App;
