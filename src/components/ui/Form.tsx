import { Box, Title } from '@mantine/core';

type DirectionProperties = 'column' | 'row';
type JustifyOrAlign = 'center' | 'flex-start' | 'flex-end';

interface Props {
  title?: string;
  titleColor?: string;
  flexDirection?: DirectionProperties;
  justify?: JustifyOrAlign;
  align?: JustifyOrAlign;
  gap?: number;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

const Form = ({
  title = 'default value',
  titleColor,
  flexDirection = 'column',
  justify = 'center',
  align = 'center',
  gap = 0,
  children,
  onSubmit,
}: Props) => {
  return (
    <Box
      component='form'
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: flexDirection,
        justifyContent: justify,
        alignItems: align,
        gap: gap,
      }}
      onSubmit={onSubmit}
    >
      <Title order={3} fw={700} color={titleColor}>
        {title}
      </Title>
      {children}
    </Box>
  );
};

export default Form;
