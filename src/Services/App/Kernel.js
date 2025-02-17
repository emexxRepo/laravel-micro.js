import Pipeline from "../../Support/Pipeline"

export default class Kernel {
	/**
	 * App Kernel Constructor
	 * @return void
	 */
	constructor(App) {
		this.app = App
		this._middleware = []
		this._pipeline = new Pipeline(App)
		this._method = 'handle'
	}



	/**
	 * Register Middleware Stack
	 * @param middleware {Array}
	 * @return this
	 */
	setMiddleware(middleware) {
		this._middleware = middleware
		return this
	}

	/**
	 * Register Middleware Stack
	 * @param request {*}
	 * @param then {function}
	 * @return {*}
	 */
	handle(request = null, then = (response) => response) {
		try {
			return this._pipeline
				.send(request)
				.through(this._middleware)
				.via(this._method)
				.then(then)
		} catch (e) {
			this.app.handleError(e)
		}
	}

	/**
	 * Terminate Middleware Stack
	 * @param request {*}
	 * @param then {function}
	 * @return {*}
	 */
	terminate(request = null, then = (response) => response){
		this._method = 'terminate'
		return this.handle(request, then)
	}
}
