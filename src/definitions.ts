export interface IDetailedError<D> extends Error {
  details?: D;
}

export type LogFn = (message?: any, ...optionalParams: any[]) => void;

export interface LoggerOptions {
  silent?: boolean;
}

export interface ILogger {
  infofn: LogFn;
  warnfn: LogFn;
  errorfn: LogFn;
  info(message?: any, ...optionalParams: any[]);
  warn(message?: any, ...optionalParams: any[]);
  error(message?: any, ...optionalParams: any[]);
}

export interface ISettingsUrls {
  api?: string;
}

export interface ICoreSettings {
  /**
   * Your app ID.
   */
  app_id: string;

  /**
   * @hidden
   */
  urls?: any;
}

export interface ISettings {
  core: ICoreSettings;
  push?: PushOptions;
  logger?: LoggerOptions;
}

export interface IConfig {
  settings: ISettings;

  register(settings: ISettings);
  get(name: string): any;
  getURL(name: string): string;
}

export interface IClient {
  baseUrl: string;

  get(endpoint: string);
  post(endpoint: string);
  put(endpoint: string);
  patch(endpoint: string);
  delete(endpoint: string);
  request(method: string, endpoint: string);
}

export type EventHandler = (data: Object) => any;

export interface IEventEmitter {
  on(event: string, callback: EventHandler);
  once(event: string, callback: () => void);
  emit(event: string, data?: Object);
  emitted(event: string): number;
}

/**
 * @hidden
 */
export interface StorageDependencies {
  strategy: IStorageStrategy;
}

/**
 * @hidden
 */
export interface StorageOptions {
  prefix?: string;
  cache?: boolean;
}

export interface IStorage<T> {
  get(key: string): T;
  set(key: string, value: T): void;
  delete(key: string): void;
}

/**
 * @hidden
 */
export interface IStorageStrategy {
  get(key: string): string;
  set(key: string, value: string): void;
  delete(key: string): void;
}

/**
 * @hidden
 */
export interface DeviceIsConnectedToNetworkOptions {
  strictMode?: boolean;
}

/**
 * @hidden
 */
export interface DeviceDependencies {
  emitter: IEventEmitter;
}

/**
 * @hidden
 */
export interface IDevice {
  deviceType: string;

  isAndroid(): boolean;
  isIOS(): boolean;
}

/**
 * @hidden
 */
export interface CordovaDependencies {
  appStatus: IAppStatus;
  device: IDevice;
  emitter: IEventEmitter;
  logger: ILogger;
}

/**
 * @hidden
 */
export interface CordovaOptions {}

/**
 * @hidden
 */
export interface ICordova {
  app: IAppStatus;

  bootstrap(): void;
}

/**
 * @hidden
 */
export interface CoreDependencies {
  config: IConfig;
  logger: ILogger;
  emitter: IEventEmitter;
  insights: IInsights;
}

/**
 * @hidden
 */
export interface ICore {
  version: string;

  init(): void;
}

/**
 * @hidden
 */
export interface UserContextDependencies {
  config: IConfig;
  storage: IStorage<StoredUser>;
}

export interface IUserContext {
  label: string;

  load(user: IUser): IUser;
  store(user: IUser): void;
  unstore(): void;
}

export interface StoredUser {
  id: string;
  data: Object;
  details: Object;
  social: Object;
  fresh: boolean;
}

/**
 * @hidden
 */
export interface IUserData {
  data: Object;

  get(key: string, defaultValue: any);
  set(key: string, value: any);
  unset(key: string);
}

export interface UserDetails {
  email?: string;
  password?: string;
  username?: string;
  image?: string;
  name?: string;
  custom?: Object;
}

/**
 * @hidden
 */
export interface UserDependencies {
  service: ISingleUserService;
}

export interface UserSocial {
  facebook?: UserSocialProvider;
  github?: UserSocialProvider;
  twitter?: UserSocialProvider;
  instagram?: UserSocialProvider;
  google?: UserSocialProvider;
  linkedin?: UserSocialProvider;
}

export interface UserSocialProvider {
  uid: string;
  data: {
    email: string;
    username: string;
    full_name: string;
    profile_picture: string;
    raw_data: Object;
  };
}

