import type { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import { apiUpdateFile } from '../../element/API/apiFile';
import useStateApi from '../../helpers/hooks/useStateApi';

const RenameFile: FC<{ item?: List; onClose: () => void; loading: [boolean, Dispatch<SetStateAction<boolean>>] }> = ({
  onClose,
  loading: [loading, setLoading],
  item,
}) => {
  const [text, setText] = useState<string>('');

  const { value, setValue } = useStateApi();

  useEffect(() => {
    if (item) {
      setText(item.name);
    }
  }, [item]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const rename = (v: string) => {
    const checkType = v.split('.');
    if (item?.size && !checkType[1]) {
      const arr: string[] = item.name.split('.');
      if (arr[1]) {
        const type = arr[arr.length - 1];
        return v.trim() + '.' + type;
      }
    }
    return v;
  };

  const onSubmit = async () => {
    if (!item) return;
    try {
      setLoading(true);
      const renameText = rename(text);
      const params: Partial<ParamsList> = {};
      if (!item.file) {
        params.oldName = item.name;
      }

      await apiUpdateFile(item.id, { name: renameText }, params);

      const iList = value.list.data.findIndex((v) => v.id === item.id);
      value.list.data[iList].name = renameText;

      if (item.size) {
        const iDocument = value.slider.document.findIndex((v) => v.id === item.id);
        value.slider.document[iDocument].name = renameText;
      } else {
        const iFolder = value.slider.folder.findIndex((v) => v.id === item.id);
        value.slider.folder[iFolder].name = renameText;
      }

      setValue({ ...value });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="font-bold mb-3">Rename File</h1>
      <input
        className="block mb-4 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          w-full"
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
          {loading ? 'Loading...' : 'Rename'}
        </button>
      </div>
    </>
  );
};

export default RenameFile;
