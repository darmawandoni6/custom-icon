import type { Dispatch, FC, SetStateAction } from 'react';

import { apiRemoveFile } from '../../element/API/apiFile';
import useStateApi from '../../helpers/hooks/useStateApi';

const RemoveFile: FC<{ item?: List; onClose: () => void; loading: [boolean, Dispatch<SetStateAction<boolean>>] }> = ({
  onClose,
  loading: [loading, setLoading],
  item,
}) => {
  const { value, setValue } = useStateApi();

  const onSubmit = async () => {
    if (!item) return;
    try {
      setLoading(true);

      const params = value.list.params;

      const list = await apiRemoveFile(item.id, params);

      if (item.size) {
        const iDocument = value.slider.document.findIndex((v) => v.id === item.id);
        value.slider.document.splice(iDocument, 1);
      } else {
        const iFolder = value.slider.folder.findIndex((v) => v.id === item.id);
        value.slider.folder.splice(iFolder, 1);
      }

      setValue({ ...value, list });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-5">
        <i className="fa-solid fa-trash-can text-red-600 text-7xl mb-5" />
        <h1 className="text-3xl font-bold mb-2">Confirm Delete</h1>
        <span className="text-gray-400">Are you sure want to delete this item ?</span>
      </div>
      <div className="flex justify-center gap-3  font-semibold">
        <button
          className="bg-red-600 text-white px-5 py-2 rounded border border-red-600 shadow"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Delete'}
        </button>
        <button onClick={onClose} className="text-gray-400 px-5 py-2 border shadow rounded" disabled={loading}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default RemoveFile;
