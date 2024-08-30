import { useMediaQuery, useTheme } from '@mui/material';

export const useBreakpoints = (): { isSm: boolean; isMd: boolean; isLg: boolean } => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  console.log('isSm:', isSm, 'isMd:', isMd, 'isLg:', isLg);

  return { isSm, isMd, isLg };
};

