function initializeHost({ meta_frame_origin, log = false } = {}) {
  if(!meta_frame_origin) {
    throw new Error('meta_frame_origin must be provided to initializeHost')
  }

  window.drift_meta_frame = {
    bounds: {},
  };

  const setUpFrameAndStyles = () => {
    const $style = document.createElement('style');
    $style.innerHTML = `
      #drift-meta-frame {
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        position: fixed;
        top: 0px;
        left: 0px;
      }
     `;

    const $frame = document.createElement('iframe')

    $frame.setAttribute('src', meta_frame_origin)
    $frame.setAttribute('id', `drift-meta-frame`)
    $frame.setAttribute('scrolling', `no`)
    $frame.setAttribute('frameborder','0')

    document.head.appendChild($style);
    document.body.appendChild($frame);
  }

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

  setUpFrameAndStyles()
}

export default initializeHost;
