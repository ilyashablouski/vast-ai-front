import AppBar from '@mui/material/AppBar';
import { Container, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Logo as LogoIcon } from '@components/icons';
import useGlobalContext from '@/store/context.tsx';
import useDarkMode from '@/hooks/useDarkMode.ts';
import useMediaQueries from '@/hooks/useMediaQueries.ts';
import { logEventGA } from '@/utils/google.analytics.ts';
import { trackEventFAB } from '@/utils/facebook.pixel.ts';

const Header = () => {
  const { toggleModal } = useGlobalContext();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const { isMobile } = useMediaQueries();

  const handleClick = () => {
    toggleModal(true);
    logEventGA('ButtonClick', {
      category: 'User Interaction',
      button_name: 'Login',
    });
    trackEventFAB('ButtonClick', { buttonName: 'Login' });
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.header }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center" height="64px">
          <Stack direction="row" alignItems="center" color={isDarkMode ? '#E0D0FA' : '#C8B3E9'}>
            <LogoIcon />
            {!isMobile && (
              <Typography
                ml={1}
                component="span"
                fontFamily='"Source Code Pro", monospace;'
                fontWeight="600"
                fontSize="16px"
              >
                Dataxide AI
              </Typography>
            )}
          </Stack>

          <Stack direction="row" alignItems="center">
            <Stack mr={3}>
              <Typography variant="body2" color={theme.palette.text.primary}>
                Credits:
              </Typography>
              <Typography variant="h3" textAlign="right">
                $ 0
              </Typography>
            </Stack>

            <Button variant="contained" color="secondary" onClick={handleClick}>
              LOGIN
            </Button>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
