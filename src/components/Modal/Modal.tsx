import { FC, ReactNode } from 'react';

import cx from 'classnames';

const Modal: FC<{ show: boolean; onClose: () => void; children: ReactNode }> = ({ show, onClose, children }) => {
  return (
    <div
      className={cx(
        'fixed w-screen left-0 z-10 inset-0  bg-opacity-50 transition-all duration-200 ease-linear px-5 h-screen',
        show ? 'visible bg-gray-900 py-5' : 'invisible',
      )}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cx(
          { 'bg-white shadow-md': show },
          'min-w-[400px] rounded-lg w-fit  m-auto max-w-full p-5 transition-all duration-200 ease-linear',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
