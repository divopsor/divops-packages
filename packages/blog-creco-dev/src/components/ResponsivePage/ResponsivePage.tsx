import { HTMLAttributes, ReactNode } from 'react';
import { Colors } from '../../colors';
import { DesktopPage } from './DesktopPage';
import { MobilePage } from './MobilePage';

interface ResponsivePageProps extends HTMLAttributes<HTMLDivElement> {
  mainBackgroundColor: string;
  subBackgroundColor: string;
  fontColor: string;
  desktopPageWidth: string;
  children?: ReactNode;
}

export const ResponsivePage = ({
  mainBackgroundColor = Colors.DeepDark,
  subBackgroundColor = Colors.Dark,
  fontColor = Colors.SoftWhite,
  desktopPageWidth = '840px',
  ...props
}: ResponsivePageProps) => {

  return (
    <>
      {/* 모바일 반응 페이지 */}
      <MobilePage
        mainBackgroundColor={mainBackgroundColor}
        fontColor={fontColor}
        {...props}
      />
      {/* 데스크탑 반응 페이지 */}
      <DesktopPage
        mainBackgroundColor={mainBackgroundColor}
        subBackgroundColor={subBackgroundColor}
        fontColor={fontColor}
        desktopPageWidth={desktopPageWidth}
        {...props}
      />
    </>
  );
};
