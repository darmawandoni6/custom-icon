import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import type { PCreateFolder } from '../../element/API/createFolder';
import { apicReateFolder } from '../../element/API/createFolder';
import useStateApi from '../../helpers/hooks/useStateApi';

const CreateFolder: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const { setValue } = useStateApi();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    const parent = searchParams.get('folder');
    const payload: PCreateFolder = {
      folder: text,
    };
    if (parent) {
      payload.sub = parent;
    }
    try {
      setLoading(true);
      const list = await apicReateFolder(payload);

      setValue({
        list,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="font-bold mb-3">New Folder</h1>
      <input
        className="block mb-4 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          w-[400px]"
        type="text"
        placeholder="Untitled folder"
        value={text}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-3 text-[#FF9F43] font-semibold">
        <button onClick={onClose} disabled={loading}>
          Cancel
        </button>
        <button onClick={onSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Create'}
        </button>
      </div>
    </>
  );
};

export default CreateFolder;
