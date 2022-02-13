import { installDrift } from './widget.js';

function initializeMetaFrame({ embed_id } = {}) {
  if (!embed_id) {
    throw new Error('you must provide a Drift embed id');
  }

  const messageHandlers = {
    'drift_m_F::init': (message) => {
      // passing minimum context from parent primarily for playbook targeting
      drift('setContext', message.context);
      // using context we trigger a page event to capture it.
      drift('page');
      // widget go go go.
      drift('init', embed_id);
    },
    'drift_m_F::passThroughApi': (message) => {
      drift(...message.data);
    },
  };

  // listen for messages from host
  window.addEventListener('message', function (event) {
    if (event.source !== window.parent) {
      return;
    }

    const message = event.data;

    if (message && message.type && messageHandlers[message.type]) {
      messageHandlers[message.type](message);
    }
  });

  // listen for messages from drift iframess
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
          type: 'drift_m_F::bounds',
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

  // lisen for mouse on the frame when we are focused in it
  // so that as soon as we are not, we can trigger focus back
  // to the host
  document.addEventListener('mousemove', (event) => {
    const isOnDrift = event.path[0].className.includes('drift-frame');

    const message = {
      type: 'drift_m_F::scroll_update',
      isOnDrift: isOnDrift,
    };

    window.parent.postMessage(message, '*');
  });

  // set things up
  installDrift();

  // let the host know things are ready and to send
  // us the trigger to init drift and set context.
  const message = {
    type: 'drift_m_F::on_frame_load',
  };

  window.parent.postMessage(message, '*');
}

export default initializeMetaFrame;
