import { FC, useEffect, useState } from 'react';

import CreateFolder from '../components/Form/CreateFolder';
import Modal from '../components/Modal/Modal';
import TableWrapper from '../components/TableWrapper';

const List: FC<{ title: string; add?: boolean }> = (props) => {
  const add = props.add ?? false;

  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="p-3 flex-1 overflow-hidden">
      <div className="rounded-md bg-white p-6 shadow-card">
        <div className="border-b border-solid border-[#f3f6f9] pb-6 mb-6 flex gap-2 items-center">
          <h4 className="text-lg">{props.title}</h4>
          {add && (
            <button
              className="py-1 px-3 border rounded border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43] hover:text-white"
              onClick={() => setShow(true)}
            >
              + New Folder
            </button>
          )}
          <Modal show={show} onClose={() => setShow(false)}>
            <CreateFolder onClose={() => setShow(false)} />
          </Modal>
        </div>
        <TableWrapper />
      </div>
    </div>
  );
};

export default List;
