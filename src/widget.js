// could alternatively support the new ga style api
// that wouldnt need the stub ( eg. drift('init', {...}) )
export const installWidgetStub = () => {
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

export const installDrift = ({ embed_id } = {}) => {
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
