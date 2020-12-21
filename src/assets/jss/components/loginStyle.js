import { GRAY, WHITE, RED } from '..';

const loginStyle = {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
  },
  logoWrapper: {
    background: `${GRAY[7]}`,
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: 'white',
    fontSize: '2rem',
    letterSpacing: '5px',
    textDecoration: 'none',
  },
  label: {
    fontSize: '1rem',
    color: `${GRAY[6]}`,
    marginBottom: '0.25rem',
  },
  content: {
    padding: '2rem',
  },
  input: {
    marginBottom: '2rem',
  },
  button: {
    width: '100%',
    paddingTop: '0.6rem',
    paddingBottom: '0.5rem',

    background: `${GRAY[6]}`,
    color: `${WHITE}`,

    textAlign: 'center',
    fontSize: '1.25rem',
    fontWeight: 500,
  },
  error: {
    color: `${RED[7]}`,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '2rem',
  },
};
export default loginStyle;
