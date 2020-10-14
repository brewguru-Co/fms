const historyChartStyle = {
  container: {
    width: '80vw',
    height: 300,
    overflow: 'auto',
  },
  content: {
    width: (props) => (props.length > 150 ? props.length * 10 : '100%'),
    height: 290,
  },
  y: {
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none',
  },
};
export default historyChartStyle;
