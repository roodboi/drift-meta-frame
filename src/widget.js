/**
 * drift window API
 * */
const installWidgetStub = () => {
  window.drift =
    window.drift ||
    function () {
      (drift.q = drift.q || []).push(arguments);
    };
};

const insertConductor = () => {
  const scriptTag = document.createElement('script');
  scriptTag.id = 'drift-widget-snippet';
  scriptTag.src = `https://js.driftt.com/conductor`;
  scriptTag.defer = 'defer';
  scriptTag.async = 'true';
  scriptTag.crossorigin = 'anonymous';

  document.body.appendChild(scriptTag);
};

export const installDrift = ({ embed_id } = {}) => {
  // create window fn.
  installWidgetStub();

  // load conductor.
  insertConductor();
};
