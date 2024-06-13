import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';

import cx from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { apiUploadFile } from '../../element/API/uploadFile';
import useStateApi from '../../helpers/hooks/useStateApi';

const UploadFile: FC<{ show: boolean; onClose: (sum?: boolean) => void; remaining: number }> = ({
  show,
  onClose,
  remaining,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [form, setForm] = useState<{ text: string; file: File | null }>({
    text: '',
    file: null,
  });

  const [searchParams] = useSearchParams();
  const param = useParams();
  const { value, setValue } = useStateApi();

  useEffect(() => {
    if (show) {
      setForm({
        text: '',
        file: null,
      });
    }
  }, [show]);

  const handlePreview = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setError('');
    setForm({
      text: e.target.value,
      file: e.target.files[0],
    });
  };

  const previewImg = () => {
    if (form.file?.type.includes('application/'))
      return (
        <>
          <img className="h-[96px] m-auto" src="/pdf-02.svg" alt="" />
          <div className="text-center opacity-[.6] text-sm select-none">{form.file.name}</div>
        </>
      );
    if (form.file?.type.includes('image/'))
      return (
        <>
          <img className="h-[96px] m-auto" src={URL.createObjectURL(form.file)} alt="" />
          <div className="text-center opacity-[.6] text-sm select-none">{form.file.name}</div>
        </>
      );
    if (form.file?.type.includes('video/'))
      return (
        <>
          <img className="h-[96px] m-auto" src="/video.svg" alt="" />
          <div className="text-center opacity-[.6] text-sm select-none">{form.file.name}</div>
        </>
      );
    if (form.file?.type.includes('audio/'))
      return (
        <>
          <img className="h-[96px] m-auto" src="/audi.svg" alt="" />
          <div className="text-center opacity-[.6] text-sm select-none">{form.file.name}</div>
        </>
      );

    return (
      <>
        <div className="text-8xl text-center opacity-[.6] h-24">
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <div className="text-center opacity-[.6] text-sm select-none">Drag and drop a file to upload</div>
      </>
    );
  };

  const handleUpload = async () => {
    const { file } = form;
    if (!file) return;

    if (file.size > remaining) {
      setError('Ruang Penyimpanan tidak mencukupin');
      return;
    }

    const frm = new FormData();
    frm.append('file', file);
    if (searchParams.get('folder')) {
      frm.append('folder', searchParams.get('folder') as string);
    }
    try {
      setLoading(true);
      const params = value.list.params;
      if (params) {
        params.filter = param.type;
        params.open = searchParams.get('folder') as string;
      }
      const list = await apiUploadFile(frm, param);
      setValue({ list });
      onClose(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cx(
        'fixed w-screen left-0 z-10 inset-0  bg-opacity-50 transition-all duration-200 ease-linear px-5 h-screen',
        show ? 'visible bg-gray-900 py-5' : 'invisible',
      )}
      onClick={() => !loading && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-md w-fit  m-auto max-w-full p-5 text-center"
      >
        <label htmlFor="upload" className="block w-[400px]">
          <div className="p-3 border border-dashed rounded cursor-pointer">
            <div className="mb-2">{previewImg()}</div>
          </div>
        </label>
        <input id="upload" type="file" className="hidden" onChange={handlePreview} value={form.text} />
        <div
          className={cx('text-sm mt-2 text-red-400 transition-all duration-200 ease-linear opacity-0', {
            ['opacity-100']: !!error,
          })}
        >
          <span className="font-bold">{error}</span>
        </div>

        <button
          className="py-1 px-4 rounded bg-[#ff9f43] mt-3 text-yellow-50 select-none"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? (
            'Loading...'
          ) : (
            <>
              <i className="fa-solid fa-arrow-up-from-bracket fa-fw me-2"></i>Upload
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
