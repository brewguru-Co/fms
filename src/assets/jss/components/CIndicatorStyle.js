const cIndicatorStyle = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 5,
  },
});

export default cIndicatorStyle;
