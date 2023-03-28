import { Box, Image, Header } from 'grommet';
import './Header.css';
import gogglesIcon from '../../assets/noun-goggles.svg';

export default function AppHeader() {
  return (
    <Header>
      <Box width="small" height="75px">
        <Image src={gogglesIcon} fit="cover" />
      </Box>
    </Header>
  );
}
