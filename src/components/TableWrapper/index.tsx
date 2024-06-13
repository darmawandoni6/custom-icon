import type { FC } from 'react';
import { useMemo, useState } from 'react';

import moment from 'moment';
import type { To } from 'react-router-dom';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { star } from '../../assets/svg';
import { apiUpdateFile } from '../../element/API/apiFile';
import { apilist } from '../../element/API/myFile';
import { convertSize } from '../../helpers/convert';
import useStateApi from '../../helpers/hooks/useStateApi';
import CIcon from '../CIcon';
import Dropdown from '../Dropdown';
import RemoveFile from '../Form/RemoveFile';
import RenameFile from '../Form/RenameFile';
import Modal from '../Modal/Modal';

type TModal = {
  rename: List;
  remove: List;
};
const TableWrapper: FC<{ type?: string }> = () => {
  const [show, setShow] = useState<number>();
  const [modal, setModal] = useState<Partial<TModal>>();
  const loading = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const { value, setValue } = useStateApi();

  const { dsbPrev, dsbNext } = useMemo(() => {
    const { params, meta } = value.list;
    const dsb = { dsbPrev: true, dsbNext: false };

    if (params?.page) {
      dsb.dsbPrev = params.page === 1;
      dsb.dsbNext = params.page === meta.lastPage;
    }

    return dsb;
  }, [value.list.params]);

  const srcIcon = (type?: string) => {
    if (!type) return '/folder.svg';
    if (type.includes('application/') || type.includes('text/')) return '/pdf-02.svg';
    if (type.includes('image/')) return '/image.svg';
    if (type.includes('video/')) return '/video.svg';
    if (type.includes('audio/')) return '/audio.svg';

    return '/other.svg';
  };
  const linkUrl = (item: List): To => {
    if (!item.file)
      return {
        pathname: pathname,
        search: new URLSearchParams({
          open: item.name,
        }).toString(),
      };
    return `http://localhost:4000/api-v1/file/${item.id}`;
  };

  const handleModal = (item: List | undefined, type: keyof TModal) => {
    setModal(item ? { [type]: item } : undefined);
    setShow(undefined);
  };
  const handleArchive = async (item: List) => {
    try {
      await apiUpdateFile(
        item.id,
        {
          archived: !item.archived,
        },
        { folder: item.size ? undefined : item.name },
      );

      if (item.size) {
        const iDocument = value.slider.document.findIndex((v) => v.id === item.id);
        value.slider.document.splice(iDocument, 1);
      } else {
        const iFolder = value.slider.folder.findIndex((v) => v.id === item.id);
        value.slider.folder.splice(iFolder, 1);
      }

      const open = searchParams.get('folder') as string;

      const params = value.list.params;
      if (params) {
        params.open = open;
        params.archived = pathname === '/archived';
      }
      const list = await apilist(params);
      setValue({ list });
    } finally {
      setShow(undefined);
    }
  };

  const handleStar = async (item: List) => {
    try {
      await apiUpdateFile(
        item.id,
        {
          star: !item.star,
        },
        { folder: item.size ? undefined : item.name },
      );

      if (item.size) {
        const iDocument = value.slider.document.findIndex((v) => v.id === item.id);
        value.slider.document[iDocument].star = !item.star;
      } else {
        const iFolder = value.slider.folder.findIndex((v) => v.id === item.id);
        value.slider.folder[iFolder].star = !item.star;
      }

      const open = searchParams.get('folder') as string;

      const params = value.list.params;
      if (params) {
        params.open = open;
      }
      const list = await apilist(params);
      setValue({ list });
    } finally {
      setShow(undefined);
    }
  };

  const handlePage = async (isNext: boolean) => {
    const params = value.list.params;
    let vPage = 1;

    if (params?.page) {
      vPage = isNext ? params.page + 1 : params.page - 1;
    } else {
      vPage += 1;
    }

    const list = await apilist({ page: vPage });
    setValue({ list });
  };

  return (
    <>
      <table className="w-full my-2 border-[#dbe0e6] align-top border-collapse">
        <thead className="border-inherit border-solid border-0">
          <tr className="border-inherit border-solid border-0">
            {['Name', 'Last Modified', 'Size', 'Owner', 'Action'].map((item, i) => (
              <th className="border-b border-solid text-left p-3 text-base font-medium" key={i}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.list.data.map((item, i) => (
            <tr key={i}>
              <td className="p-3 align-middle text-sm border-b border-solid">
                <div className="flex gap-2 items-center">
                  <img width={32} height={32} className="me-2" src={srcIcon(item.type)} alt="Folder" />
                  <Link to={linkUrl(item)} target={item.file && '_blank'}>
                    <span className="hover:underline">{item.name}</span>
                  </Link>
                </div>
              </td>
              <td className="p-3 align-middle text-sm border-b border-solid">
                {moment(item.createdAt).format('MMM yyyy')}
              </td>
              <td className="p-3 align-middle text-sm border-b border-solid">
                {item.size ? `${convertSize({ value: item.size, unit: 'B' }, 'MB')} MB` : '_'}
              </td>
              <td className="p-3 align-middle text-sm border-b border-solid">Nolan Christopher</td>
              <td className="p-3 align-middle text-sm border-b border-solid">
                <div className="flex gap-2 items-center">
                  <div role="button" onClick={() => handleStar(item)}>
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
                  <Dropdown
                    show={show === i}
                    idx={i}
                    setShow={() => {
                      console.log({ show });
                      setShow((prev) => {
                        if (prev === i) return undefined;
                        return i;
                      });
                    }}
                  >
                    <span role="button" onClick={() => handleModal(item, 'rename')}>
                      <i className="fa-solid fa-pen-to-square me-2"></i>Rename
                    </span>
                    <span role="button" onClick={() => handleArchive(item)}>
                      <i className="fa-solid fa-box-archive me-2"></i>
                      {item.archived ? 'Un-Archive' : 'Archive'}
                    </span>
                    <span role="button" onClick={() => handleModal(item, 'remove')}>
                      <i className="fa-solid fa-trash-can me-2"></i>Remove
                    </span>
                  </Dropdown>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="py-6 flex justify-between">
        <span className="text-xs font-semibold">{`${value.list.meta.page} - ${value.list.meta.perPage} of ${value.list.meta.count.toLocaleString('id')} items`}</span>
        <section className="flex gap-2 items-center">
          <button className="w-8 h-8 opacity-[0.7]" disabled={dsbPrev} onClick={() => handlePage(false)}>
            <i className="fa fa-angle-left"></i>
          </button>
          <span className="w-8 h-8 text-center leading-8 rounded-full bg-[#ff9f43] text-white">
            {value.list.meta.page}
          </span>
          <button className="w-8 h-8 opacity-[0.7]" disabled={dsbNext} onClick={() => handlePage(true)}>
            <i className="fa fa-angle-right"></i>
          </button>
        </section>
      </footer>
      <Modal show={!!modal} onClose={() => !loading[0] && handleModal(undefined, 'rename')}>
        {modal?.rename && (
          <RenameFile item={modal?.rename} onClose={() => handleModal(undefined, 'rename')} loading={loading} />
        )}
        {modal?.remove && (
          <RemoveFile item={modal?.remove} onClose={() => handleModal(undefined, 'remove')} loading={loading} />
        )}
      </Modal>
    </>
  );
};

export default TableWrapper;
