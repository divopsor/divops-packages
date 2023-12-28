import { GLOBAL_CSS } from './constants';

export const GlobalCss = ({ additionalCss }: { additionalCss?: string }) => {
  return (
    <style>
      {GLOBAL_CSS}
      {additionalCss == null ? '' : additionalCss}
    </style>
  );
};
