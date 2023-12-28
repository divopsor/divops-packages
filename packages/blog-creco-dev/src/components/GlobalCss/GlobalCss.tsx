import { GLOBAL_CSS } from './constants';

export const GlobalCss = ({ additionalCss }: { additionalCss?: string }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line react/no-unknown-property
    <style global jsx>
      {GLOBAL_CSS}
      {additionalCss == null ? '' : additionalCss}
    </style>
  );
};
