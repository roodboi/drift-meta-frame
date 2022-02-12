function initializeHost({ meta_frame_origin = '/frame', log = false } = {}) {
  window.drift_meta_frame = {
    bounds: {},
  };

  const setPointerEvents = ({ isOnDrift }) => {
    const metaFrame = document.querySelector('#drift-meta-frame');

    log && console.log(`is on drift: ${isOnDrift}`);

    if (isOnDrift) {
      metaFrame.style.pointerEvents = '';
    } else {
      metaFrame.style.pointerEvents = 'none';
    }
  };

  const messageHandlers = {
    drift_bounds: (data) => {
      window.drift_meta_frame.bounds = data.bounds;
    },
    drift_scroll_update: (data) => {
      setPointerEvents({ isOnDrift: data.isOnDrift });
    },
  };

  window.addEventListener(
    'message',
    (event) => {
      // should check for origin here.
      // event.origin === meta_frame_origin
      if (event.data.event) {
        const handler = messageHandlers[event.data.event];
        handler(event.data);
      }
    },
    false
  );

  document.addEventListener('mousemove', (event) => {
    const isInXPath = event.clientX >= window.drift_meta_frame.bounds.x;
    const isInYPath = event.clientY >= window.drift_meta_frame.bounds.y;
    const isOnDrift = isInXPath && isInYPath;

    setPointerEvents({ isOnDrift });
  });
}

export default initializeHost;
