import React from 'react';

const AllFile = () => {
  return (
    <div className="rounded-md bg-white p-6 shadow-card">
      <div className="border-b border-solid border-[#f3f6f9] pb-6 mb-6 flex gap-2 items-center">
        <h4 className="text-lg">All Files</h4>
        <button
          className="py-1 px-3 border rounded border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43] hover:text-white"
          onClick={() => setShow(true)}
        >
          + New Folder
        </button>
        <ModalFolder show={show} onClose={() => setShow(false)} />
      </div>
      <TableWrapper />
    </div>
  );
};

export default AllFile;
