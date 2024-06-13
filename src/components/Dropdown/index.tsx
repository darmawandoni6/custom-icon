import type { FC, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import * as Popper from '@popperjs/core';

const Dropdown: FC<{ idx: number; show: boolean; setShow: () => void; children: ReactNode }> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const popperPopup = useRef<HTMLDivElement | null>(null);
  const popperButton = useRef<HTMLButtonElement | null>(null);

  let popperInstance: Popper.Instance;

  useEffect(() => {
    if (props.show) {
      togglePopper();

      const handleOutside = (e: MouseEvent) => {
        if (!popperButton.current?.contains(e.target as Node) && !popperPopup.current?.contains(e.target as Node)) {
          props.setShow();
        }
      };
      document.addEventListener('click', handleOutside);

      return () => {
        document.removeEventListener('click', handleOutside);

        hidePopper();
      };
    }
  }, [props.show]);

  const createInstance = () => {
    if (popperButton.current && popperPopup.current) {
      popperInstance = Popper.createPopper(popperButton.current, popperPopup.current, {
        placement: 'bottom-start', //preferred placement of popper
        modifiers: [
          {
            name: 'offset', //offsets popper from the reference/button
            options: {
              offset: [0, 2],
            },
          },
          {
            name: 'flip', //flips popper with allowed placements
            options: {
              allowedAutoPlacements: ['right', 'left', 'top', 'bottom'],
              rootBoundary: 'viewport',
            },
          },
        ],
      });
    }
  };

  const showPopper = () => {
    popperPopup.current?.setAttribute('show-popper', '');
    createInstance();
  };
  function destroyInstance() {
    if (popperInstance) {
      popperInstance.destroy();
    }
  }

  const hidePopper = () => {
    if (popperPopup.current) {
      popperPopup.current.removeAttribute('show-popper');
      destroyInstance();
    }
  };

  const togglePopper = () => {
    if (popperPopup.current?.hasAttribute('show-popper')) {
      hidePopper();
    } else {
      showPopper();
    }
  };

  return (
    <div ref={ref} className="relative w-fit">
      <button className="p-2" ref={popperButton} onClick={props.setShow}>
        <i className="fa fa-ellipsis-v"></i>
      </button>
      <div ref={popperPopup} className="popper-popup">
        <ol>{Array.isArray(props.children) && Array(props.children).map((item, i) => <li key={i}>{item}</li>)}</ol>
      </div>
    </div>
  );
};

export default Dropdown;
