interface IRabitmqConfiguration {
  hostname: string;
  port: number;
  vhost: string;
  username: string;
  password: string;
}

const IRabitmqConfiguration = Symbol.for('IRabitmqConfiguration');

export { IRabitmqConfiguration };
