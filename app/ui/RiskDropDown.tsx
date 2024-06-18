'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TriangleDownIcon } from '@radix-ui/react-icons';
import { BarChart } from '@tremor/react';

const initialState = {
  math_risk: false,
  read_risk: false,
  susp_risk: false,
};
const RiskDropdown = ({
  riskOptions,
  setRiskOption,
}: {
  riskOptions: any;
  setRiskOption: any;
}) => {
  const [title, setTitle] = useState('Options');
  useEffect(() => {}, [riskOptions]);

  return (
    <div className="flex justify-end">
      <div className="">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            asChild
            className="flex items-center justify-center"
          >
            <button
              className="text-violet11 shadow-blackA4 hover:bg-violet3 flex  items-center justify-center gap-x-4 rounded-md border-transparent bg-white px-6 py-2 shadow-[0_2px_10px] outline-none transition focus:shadow-[0_0_0_2px] focus:shadow-black"
              aria-label="Customise options"
            >
              <p>{title}</p>
              <TriangleDownIcon width={20} height={20} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="  data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
              sideOffset={5}
            >
              {Object.keys(riskOptions).map((ele: any) => {
                return (
                  <div key={ele}>
                    <DropdownMenu.Item
                      onClick={() => {
                        setRiskOption({ ...initialState, [ele]: true });
                        setTitle(ele);
                      }}
                      className=" text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-neutral-100/80 data-[disabled]:pointer-events-none"
                    >
                      {ele}
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="bg-violet6 m-[5px] h-[1px]" />
                  </div>
                );
              })}

              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default RiskDropdown;
