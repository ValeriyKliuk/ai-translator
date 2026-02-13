import * as Select from '@radix-ui/react-select';
import type { Language } from '../../domain/entities/Translation';

interface LanguageSelectorProps {
  value: Language;
  onChange: (value: Language) => void;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange, disabled }) => {
  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger className="inline-flex items-center justify-between rounded px-4 py-2 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]">
        <Select.Value />
        <Select.Icon className="ml-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200">
          <Select.Viewport className="p-1">
            <Select.Item
              value="english"
              className="relative flex items-center px-8 py-2 text-sm rounded cursor-pointer hover:bg-blue-50 focus:bg-blue-50 focus:outline-none select-none"
            >
              <Select.ItemText>English</Select.ItemText>
              <Select.ItemIndicator className="absolute left-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4L6 11.5L2.5 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item
              value="ukrainian"
              className="relative flex items-center px-8 py-2 text-sm rounded cursor-pointer hover:bg-blue-50 focus:bg-blue-50 focus:outline-none select-none"
            >
              <Select.ItemText>Ukrainian</Select.ItemText>
              <Select.ItemIndicator className="absolute left-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4L6 11.5L2.5 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
