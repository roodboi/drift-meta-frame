function initializeMetaFrame({ embed_id } = {}) {
  // could alternatively support the new ga style api
  // that wouldnt need the stub ( eg. drift('init', {...}) )
  const installWidgetStub = () => {
    const drift =
      (window.drift =
      window.driftt =
        window.drift || window.driftt || []);

    const methods = [
      'init',
      'identify',
      'track',
      'reset',
      'debug',
      'show',
      'ping',
      'page',
      'hide',
      'off',
      'on',
      'config',
      'setUserJwt',
      'waitForUserJwt',
    ];

    methods.forEach((key) => {
      if (!drift[key]) {
        drift[key] = (...args) => {
          drift.push([key, ...args]);
        };
      }
    });
  };

  const installDrift = () => {
    const scriptTag = document.createElement('script');
    scriptTag.id = 'drift-widget-snippet';
    scriptTag.src = `https://js.driftt.com/include/${
      Math.ceil(new Date() / 3e5) * 3e5
    }/${embed_id}.js`;
    scriptTag.defer = 'defer';
    scriptTag.type = 'text/javascript';
    scriptTag.onload = () => {
      window.drift.init(embed_id);
    };
    document.body.appendChild(scriptTag);
  };

  window.addEventListener(
    'message',
    (event) => {
      // to avoid adding a dependency on what specific
      // events may effect a change in dimensions or
      // addition of frame, we just liten to all events
      // which will include both dom requests for sizing
      // and picks up middleware that triggers the reqs.
      // I dont think this is really a performance concern
      // but it is a lot of messages.
      if (event.origin === 'https://js.driftt.com') {
        // might want to be a little more specific with selector
        const frames = document.querySelectorAll('iframe');

        const bounds = [...frames]
          .map(($el) => $el.getBoundingClientRect())
          .filter(({ height }) => height > 0);

        const xValues = bounds.map((boundSet) => boundSet.x);
        const yValues = bounds.map((boundSet) => boundSet.top);

        const closestX = Math.min(...xValues);
        const closestY = Math.min(...yValues);

        // could add height and width here to allow for sizing iframe
        // if needed to support browsers that dont support point-events. (ie10..)
        const message = {
          event: 'drift_bounds',
          bounds: {
            x: closestX,
            y: closestY,
          },
        };

        window.parent.postMessage(message, '*');
      }
    },
    false
  );

  document.addEventListener('mousemove', (event) => {
    const isOnDrift = event.path[0].className.includes('drift-frame');

    const message = {
      event: 'drift_scroll_update',
      isOnDrift: isOnDrift,
    };

    window.parent.postMessage(message, '*');
  });

  installWidgetStub();
  installDrift();
}

export default initializeMetaFrame;