export interface IUser {
  id: string;
  fresh: boolean;
  details: UserDetails;
  social: UserSocial;
  data: IUserData;

  isAnonymous(): boolean;
  get(key: string, defaultValue: any);
  set(key: string, value: any);
  unset(key: string);
  clear();
  store();
  unstore();
  save(): Promise<void>;
  delete(): Promise<void>;
  serializeForAPI(): UserDetails;
  serializeForStorage(): StoredUser;
}

/**
 * @hidden
 */
export interface SingleUserServiceDependencies {
  client: IClient;
  context: IUserContext;
}

/**
 * @hidden
 */
export interface SingleUserServiceOptions {}

export interface ISingleUserService {
  current(): IUser;
  store();
  unstore();
  load(id?: string): Promise<void>;
  delete(): Promise<void>;
  save(): Promise<void>;
}

/**
 * @hidden
 */
export interface TokenContextDependencies {
  storage: IStorage<string>;
}

/**
 * @hidden
 */
export interface ITokenContextStoreOptions {}

export interface ITokenContext {
  label: string;

  get(): string;
  store(token: string, options: ITokenContextStoreOptions): void;
  delete(): void;
}

/**
 * @hidden
 */
export interface CombinedTokenContextDependencies extends TokenContextDependencies {
  tempStorage: IStorage<string>;
}

/**
 * @hidden
 */
export interface ICombinedTokenContextStoreOptions extends ITokenContextStoreOptions {
  permanent?: boolean;
}

/**
 * @hidden
 */
export interface ICombinedTokenContext extends ITokenContext {
  store(token: string, options: ICombinedTokenContextStoreOptions): void;
}

export type AuthModuleId = 'basic' | 'custom' | 'facebook' | 'github' | 'google' | 'instagram' | 'linkedin' | 'twitter';

/**
 * @hidden
 */
export interface AuthTypeDependencies {
  config: IConfig;
  client: IClient;
}

/**
 * @hidden
 */
export interface IAuthType {
  authenticate(data, options?: LoginOptions): Promise<any>;
}

/**
 * @hidden
 */
export interface BasicLoginCredentials {
  email: string;
  password: string;
}

/**
 * @hidden
 */
export interface IBasicAuthType extends IAuthType {
  signup(data: UserDetails): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  confirmPasswordReset(email: string, code: number, newPassword: string): Promise<void>;
}

/**
 * @hidden
 */
export interface IAuthModules {
  basic: IBasicAuthType;
  custom: IAuthType;
  facebook: IAuthType;
  github: IAuthType;
  google: IAuthType;
  instagram: IAuthType;
  linkedin: IAuthType;
  twitter: IAuthType;
}

export interface LoginOptions {
  remember?: boolean;
  inAppBrowserOptions?: InAppBrowserPluginOptions;
}

/**
 * @hidden
 */
export interface AuthDependencies {
  emitter: IEventEmitter;
  authModules: IAuthModules;
  tokenContext: ICombinedTokenContext;
  userService: ISingleUserService;
  storage: IStorage<string>;
}

/**
 * @hidden
 */
export interface AuthOptions {}

/**
 * This is the auth interface.
 */
export interface IAuth {
  options: AuthOptions;
  isAuthenticated(): boolean;
  login(moduleId: 'basic', credentials: BasicLoginCredentials, options?: LoginOptions): Promise<IUser>;
  login(moduleId: 'custom', credentials: Object, options?: LoginOptions): Promise<IUser>;
  login(moduleId: AuthModuleId, credentials?: Object, options?: LoginOptions): Promise<IUser>;
  logout(): void;
  signup(data: UserDetails): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  confirmPasswordReset(code: number, newPassword: string): Promise<void>;
}

export interface IAppStatus {
  asleep?: boolean;
  closed?: boolean;
}

export interface IPluginRegistration {
  registrationId: string;
}

export interface IPluginNotificationAdditionalData {
  foreground: boolean;
  coldstart: boolean;
  [key: string]: any;
}

export interface IPluginNotification {
  message: string;
  title: string;
  count: number;
  sound: string;
  image: string;
  launchArgs: string;
  additionalData: IPluginNotificationAdditionalData;
}

