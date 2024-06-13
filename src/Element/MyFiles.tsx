import { useEffect, useState } from 'react';

import cx from 'classnames';
import moment from 'moment';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

import { star } from '../assets/svg';
import CIcon from '../components/CIcon';
import CreateFolder from '../components/Form/CreateFolder';
import Modal from '../components/Modal/Modal';
import SwiperComponent from '../components/SwiperComponent';
import TableWrapper from '../components/TableWrapper';
import { convertSize } from '../helpers/convert';
import useStateApi from '../helpers/hooks/useStateApi';
import { apiCount, apiSlider, apilist } from './API/myFile';
import List from './List';

const overview = [
  {
    name: 'Folders',
    icon: '/folder.svg',
    key: 'folder',
    sum: 300,
    bg: 'bg-[#FFECD9]',
    to: '/folder',
  },
  {
    name: 'PDF',
    icon: '/pdf-02.svg',
    key: 'document',
    sum: 50,
    bg: 'bg-[#FFCCCC]',
    to: '/document',
  },
  {
    name: 'Images',
    icon: '/image.svg',
    key: 'image',
    sum: 240,
    bg: 'bg-[#BFEED4]',
    to: '/image',
  },
  {
    name: 'Videos',
    icon: '/video.svg',
    key: 'video',
    sum: 30,
    bg: 'bg-[#FFCCCC]',
    to: '/video',
  },
  {
    name: 'Audios',
    icon: '/audio.svg',
    key: 'audio',
    sum: 100,
    bg: 'bg-[#FFECD9]',
    to: '/audio',
  },
];
const MyFiles = () => {
  const [show, setShow] = useState<boolean>(false);

  const { value, setValue } = useStateApi();
  const param = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const open = searchParams.get('open') as string;

  const fetchList = async (params?: Partial<ParamsList>) => {
    window.scroll(0, 0);
    const list = await apilist(params);
    setValue({
      list,
    });
  };

  useEffect(() => {
    const fetch = async () => {
      const count = await apiCount();
      const slider = await apiSlider();
      setValue({
        count,
        slider,
      });
    };

    fetch();
  }, []);

  useEffect(() => {
    const params: Partial<ParamsList> = { open, filter: param.type };

    fetchList(params);
  }, [location]);

  if (open || param.type) return <List title="Folder" />;

  return (
    <div className="p-3 flex-1 overflow-hidden">
      <h4 className="mb-2">Overview</h4>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {overview.map((item, i) => (
          <Link to={`/my-files${item.to}`} key={i}>
            <div className={cx('rounded-t-lg p-6 flex justify-center', item.bg)}>
              <span className="h-16 w-16 flex">
                <img className="m-auto" src={item.icon} alt="Folder" />
              </span>
            </div>
            <div className="flex items-center justify-between rounded-b-lg p-4 bg-white">
              <h6>{item.name}</h6>
              <span>{`${value.count[item.key as keyof CountStorage].toLocaleString('id')} Files`}</span>
            </div>
          </Link>
        ))}
      </div>
      {value.slider.folder[0] && (
        <>
          <h4 className="mb-2 select-none">
            Folders
            <span className="ms-2 text-sm cursor-pointer">
              <i className="fa-solid fa-chevron-left  swiper-button-prev-folder opacity-5 me-2"></i>
              <i className="fa-solid fa-chevron-right swiper-button-next-folder"></i>
            </span>
          </h4>
          <div className="mb-6">
            <SwiperComponent type="folder">
              {value.slider.folder.map((item, i) => (
                <div key={i} className="swiper-slide  rounded-lg bg-white p-4 shadow-card ">
                  <div className="flex justify-between mb-3 group">
                    <div className="flex items-center">
                      <img className="me-2 h-8 w-8" src="/folder.svg" alt="Folder" />
                      <Link
                        to={{
                          pathname: location.pathname,
                          search: new URLSearchParams({
                            open: item.name,
                            star: item.star ? 'true' : 'false',
                          }).toString(),
                        }}
                        className="overflow-hidden"
                      >
                        <h6 className="font-semibold group-hover:underline">{item.name}</h6>
                      </Link>
                    </div>

                    <CIcon
                      icon={star}
                      height={16}
                      width={16}
                      fill={item.star ? '#FF9F43' : 'none'}
                      stroke={item.star ? '#FF9F43' : 'currentColor'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-sm">{`${item.count.toLocaleString('id')} Files`}</span>
                </div>
              ))}
            </SwiperComponent>
          </div>
        </>
      )}

      {value.slider.document[0] && (
        <>
          <h4 className="mb-2 select-none">
            Files
            <span className="ms-2 text-sm cursor-pointer">
              <i className="fa-solid fa-chevron-left  swiper-button-prev-files opacity-5 me-2"></i>
              <i className="fa-solid fa-chevron-right swiper-button-next-files"></i>
            </span>
          </h4>
          <div className="mb-6">
            <SwiperComponent type="files">
              {value.slider.document.map((item, i) => (
                <div key={i} className="swiper-slide rounded-lg bg-white p-4 shadow-card">
                  <div className="flex justify-between mb-3 w-full group">
                    <div className="flex items-center flex-auto overflow-hidden">
                      <img className="me-2 h-8 w-8" src="/pdf-02.svg" alt="files" />
                      <Link
                        to={`http://localhost:4000/api-v1/file/${item.id}`}
                        target="_blank"
                        className="overflow-hidden"
                      >
                        <h6 className="font-semibold truncate group-hover:underline">{item.name}</h6>
                      </Link>
                    </div>
                    <div className="min-w-6 h-6 flex">
                      <CIcon
                        icon={star}
                        height={16}
                        width={16}
                        fill={item.star ? '#FF9F43' : 'none'}
                        stroke={item.star ? '#FF9F43' : 'currentColor'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="cursor-pointer m-auto"
                      />
                    </div>
                  </div>
                  <span className="text-sm">
                    {`${moment(item.createdAt).format('DD MMM')}`} &#x2022;{' '}
                    {`${convertSize({ value: item.size, unit: 'B' }, 'MB')} MB`}
                  </span>
                </div>
              ))}
            </SwiperComponent>
          </div>
        </>
      )}
      <div className="rounded-md bg-white p-6 shadow-card">
        <div className="border-b border-solid border-[#f3f6f9] pb-6 mb-6 flex gap-2 items-center">
          <h4 className="text-lg">All Files</h4>
          <button
            className="py-1 px-3 border rounded border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43] hover:text-white"
            onClick={() => setShow(true)}
          >
            + New Folder
          </button>
          <Modal show={show} onClose={() => setShow(false)}>
            <CreateFolder onClose={() => setShow(false)} />
          </Modal>
        </div>
        <TableWrapper />
      </div>
    </div>
  );
};

export default MyFiles;
