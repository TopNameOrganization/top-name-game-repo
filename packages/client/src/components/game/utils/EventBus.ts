type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P];

export class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapInterface<E>, any[]> = Record<string, any>,
  > {
  private readonly _listeners: { [K in MapInterface<E>]?: Handler<Args[K]>[] } = {};

  constructor() {
    this._listeners = {};
  }

  public on<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event]?.push(callback);
  }

  public off<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this._listeners[event]) {
      // ну или как-то более иначе это обрабатывать
      throw (new Error(`NO such event!!1 ${event}`));
    }
    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  }

  public dispatch<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
    if (!this._listeners[event]) {
      // ну или как-то более иначе это обрабатывать
      throw (new Error(`NO such event!!1 ${event}`));
    }
    this._listeners[event].forEach((listener) => listener(...args));
  }
}