export interface IPushMessage {
  app: IAppStatus;
  text: string;
  title: string;
  count: number;
  sound: string;
  image: string;
  raw: IPluginNotification;
  payload: Object;
}

export interface IPushNotificationEvent {
  message: IPushMessage;
  data: IPluginNotification;
}

export interface SaveTokenOptions {
  ignore_user?: boolean;
}

/**
 * @hidden
 */
export interface PushStorageObject {
  token: string;
}

/**
 * @hidden
 */
export interface PushDependencies {
  config: IConfig;
  auth: IAuth;
  userService: ISingleUserService;
  device: IDevice;
  client: IClient;
  emitter: IEventEmitter;
  storage: IStorage<PushStorageObject>;
  logger: ILogger;
}

export interface PushPluginConfig {
  android?: {
    senderID?: string;
    icon?: string;
    iconColor?: string;
    sound?: boolean;
    vibrate?: boolean;
    clearBadge?: boolean;
    clearNotifications?: boolean;
    forceShow?: boolean;
    topics?: string[];
  };
  ios?: {
    alert?: boolean | string;
    badge?: boolean | string;
    sound?: boolean | string;
    clearBadge?: boolean | string;
    categories?: any;
  };
}

export interface InAppBrowserPluginOptions {
  location?: boolean;
  hidden?: boolean;
  clearcache?: boolean;
  clearsessioncache?: boolean;
  zoom?: boolean;
  hardwareback?: boolean;
  mediaPlaybackRequiresUserAction?: boolean;
  closebuttoncaption?: string;
  disallowoverscroll?: boolean;
  toolbar?: boolean;
  enableViewportScale?: boolean;
  allowInlineMediaPlayback?: boolean;
  keyboardDisplayRequiresUserAction?: boolean;
  suppressesIncrementalRendering?: boolean;
  presentationstyle?: "pagesheet" | "formsheet" | "fullscreen";
  transitionstyle?: "fliphorizontal" | "crossdissolve" | "coververtical";
  toolbarposition?: "top" | "bottom";
  fullscreen?: boolean;
}

export interface PushOptions {
  sender_id?: string;
  debug?: boolean;
  pluginConfig?: PushPluginConfig;
}

export interface IPushToken {
  registered: boolean;
  saved: boolean;
  token: string;
}

export interface IPush {
  options: PushOptions;
  plugin: any;
  token: IPushToken;

  saveToken(token: IPushToken, options: SaveTokenOptions): Promise<IPushToken>;
  register(): Promise<IPushToken>;
  unregister(): Promise<void>;
}

export interface DeployDownloadOptions {
  onProgress?: (p: number) => void;
}

export interface DeployExtractOptions {
  onProgress?: (p: number) => void;
}

export type DeployChannel = 'dev' | 'staging' | 'production' | string;

/**
 * @hidden
 */
export interface DeployOptions {}

/**
 * @hidden
 */
export interface DeployDependencies {
  config: IConfig;
  emitter: IEventEmitter;
  logger: ILogger;
}

export interface IDeploy {
  channel: DeployChannel;
  options: DeployOptions;

  check(): Promise<boolean>;
  download(options?: DeployDownloadOptions): Promise<boolean>;
  extract(options?: DeployExtractOptions): Promise<boolean>;
  load();
  info(): Promise<any>;
  getSnapshots(): Promise<any>;
  deleteSnapshot(uuid: string): Promise<any>;
  getMetadata(uuid: string): Promise<any>;
}

/**
 * @hidden
 */
export interface IStatSerialized {
  app_id: string;
  stat: string;
  value: number;
  created: string;
}

/**
 * @hidden
 */
export interface InsightsDependencies {
  appStatus: IAppStatus;
  storage: IStorage<string>;
  config: IConfig;
  client: IClient;
  logger: ILogger;
}

/**
 * @hidden
 */
export interface InsightsOptions {
  intervalSubmit?: number;
  intervalActiveCheck?: number;
  submitCount?: number;
}

/**
 * @hidden
 */
export interface IInsights {
  track(stat: string, value?: number): void;
}
