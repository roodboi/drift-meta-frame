import { installDrift, installWidgetStub } from './widget.js';

function initializeMetaFrame({ embed_id } = {}) {
  if (!embed_id) {
    throw new Error('you must provide a Drift embed id');
  }

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
  installDrift({ embed_id });
}

export default initializeMetaFrame;
