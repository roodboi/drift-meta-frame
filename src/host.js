if (window) {
  window.drift_meta_frame = {
    ready: false,
    bounds: {},
    q: [],
  };
}

export const drift = (...rest) => {
  if (!window) {
    console.info('drift-meta-frame can only be run in the browser.');
    return;
  }

  const $frame = document.querySelector('#drift-meta-frame');

  if ($frame && window.drift_meta_frame.ready) {
    $frame.contentWindow.postMessage(
      { type: 'drift_m_F::passThroughApi', data: [...rest] },
      '*'
    );
  } else {
    window.drift_meta_frame.q.push([...rest]);
  }
};

const clearQ = () => {
  // we need to knock off calls as we iterate through them
  // so reverse the q and decrement.
  window.drift_meta_frame.q = window.drift_meta_frame.q.reverse();
  let i = window.drift_meta_frame.q.length;

  while (i--) {
    drift(...window.drift_meta_frame.q[i]);
    window.drift_meta_frame.q.splice(i, 1);
  }
};

function initializeHost({ frame_url, log = false } = {}) {
  if (!window) {
    console.info('drift-meta-frame can only be run in the browser.');
    return;
  }

  if (!frame_url) {
    throw new Error('frame_url must be provided to initializeHost');
  }

  // minimum context needed for PB targeting.
  const getContext = () => ({
    window: {
      location: {
        hash: window.location.hash,
        host: window.location.host,
        hostname: window.location.hostname,
        href: window.location.href,
        origin: window.location.origin,
        pathname: window.location.pathname,
        port: window.location.port,
        protocol: window.location.protocol,
        search: window.location.search,
      },
      navigator: {
        language: window.navigator.language,
        browserLanguage: window.navigator.browserLanguage,
        userAgent: window.navigator.userAgent,
      },
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    },
    document: {
      title: document.title,
      referrer: document.referrer,
    },
  });

  // setup overlay meta frame
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

    const $frame = document.createElement('iframe');

    $frame.setAttribute('src', frame_url);
    $frame.setAttribute('id', `drift-meta-frame`);
    $frame.setAttribute('scrolling', `no`);
    $frame.setAttribute('frameborder', '0');

    document.head.appendChild($style);
    document.body.appendChild($frame);

    return $frame;
  };

  // toggle focus between host and frame overlay
  const setPointerEvents = ({ isOnDrift }) => {
    const $frame = document.querySelector('#drift-meta-frame');

    log && console.log(`is on drift: ${isOnDrift}`);

    if (isOnDrift) {
      $frame.style.pointerEvents = '';
    } else {
      $frame.style.pointerEvents = 'none';
    }
  };

  // handlers for messages from frame
  const messageHandlers = {
    'drift_m_F::bounds': (data) => {
      window.drift_meta_frame.bounds = data.bounds;
    },
    'drift_m_F::scroll_update': (data) => {
      setPointerEvents({ isOnDrift: data.isOnDrift });
    },
    'drift_m_F::on_frame_load': (data) => {
      const $frame = document.querySelector('#drift-meta-frame');
      $frame.contentWindow.postMessage(
        { type: 'drift_m_F::init', context: getContext() },
        '*'
      );

      window.drift_meta_frame.ready = true;

      // if we have picked up any calls to the drift api
      // before it was initialized, process those now.
      clearQ();
    },
  };

  // handle events coming from the frame.
  window.addEventListener(
    'message',
    (event) => {
      const $frame = document.querySelector('#drift-meta-frame');
      if (
        !($frame && $frame.contentWindow) &&
        event.source === iframe.contentWindow
      ) {
        return;
      }

      if (event.data.type && messageHandlers[event.data.type]) {
        const handler = messageHandlers[event.data.type];
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

  setUpFrameAndStyles();
}

export default initializeHost;
