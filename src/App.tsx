import { useCallback, useEffect, useState } from 'react';

import cx from 'classnames';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';

import { file, plussCircle } from './assets/svg';
import CIcon from './components/CIcon';
import UploadFile from './components/Modal/UploadFile';
import { apiSumFile, apilist } from './element/API/myFile';
import { listMenu } from './helpers/constants';
import { convertSize, percent } from './helpers/convert';
import useStateApi from './helpers/hooks/useStateApi';

const App = () => {
  const location = useLocation();
  const { setValue } = useStateApi();
  const [searchParams] = useSearchParams();
  const open = searchParams.get('open') as string;

  const [show, setShow] = useState<boolean>(false);
  const [size, setSize] = useState<{ value: number; max: number }>({
    value: 0,
    max: convertSize({ value: 5, unit: 'GB' }, 'B'),
  });

  const sumFile = async () => {
    const value = await apiSumFile();
    setSize((prev) => ({ ...prev, value }));
  };
  useEffect(() => {
    sumFile();
  }, []);

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
        return location.pathname === '/' || location.pathname.includes('/my-files');
      }
      return location.pathname.includes(to);
    },
    [location.pathname],
  );

  return (
    <div className="min-h-screen max-w-[1440px] flex flex-col  m-auto">
      <div className="p-3  my-2 border-b-2">
        <h4 className="text-2xl font-bold">File Manager</h4>
        <p className="text-[#5B6670]">Manage your files</p>
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
    </div>
  );
};

export default App;
