import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';

import cx from 'classnames';
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { file, plussCircle } from './assets/svg';
import CIcon from './components/CIcon';
import Dropdown from './components/Dropdown';
import UploadFile from './components/Modal/UploadFile';
import UpdateProfile from './components/UpdateProfile';
import { apiLogout, apiProfile } from './element/API/apiAuth';
import { apiSumFile, apilist } from './element/API/myFile';
import { listMenu } from './helpers/constants';
import { convertSize, percent } from './helpers/convert';
import useStateApi from './helpers/hooks/useStateApi';

const App = () => {
  const location = useLocation();
  const { value, setValue } = useStateApi();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const open = searchParams.get('open') as string;
  const search = searchParams.get('search') as string;

  const [show, setShow] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [size, setSize] = useState<{ value: number; max: number }>({
    value: 0,
    max: convertSize({ value: 5, unit: 'GB' }, 'B'),
  });
  const [srcText, setSrcText] = useState<string>('');

  const sumFile = async () => {
    const value = await apiSumFile();
    setSize((prev) => ({ ...prev, value }));
  };

  useEffect(() => {
    sumFile();
    apiProfile().then((user) => {
      setValue({ user });
    });
  }, []);

  useEffect(() => {
    setSrcText(search ?? '');
  }, [search]);

  useEffect(() => {
    const { pathname } = location;
    const fetch = async (params: Partial<ParamsList>) => {
      const list = await apilist(params);

      setValue({ list });
    };
    if (pathname === '/document') {
      fetch({ filter: 'document', search });
    }

    if (pathname === '/archived') {
      fetch({ archived: true, open, search });
    }
    if (pathname === '/recent') {
      fetch({ recent: true, search });
    }
    if (pathname === '/favorite') {
      fetch({ star: true, open, search });
    }
  }, [location]);

  const active = useCallback(
    (to: string) => {
      if (to === '/') {
        return location.pathname === '/' || location.pathname.includes('/my-files');
      }
      return to === location.pathname;
    },
    [location.pathname],
  );

  const handleLogOut = async () => {
    await apiLogout();
    window.location.href = '/login';
    toast.success('success logout');
  };

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setSrcText(e.target.value);
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate({
        pathname: location.pathname,
        search: new URLSearchParams({
          search: e.currentTarget.value,
        }).toString(),
      });
    }
  };

  return (
    <div className="min-h-screen max-w-[1440px] flex flex-col  m-auto">
      <div className="p-3 my-2 border-b-2 flex gap-2">
        <div className="min-w-[250px] ">
          <h4 className="text-2xl font-bold">File Manager</h4>
          <p className="text-[#5B6670]">Manage your files</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ..."
              className="border rounded h-9 w-96 ps-9 outline-none text-gray-400"
              onChange={handlechange}
              onKeyUp={handleKeyUp}
              value={srcText}
            />
            <div className="  absolute left-0 top-0 h-full aspect-square flex">
              <i className="fa-solid fa-magnifying-glass m-auto text-gray-400"></i>
            </div>
          </div>
          <Dropdown
            text={
              <div className="h-9 w-9 rounded-full bg-[#FF9F43] font-bold text-center leading-9 text-xl text-white">
                {value.user.name ? value.user.name[0] : ''}
              </div>
            }
            show={dropdown}
            setShow={() => setDropdown((prev) => !prev)}
            placement="bottom-end"
          >
            <div className="w-[250px] p-2 flex flex-col items-center">
              <div className="text-[12px] font-semibold text-gray-500 mb-1">{value.user.email}</div>
              <div className="h-14 w-14 rounded-full bg-[#FF9F43] font-bold text-center leading-[3.5rem] text-4xl text-white">
                {value.user.name ? value.user.name[0] : ''}
              </div>
              <div className="text-lg mt-1 mb-3">{value.user.name}</div>
              <div className="bg-[#fafbfe] rounded-2xl py-3 px-4 text-sm w-full">
                <div role="button" onClick={() => setModal(true)}>
                  <i className="fa-solid fa-pen-to-square me-2"></i>Update Profile
                </div>
                <div className="border my-2 -mx-3" />
                <div role="button" onClick={handleLogOut}>
                  <i className="fa-solid fa-right-from-bracket me-2"></i>Log Out
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
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
            {listMenu.map((item, i) => (
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
          <div className="flex flex-col items-center gap-2">
            <div className="h-2 w-full rounded bg-slate-400 overflow-hidden">
              <div
                className="bg-[#FF9F43] h-full"
                style={{
                  width: `${percent(size.value, size.max)}%`,
                }}
              />
            </div>
            <span className="text-[12px]">{`${convertSize({ value: size.value, unit: 'B' }, 'GB')}GB / ${convertSize({ value: size.max, unit: 'B' }, 'GB')}GB`}</span>
          </div>
        </aside>
        <Outlet />
      </div>
      <UploadFile
        show={show}
        onClose={(sum) => {
          if (sum) {
            sumFile();
          }
          setShow(false);
        }}
        remaining={size.max - size.value}
      />
      <UpdateProfile modal={modal} onClose={() => setModal(false)} />
    </div>
  );
};

export default App;
